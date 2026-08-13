import type { Metadata } from "next";
import Link from "next/link";
import AuthForm from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "ورود و ثبت‌نام",
  description: "به پنل مشتری ردوبز وارد شو یا حساب جدید بساز.",
};

export default function LoginPage() {
  return (
    <div className="relative overflow-hidden py-16 md:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-55 [mask-image:radial-gradient(circle_at_50%_20%,#000_0%,transparent_70%)] bg-[linear-gradient(#ececee_1px,transparent_1px),linear-gradient(90deg,#ececee_1px,transparent_1px)] bg-[length:72px_72px]"
      />

      <div className="relative mx-auto w-full max-w-md px-5">
        <div className="text-center">
          <Link href="/" className="text-lg font-extrabold text-ink-950">
            <span className="text-accent-600">رد</span>وبز
          </Link>
          <h1 className="mt-5 font-display text-3xl text-ink-900">پنل مشتری</h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-600">
            برای پیگیری پروژه‌ها و سفارش‌هات وارد شو، یا اگه تازه‌واردی، یه
            حساب بساز.
          </p>
        </div>

        <div className="mt-8">
          <AuthForm />
        </div>
      </div>
    </div>
  );
}
