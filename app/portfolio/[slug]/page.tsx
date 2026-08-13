import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/Container";
import CaseStudyDetailClient from "@/components/CaseStudyDetailClient";
import { caseStudies, getCaseStudyBySlug } from "@/lib/data/case-studies";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const cs = getCaseStudyBySlug(params.slug);
  if (!cs) return {};
  return {
    title: `${cs.name} | بررسی نمونه‌کار و نتایج استودیو ردوبز`,
    description: cs.result,
  };
}

export default function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const cs = getCaseStudyBySlug(params.slug);
  if (!cs) notFound();

  const relatedStudies = caseStudies.filter((s) => s.slug !== cs.slug);

  return (
    <>
      {/* Breadcrumb Navigation Bar */}
      <div className="bg-ink-50/60 border-b border-ink-150/70 py-4">
        <Container>
          <nav className="flex items-center justify-between gap-2 text-xs font-medium text-ink-500">
            <div className="flex items-center gap-2 truncate">
              <Link href="/" className="hover:text-ink-950 transition-colors">
                صفحه اصلی
              </Link>
              <span>/</span>
              <Link href="/portfolio" className="hover:text-ink-950 transition-colors">
                نمونه‌کارها
              </Link>
              <span>/</span>
              <span className="text-ink-950 font-bold truncate max-w-[200px] sm:max-w-md">
                {cs.name}
              </span>
            </div>

            <Link
              href="/portfolio"
              className="shrink-0 inline-flex items-center gap-1 text-xs font-bold text-accent-600 hover:text-accent-700 underline underline-offset-4"
            >
              <ArrowRight className="h-3.5 w-3.5" />
              <span>همه نمونه‌کارها</span>
            </Link>
          </nav>
        </Container>
      </div>

      {/* Main Container */}
      <Container className="py-10 sm:py-14">
        <CaseStudyDetailClient study={cs} relatedStudies={relatedStudies} />
      </Container>
    </>
  );
}
