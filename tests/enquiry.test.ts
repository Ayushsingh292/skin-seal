import { test } from "node:test";
import assert from "node:assert/strict";
import { enquirySchema } from "../src/lib/validations";

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
test("valid professional enquiry is accepted", () =>
  assert.equal(enquirySchema.safeParse(valid).success, true));
test("consent is required", () =>
  assert.equal(
    enquirySchema.safeParse({ ...valid, consent: false }).success,
    false,
  ));
test("invalid email and overlong messages are rejected", () => {
  assert.equal(
    enquirySchema.safeParse({ ...valid, email: "broken" }).success,
    false,
  );
  assert.equal(
    enquirySchema.safeParse({ ...valid, message: "a".repeat(5001) }).success,
    false,
  );
});
test("unknown products and header injection are rejected", () => {
  assert.equal(
    enquirySchema.safeParse({ ...valid, product: "unlisted" }).success,
    false,
  );
  assert.equal(
    enquirySchema.safeParse({ ...valid, name: "Asha\r\nBcc: x@example.com" })
      .success,
    false,
  );
});
test("phone must contain seven to fifteen digits", () => {
  for (const phone of ["-------", "123----", "+1234567890123456"])
    assert.equal(enquirySchema.safeParse({ ...valid, phone }).success, false);
});
