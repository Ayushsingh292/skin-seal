"use client";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { enquirySchema, type EnquiryInput } from "@/lib/validations";
import { products } from "@/data/products";
export function EnquiryForm({
  product = "general",
  message = "",
}: {
  product?: EnquiryInput["product"];
  message?: string;
}) {
  const [feedback, setFeedback] = useState<{
    ok: boolean;
    text: string;
  } | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { product, message, consent: false, website: "" },
  });
  async function submit(values: EnquiryInput) {
    setFeedback(null);
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(
          result.error ||
            "Your enquiry could not be delivered. Please email or call us.",
        );
      setFeedback({
        ok: true,
        text: "Your enquiry has been delivered to the SkinSeal team. Thank you for getting in touch.",
      });
      reset();
    } catch (e) {
      setFeedback({
        ok: false,
        text:
          e instanceof Error
            ? e.message
            : "Unable to connect. Please try again or contact us directly.",
      });
    }
  }
  const err = (name: keyof EnquiryInput) =>
    errors[name] ? (
      <span className="field-error" id={`${name}-error`}>
        {errors[name]?.message}
      </span>
    ) : null;
  const attrs = (name: keyof EnquiryInput) => ({
    "aria-invalid": !!errors[name],
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });
  return (
    <form noValidate onSubmit={handleSubmit(submit)} className="enquiry-form">
      <div className="form-heading">
        <h2>Start a conversation.</h2>
        <p>
          Fields marked * are required. Please do not include patient
          information.
        </p>
      </div>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="name">Full name *</label>
          <input
            id="name"
            autoComplete="name"
            maxLength={100}
            {...register("name")}
            {...attrs("name")}
          />
          {err("name")}
        </div>
        <div className="field">
          <label htmlFor="email">Email address *</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            {...register("email")}
            {...attrs("email")}
          />
          {err("email")}
        </div>
        <div className="field">
          <label htmlFor="phone">Phone number *</label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            maxLength={25}
            {...register("phone")}
            {...attrs("phone")}
          />
          {err("phone")}
        </div>
        <div className="field">
          <label htmlFor="organization">Organization *</label>
          <input
            id="organization"
            autoComplete="organization"
            maxLength={150}
            {...register("organization")}
            {...attrs("organization")}
          />
          {err("organization")}
        </div>
        <div className="field">
          <label htmlFor="profession">Profession / enquiry type *</label>
          <select
            id="profession"
            {...register("profession")}
            {...attrs("profession")}
            defaultValue=""
          >
            <option value="" disabled>
              Select an option
            </option>
            {[
              "Healthcare professional",
              "Dental professional",
              "Veterinary professional",
              "Distributor",
              "Other",
            ].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
          {err("profession")}
        </div>
        <div className="field">
          <label htmlFor="product">Product of interest *</label>
          <select id="product" {...register("product")} {...attrs("product")}>
            <option value="general">General enquiry</option>
            {products.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name}
              </option>
            ))}
          </select>
          {err("product")}
        </div>
        <div className="field full">
          <label htmlFor="message">Your message *</label>
          <textarea
            id="message"
            rows={5}
            maxLength={5000}
            {...register("message")}
            {...attrs("message")}
            placeholder="Tell us how we can help your practice."
          />
          {err("message")}
        </div>
        <div className="honeypot" aria-hidden="true">
          <label htmlFor="website">Leave this field empty</label>
          <input
            id="website"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </div>
        <div className="full consent-field">
          <input
            type="checkbox"
            id="consent"
            {...register("consent")}
            {...attrs("consent")}
          />
          <label htmlFor="consent">
            I agree to be contacted about this enquiry and have read the{" "}
            <Link href="/privacy-policy">Privacy Policy</Link>. *
          </label>
          {err("consent")}
        </div>
      </div>
      {feedback && (
        <div
          className={`form-feedback ${feedback.ok ? "success" : "error"}`}
          role={feedback.ok ? "status" : "alert"}
        >
          {feedback.ok && <CheckCircle2 size={20} />}
          <p>{feedback.text}</p>
        </div>
      )}
      <button
        className="button submit-button"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? (
          <>
            <LoaderCircle size={17} className="spin" />
            Sending enquiry…
          </>
        ) : (
          <>
            Send Enquiry <ArrowUpRight size={18} />
          </>
        )}
      </button>
      <p className="form-footnote">
        For product enquiries only. For urgent medical concerns, seek local
        medical care.
      </p>
    </form>
  );
}
