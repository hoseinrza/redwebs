import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import Eyebrow from "@/components/Eyebrow";
import { caseStudies } from "@/lib/data/case-studies";

export const metadata: Metadata = {
  title: "نمونه‌کارها",
  description: "نتایج واقعی از پروژه‌های ردوبز برای کسب‌وکارهای خدماتی و محلی.",
};

export default function PortfolioPage() {
  return (
    <Section className="pt-16 md:pt-20">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow>نتایج واقعی</Eyebrow>
        <h1 className="mt-4 text-3xl font-bold text-ink-900 md:text-4xl">
          کسب‌وکارهای واقعی، عددهای واقعی
        </h1>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((cs) => (
          <Link
            key={cs.slug}
            href={`/portfolio/${cs.slug}`}
            className="flex h-full flex-col rounded-2xl border border-ink-150 bg-white p-8 shadow-card transition-shadow duration-300 hover:shadow-card-hover"
          >
            <p className="text-xs font-semibold text-accent-600">{cs.industry}</p>
            <h3 className="mt-2 text-lg font-bold text-ink-900">{cs.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">{cs.result}</p>

            <div className="relative mt-6 rounded-xl border border-dashed border-ink-300 bg-ink-50 px-5 py-4">
              <span className="absolute -right-2.5 -top-2.5 flex h-7 w-7 rotate-[-12deg] items-center justify-center rounded-full border-2 border-accent-500/70 bg-white text-accent-600">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className="h-3 w-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <p className="text-xl font-bold text-ink-900">{cs.metricValue}</p>
              <p className="text-xs text-ink-600">{cs.metricLabel}</p>
            </div>

            <span className="mt-6 text-sm font-semibold text-accent-600">
              مشاهده‌ی جزئیات ←
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
