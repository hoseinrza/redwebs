import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Section from "@/components/Section";
import Button from "@/components/Button";
import Eyebrow from "@/components/Eyebrow";
import { caseStudies, getCaseStudyBySlug } from "@/lib/data/case-studies";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const cs = getCaseStudyBySlug(params.slug);
  if (!cs) return {};
  return {
    title: cs.name,
    description: cs.result,
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const cs = getCaseStudyBySlug(params.slug);
  if (!cs) notFound();

  return (
    <Section className="pt-16 md:pt-20">
      <div className="mx-auto max-w-2xl">
        <Link href="/portfolio" className="text-sm font-medium text-accent-600 hover:underline">
          ← بازگشت به نمونه‌کارها
        </Link>

        <p className="mt-6 text-xs font-semibold tracking-wide text-accent-600">{cs.industry}</p>
        <h1 className="mt-2 text-3xl font-bold text-ink-900 md:text-4xl">{cs.name}</h1>

        <div className="relative mt-8 rounded-xl border border-dashed border-ink-300 bg-ink-50 px-6 py-5">
          <span className="absolute -right-2.5 -top-2.5 flex h-8 w-8 rotate-[-12deg] items-center justify-center rounded-full border-2 border-accent-500/70 bg-white text-accent-600">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className="h-3.5 w-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <p className="text-2xl font-bold text-ink-900">{cs.metricValue}</p>
          <p className="text-sm text-ink-600">{cs.metricLabel}</p>
        </div>

        <div className="mt-10 space-y-8">
          <div>
            <h2 className="text-lg font-bold text-ink-900">مسئله</h2>
            <p className="mt-2 leading-loose text-ink-600">{cs.problem}</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-ink-900">راه‌حل</h2>
            <p className="mt-2 leading-loose text-ink-600">{cs.solution}</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-ink-900">زمان‌بندی</h2>
            <p className="mt-2 leading-loose text-ink-600">{cs.timeline}</p>
          </div>
        </div>

        <blockquote className="mt-10 border-s-2 border-accent-400 ps-4 text-base italic leading-relaxed text-ink-700">
          «{cs.quote}»
        </blockquote>
        <p className="mt-3 text-sm font-medium text-ink-900">{cs.author}</p>

        <div className="mt-12 rounded-2xl bg-ink-950 p-8 text-center">
          <h3 className="text-xl font-bold text-white">
            به فکر یه پروژه‌ی مشابه هستید؟
          </h3>
          <div className="mt-6">
            <Button href="/services">مشاهده‌ی پکیج‌ها</Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
