"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

type Mode = "login" | "signup";
type Status = "idle" | "submitting" | "done";

const inputClasses =
  "min-h-[44px] w-full rounded-xl border border-ink-200 bg-white px-3.5 text-sm text-ink-950 transition-colors duration-200 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-100";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function AuthForm() {
  const [mode, setMode] = useState<Mode>("login");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function switchMode(next: Mode) {
    setMode(next);
    setStatus("idle");
    setErrors({});
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const name =
      mode === "signup" ? (form.elements.namedItem("name") as HTMLInputElement).value.trim() : "";

    const nextErrors: Record<string, string> = {};
    if (mode === "signup" && name.length < 2) {
      nextErrors.name = "نام رو کامل وارد کن.";
    }
    if (!isValidEmail(email)) {
      nextErrors.email = "ایمیل معتبر وارد کن.";
    }
    if (password.length < 8) {
      nextErrors.password = "رمز عبور باید حداقل ۸ کاراکتر باشه.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (mode === "signup") {
      try {
        window.localStorage.setItem("redwebs-customer", JSON.stringify({ name, email }));
      } catch {
        // ignore storage errors (e.g. private browsing)
      }
    }

    setStatus("submitting");
    setTimeout(() => setStatus("done"), 500);
  }

  if (status === "done") {
    return (
      <div role="status" className="rounded-2xl border border-accent-100 bg-accent-50 p-8 text-center shadow-card">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-accent-500 text-white">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="mt-4 font-semibold text-ink-950">این یک نسخه‌ی نمایشیه</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-600">
          پنل مشتری واقعی هنوز راه‌اندازی نشده، ولی می‌تونی از همین جا یه پیش‌نمایش از فضای کاری که برات می‌سازیم رو ببینی.
        </p>
        <Link
          href="/panel"
          className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-accent-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-accent-700"
        >
          مشاهده‌ی پیش‌نمایش پنل
        </Link>
        <Link
          href="/"
          className="mt-3 inline-flex min-h-[44px] items-center justify-center rounded-xl border border-ink-200 px-6 text-sm font-semibold text-ink-950 transition-colors hover:border-ink-400 hover:bg-ink-50"
        >
          بازگشت به صفحه‌ی اصلی
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-8 shadow-card">
      <div className="grid grid-cols-2 gap-1 rounded-xl bg-ink-100 p-1">
        <button
          type="button"
          onClick={() => switchMode("login")}
          className={`min-h-[40px] rounded-lg text-sm font-semibold transition-colors ${
            mode === "login" ? "bg-white text-ink-950 shadow-card" : "text-ink-500 hover:text-ink-800"
          }`}
        >
          ورود
        </button>
        <button
          type="button"
          onClick={() => switchMode("signup")}
          className={`min-h-[40px] rounded-lg text-sm font-semibold transition-colors ${
            mode === "signup" ? "bg-white text-ink-950 shadow-card" : "text-ink-500 hover:text-ink-800"
          }`}
        >
          ثبت‌نام
        </button>
      </div>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
        {mode === "signup" && (
          <Field
            label="نام و نام خانوادگی"
            name="name"
            type="text"
            autoComplete="name"
            error={errors.name}
          />
        )}

        <Field
          label="ایمیل"
          name="email"
          type="email"
          autoComplete="email"
          error={errors.email}
        />

        <Field
          label="رمز عبور"
          name="password"
          type="password"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          error={errors.password}
        />

        {mode === "login" && (
          <div className="text-left">
            <Link href="/services" className="text-xs font-medium text-accent-600 hover:underline">
              رمز عبور رو فراموش کردی؟
            </Link>
          </div>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex min-h-[44px] w-full items-center justify-center rounded-xl bg-accent-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-accent-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "در حال بررسی..." : mode === "login" ? "ورود به پنل" : "ساخت حساب کاربری"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-500">
        {mode === "login" ? (
          <>
            هنوز حساب نساختی؟{" "}
            <button type="button" onClick={() => switchMode("signup")} className="font-semibold text-accent-600 hover:underline">
              ثبت‌نام کن
            </button>
          </>
        ) : (
          <>
            قبلاً حساب ساختی؟{" "}
            <button type="button" onClick={() => switchMode("login")} className="font-semibold text-accent-600 hover:underline">
              وارد شو
            </button>
          </>
        )}
      </p>
    </div>
  );
}

function Field({
  label,
  name,
  type,
  autoComplete,
  error,
}: {
  label: string;
  name: string;
  type: string;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink-800">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={inputClasses}
      />
      {error && (
        <p id={`${name}-error`} role="alert" className="mt-1.5 text-xs font-medium text-accent-600">
          {error}
        </p>
      )}
    </div>
  );
}
