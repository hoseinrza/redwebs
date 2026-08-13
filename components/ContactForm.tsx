"use client";

import { FormEvent, useState } from "react";
import { ApiResponse } from "@/lib/types";

type Status = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "min-h-[44px] w-full rounded-xl border border-ink-200 bg-white px-3.5 text-sm text-ink-950 transition-colors duration-200 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-100";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setFeedback("");

    const form = event.currentTarget;
    const payload = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      serviceInterest: (form.elements.namedItem("serviceInterest") as HTMLSelectElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result: ApiResponse = await res.json();

      if (!result.success) {
        setStatus("error");
        setFeedback(result.error);
        return;
      }

      setStatus("success");
      setFeedback(result.message);
      form.reset();
    } catch {
      setStatus("error");
      setFeedback("ارتباط با سرور برقرار نشد. اتصال اینترنتتون رو چک کنید.");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-accent-100 bg-accent-50 p-8 text-center shadow-card">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-accent-500 text-white">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="mt-4 font-semibold text-ink-950">{feedback}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl bg-white p-8 shadow-card">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="نام و نام خانوادگی" name="name" type="text" required />
        <Field label="ایمیل" name="email" type="email" required />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="شماره تماس (اختیاری)" name="phone" type="tel" />

        <div>
          <label htmlFor="serviceInterest" className="mb-1.5 block text-sm font-medium text-ink-800">
            نوع خدمات
          </label>
          <select id="serviceInterest" name="serviceInterest" required defaultValue="استاندارد" className={inputClasses}>
            <option value="استاندارد">استاندارد</option>
            <option value="اختصاصی">اختصاصی</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink-800">
          پیام شما
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          rows={4}
          placeholder="کمی درباره‌ی کسب‌وکار و هدفتون بگید..."
          className={`${inputClasses} min-h-0 py-2.5`}
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm font-medium text-accent-600">
          {feedback}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex min-h-[44px] w-full items-center justify-center rounded-xl bg-accent-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-accent-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "در حال ارسال..." : "ارسال درخواست"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type,
  required = false,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink-800">
        {label}
      </label>
      <input id={name} name={name} type={type} required={required} className={inputClasses} />
    </div>
  );
}
