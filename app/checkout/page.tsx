"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Section from "@/components/Section";
import Button from "@/components/Button";
import { useCart } from "@/lib/cart-context";
import { ApiResponse, OrderFormData } from "@/lib/types";
import { formatPrice, toPersianDigits } from "@/lib/format";

type Status = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "min-h-[44px] w-full rounded-xl border border-ink-200 bg-white px-3.5 text-sm text-ink-950 transition-colors duration-200 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-100";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (status !== "success") return;
    const timeout = setTimeout(() => {
      router.push("/panel");
    }, 1500);
    return () => clearTimeout(timeout);
  }, [status, router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setFeedback("");

    const form = event.currentTarget;
    const payload: OrderFormData = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      notes: (form.elements.namedItem("notes") as HTMLTextAreaElement).value,
      items,
    };

    try {
      const res = await fetch("/api/order", {
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
      window.localStorage.setItem(
        "redwebs-customer",
        JSON.stringify({ name: payload.name, email: payload.email, phone: payload.phone })
      );
      clearCart();
    } catch {
      setStatus("error");
      setFeedback("ارتباط با سرور برقرار نشد. اتصال اینترنتتون رو چک کنید.");
    }
  }

  if (status === "success") {
    return (
      <Section className="pt-16 md:pt-20">
        <div
          role="status"
          className="mx-auto max-w-md rounded-2xl border border-accent-200 bg-accent-50 p-8 text-center shadow-card"
        >
          <p className="font-semibold text-ink-950">{feedback}</p>
          <Button href="/panel" className="mt-6">
            ورود به پنل مشتری
          </Button>
        </div>
      </Section>
    );
  }

  if (items.length === 0) {
    return (
      <Section className="pt-16 md:pt-20">
        <div className="mx-auto max-w-md text-center">
          <h1 className="text-2xl font-bold text-ink-900">سبد سفارش شما خالیه</h1>
          <p className="mt-3 text-ink-600">
            برای ثبت سفارش، اول یک پکیج رو از صفحه‌ی خدمات انتخاب کنید.
          </p>
          <Button href="/services" className="mt-8">
            مشاهده‌ی خدمات
          </Button>
        </div>
      </Section>
    );
  }

  return (
    <Section className="pt-16 md:pt-20">
      <div className="mx-auto grid max-w-4xl gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">ثبت نهایی سفارش</h1>
          <p className="mt-2 text-sm text-ink-600">
            اطلاعاتتون رو وارد کنید تا تیم ما در اسرع وقت باهاتون تماس بگیره.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5 rounded-2xl bg-white p-8 shadow-card">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="نام و نام خانوادگی" name="name" type="text" required />
              <Field label="ایمیل" name="email" type="email" required />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="شماره تماس" name="phone" type="tel" required />
              <Field label="نام کسب‌وکار (اختیاری)" name="company" type="text" />
            </div>

            <div>
              <label htmlFor="notes" className="mb-1.5 block text-sm font-medium text-ink-800">
                توضیحات تکمیلی (اختیاری)
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                placeholder="هر نکته‌ی اضافه‌ای که کمک می‌کنه بهتر بشناسیمتون..."
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
              className="inline-flex min-h-[44px] w-full items-center justify-center rounded-xl bg-accent-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-accent-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" ? "در حال ارسال..." : "ثبت سفارش"}
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-lg font-bold text-ink-900">خلاصه‌ی سفارش</h2>
          <div className="mt-4 divide-y divide-ink-100 rounded-2xl border border-ink-100 bg-white shadow-card">
            {items.map((item) => (
              <div key={item.slug} className="flex items-center justify-between p-5 text-sm">
                <div>
                  <p className="font-medium text-ink-900">{item.name}</p>
                  <p className="text-ink-500">تعداد: {toPersianDigits(item.quantity)}</p>
                </div>
                <p className="font-semibold text-ink-900">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between rounded-xl bg-ink-50 px-5 py-4">
            <p className="font-semibold text-ink-900">جمع کل (تخمینی)</p>
            <p className="text-lg font-bold text-ink-900">{formatPrice(totalPrice)}</p>
          </div>
        </div>
      </div>
    </Section>
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
