import type { Metadata } from "next";
import Container from "@/components/Container";
import DashEyebrow from "@/components/DashEyebrow";
import PortfolioListingClient from "@/components/PortfolioListingClient";
import { caseStudies } from "@/lib/data/case-studies";

export const metadata: Metadata = {
  title: "نمونه‌کارها و نتایج مستند",
  description:
    "مجموعه پروژه‌ها و بررسی‌های موردی استودیو ردوبز؛ نتایج واقعی رشد فروش، ترافیک و لید برای کسب‌وکارهای ایرانی.",
};

export default function PortfolioPage() {
  return (
    <div className="py-12 sm:py-16">
      <Container>
        {/* Page Header */}
        <div className="max-w-3xl mb-10">
          <DashEyebrow>نمونه‌کارها و خروجی‌های واقعی</DashEyebrow>
          <h1 className="mt-3 font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold text-ink-950 leading-tight">
            کسب‌وکارهای واقعی، نتایج و عددهای مستند
          </h1>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-ink-600">
            بررسی موردی فرآیند حل مسئله، انتخاب معماری و دستاوردهای قابل سنجش در پروژه‌های طراحی و توسعه وب ردوبز.
          </p>
        </div>

        {/* Client Interactive Filter & Grid */}
        <PortfolioListingClient caseStudies={caseStudies} />
      </Container>
    </div>
  );
}
