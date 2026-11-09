import { test } from "node:test";
import assert from "node:assert/strict";
import { POST } from "../src/app/api/enquiries/route";
const valid = {
  name: "Asha Rao",
  email: "asha@example.com",
  phone: "+91 9876543210",
  organization: "Example Clinic",
  profession: "Healthcare professional",
  product: "skinseal",
  message: "Please send product information.",
  consent: true,
  website: "",
};
function request(data: unknown, ip = "test") {
  return new Request("http://localhost:3000/api/enquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(data),
  });
}
test("rejects honeypot and oversized requests", async () => {
  assert.equal(
    (await POST(request({ ...valid, website: "https://spam.example" }))).status,
    400,
  );
  assert.equal(
    (await POST(request({ message: "x".repeat(21000) }))).status,
    413,
  );
});
test("stops reading an oversized chunked body as soon as its cap is reached", async () => {
  let reads = 0;
  const body = new ReadableStream({
    pull(controller) {
      reads++;
      if (reads > 100) {
        controller.close();
        return;
      }
      controller.enqueue(new Uint8Array(1000).fill(65));
    },
  });
  const req = new Request("http://localhost:3000/api/enquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    duplex: "half",
  } as RequestInit & { duplex: "half" });
  assert.equal((await POST(req)).status, 413);
  assert.ok(reads <= 23, `Only capped chunks should be read, read ${reads}`);
});
test("missing configuration never reports a delivery success and rate limit rejects repeat attempts", async () => {
  const previous = process.env.RESEND_API_KEY;
  delete process.env.RESEND_API_KEY;
  try {
    for (let i = 0; i < 5; i++)
      assert.equal((await POST(request(valid, "limit-test"))).status, 503);
    assert.equal((await POST(request(valid, "limit-test"))).status, 429);
  } finally {
    if (previous) process.env.RESEND_API_KEY = previous;
  }
});
test("provider acceptance, rejection and timeout are represented honestly", async () => {
  const keys = [
    "RESEND_API_KEY",
    "ENQUIRY_FROM_EMAIL",
    "ENQUIRY_TO_EMAIL",
  ] as const;
  const previous = keys.map((k) => process.env[k]);
  const original = globalThis.fetch;
  keys.forEach(
    (k, i) =>
      (process.env[k] = [
        "test-key",
        "sender@example.com",
        "recipient@example.com",
      ][i]),
  );
  try {
    globalThis.fetch = async (_url, init) => {
      const body = JSON.parse(init?.body as string);
      assert.equal(body.reply_to, valid.email);
      assert.ok(body.text.includes(valid.message));
      assert.equal(body.html, undefined);
      return Response.json({ id: "test-provider-acceptance" });
    };
    assert.equal((await POST(request(valid, "provider-test"))).status, 200);
    globalThis.fetch = async () =>
      Response.json({ error: "rejected" }, { status: 401 });
    assert.equal((await POST(request(valid, "provider-test"))).status, 502);
    globalThis.fetch = async () => Response.json({});
    assert.equal((await POST(request(valid, "provider-test"))).status, 502);
    globalThis.fetch = async () => {
      throw new Error("timeout");
    };
    assert.equal((await POST(request(valid, "provider-test"))).status, 502);
  } finally {
    globalThis.fetch = original;
    keys.forEach((k, i) => {
      if (previous[i] === undefined) delete process.env[k];
      else process.env[k] = previous[i];
    });
  }
});
