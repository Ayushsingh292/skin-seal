import { createHash } from "node:crypto";
import { enquirySchema } from "@/lib/validations";
import { site } from "@/data/site";
export const runtime = "nodejs";
const attempts = new Map<string, { count: number; until: number }>();
function reply(body: object, status: number) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const expected = process.env.SITE_URL || new URL(request.url).origin;
  if (origin && origin !== expected)
    return reply({ error: "This request origin is not allowed." }, 403);
  if (!request.headers.get("content-type")?.includes("application/json"))
    return reply({ error: "Send a JSON enquiry." }, 415);
  if (Number(request.headers.get("content-length")) > 20000)
    return reply({ error: "Your enquiry is too large." }, 413);
  let data: unknown;
  try {
    if (!request.body)
      return reply({ error: "Your enquiry could not be read." }, 400);
    const reader = request.body.getReader();
    const chunks: Uint8Array[] = [];
    let bytes = 0;
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        bytes += value.byteLength;
        if (bytes > 20000) {
          await reader.cancel();
          return reply({ error: "Your enquiry is too large." }, 413);
        }
        chunks.push(value);
      }
    } finally {
      reader.releaseLock();
    }
    data = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return reply({ error: "Your enquiry could not be read." }, 400);
  }
  const parsed = enquirySchema.safeParse(data);
  if (!parsed.success)
    return reply(
      {
        error:
          "Please check the required fields and consent before submitting.",
      },
      400,
    );
  if (parsed.data.website)
    return reply(
      {
        error:
          "Your enquiry could not be accepted. Please contact us directly.",
      },
      400,
    );
  const now = Date.now();
  for (const [key, value] of attempts)
    if (value.until < now) attempts.delete(key);
  const address =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const key = createHash("sha256").update(address).digest("hex");
  const entry = attempts.get(key) || { count: 0, until: now + 600000 };
  if (!attempts.has(key) && attempts.size >= 10000)
    return reply(
      { error: "Enquiries are temporarily busy. Please contact us directly." },
      503,
    );
  if (entry.count >= 5)
    return reply(
      {
        error:
          "Too many enquiries. Please wait a few minutes or contact us directly.",
      },
      429,
    );
  entry.count++;
  attempts.set(key, entry);
  const { RESEND_API_KEY, ENQUIRY_FROM_EMAIL, ENQUIRY_TO_EMAIL } = process.env;
  if (!RESEND_API_KEY || !ENQUIRY_FROM_EMAIL || !ENQUIRY_TO_EMAIL)
    return reply(
      {
        error: `Online delivery is not configured yet. Please email ${site.email} or call ${site.phone}.`,
      },
      503,
    );
  const { name, email, phone, organization, profession, product, message } =
    parsed.data;
  try {
    const result = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: ENQUIRY_FROM_EMAIL,
        to: [ENQUIRY_TO_EMAIL],
        reply_to: email,
        subject: `SkinSeal enquiry: ${product}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nOrganization: ${organization}\nProfession: ${profession}\nProduct: ${product}\n\n${message}\n\nConsent to respond: confirmed`,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!result.ok)
      return reply(
        {
          error:
            "Your enquiry could not be delivered. Please try again or contact us directly.",
        },
        502,
      );
    const delivery = await result.json();
    if (typeof delivery.id !== "string")
      return reply(
        {
          error: "Delivery could not be confirmed. Please contact us directly.",
        },
        502,
      );
    return reply({ message: "Enquiry delivered." }, 200);
  } catch {
    return reply(
      {
        error:
          "Delivery is temporarily unavailable. Please contact us directly.",
      },
      502,
    );
  }
}
