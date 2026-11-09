import { z } from "zod";
const singleLine = (min: number, max: number) =>
  z
    .string()
    .trim()
    .min(min, `Enter at least ${min} characters.`)
    .max(max, `Use ${max} characters or fewer.`)
    .refine((v) => !/[\r\n]/.test(v), "Use a single line.");
export const enquirySchema = z.object({
  name: singleLine(2, 100),
  email: z.email("Enter a valid email address.").max(254),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number.")
    .max(25)
    .regex(/^[+\d\s().-]+$/, "Enter a valid phone number.")
    .refine((value) => {
      const digits = value.replace(/\D/g, "");
      return digits.length >= 7 && digits.length <= 15;
    }, "Use a phone number with 7 to 15 digits."),
  organization: singleLine(2, 150),
  profession: z.enum(
    [
      "Healthcare professional",
      "Dental professional",
      "Veterinary professional",
      "Distributor",
      "Other",
    ],
    { error: "Select your profession or enquiry type." },
  ),
  product: z.enum(
    [
      "skinseal",
      "skinseal-plus",
      "skinseal-adv",
      "skinseal-adv-plus",
      "skinseal-dental",
      "skinseal-veterinary",
      "general",
    ],
    { error: "Select a product." },
  ),
  message: z
    .string()
    .trim()
    .min(10, "Please include at least 10 characters.")
    .max(5000, "Please use 5,000 characters or fewer."),
  consent: z
    .boolean()
    .refine((v) => v === true, "Consent is required to send your enquiry."),
  website: z.string().max(200).optional(),
});
export type EnquiryInput = z.infer<typeof enquirySchema>;
