import type { Metadata } from "next";
import Section from "@/components/Section";
import PackageCard from "@/components/PackageCard";
import Eyebrow from "@/components/Eyebrow";
import { packages } from "@/lib/data/packages";

export const metadata: Metadata = {
  title: "خدمات و پکیج‌ها",
  description:
    "پکیج‌های آماده‌ی طراحی سایت ردوبز — از لندینگ‌پیج تا پنل اختصاصی. انتخاب کنید، به سبد اضافه کنید و سفارش رو ثبت کنید.",
};

const standardPackages = packages.filter((pkg) => pkg.track === "استاندارد");
const customPackages = packages.filter((pkg) => pkg.track === "اختصاصی");

export default function ServicesPage() {
  return (
    <>
      <Section className="pb-0 pt-16 md:pt-20">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>خدمات و پکیج‌ها</Eyebrow>
          <h1 className="mx-auto mt-4 max-w-xl text-3xl font-bold leading-snug text-ink-900 md:text-4xl">
            پکیج مناسب کسب‌وکارتون رو انتخاب کنید
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-base leading-loose text-ink-600">
            هر پکیج رو می‌تونید به سبد سفارش اضافه کنید و در نهایت با یک فرم
            ساده، درخواستتون رو برای ما ارسال کنید.
          </p>
        </div>
      </Section>

      <Section>
        <h2 className="text-xl font-bold text-ink-900">مسیر استاندارد</h2>
        <p className="mt-1 text-sm text-ink-600">قطعات آماده، محدوده‌ی مشخص، تحویل سریع‌تر.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {standardPackages.map((pkg) => (
            <PackageCard key={pkg.slug} pkg={pkg} />
          ))}
        </div>
      </Section>

      <Section className="bg-ink-50">
        <h2 className="text-xl font-bold text-ink-900">مسیر اختصاصی</h2>
        <p className="mt-1 text-sm text-ink-600">منطق سفارشی، یکپارچه‌سازی و قابلیت‌های فراتر از قالب آماده.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {customPackages.map((pkg) => (
            <PackageCard key={pkg.slug} pkg={pkg} />
          ))}
        </div>
      </Section>
    </>
  );
}
