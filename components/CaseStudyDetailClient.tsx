"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Calendar,
  Share2,
  Check,
  TrendingUp,
  Layers,
  Code2,
  Sparkles,
  PhoneCall,
  Quote,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { CaseStudy } from "@/lib/types";

interface CaseStudyDetailClientProps {
  study: CaseStudy;
  relatedStudies: CaseStudy[];
}

export default function CaseStudyDetailClient({
  study,
  relatedStudies,
}: CaseStudyDetailClientProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="space-y-12">
      {/* Main Grid: Content (Left) + Sticky Project Sidebar (Right) */}
      <div className="grid gap-10 lg:grid-cols-[1fr_340px] items-start">
        {/* Main Case Content */}
        <div className="space-y-10">
          {/* Main Case Study Header Card */}
          <div className="rounded-3xl border border-ink-150 bg-white p-6 sm:p-10 shadow-card">
            {/* Meta Tags Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-100 pb-5 mb-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-accent-50 px-3 py-1 text-xs font-bold text-accent-700 border border-accent-200">
                  {study.category || "پروژه طراحی و توسعه"}
                </span>
                <span className="text-xs font-medium text-ink-500">
                  {study.industry}
                </span>
                {study.year && (
                  <>
                    <span className="text-ink-300">·</span>
                    <span className="text-xs text-ink-500 font-medium">{study.year}</span>
                  </>
                )}
              </div>

              {/* Share & Copy button */}
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 rounded-xl border border-ink-200 bg-ink-50 px-3 py-1.5 text-xs font-bold text-ink-700 hover:bg-ink-100 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="text-emerald-700">لینک کپی شد</span>
                  </>
                ) : (
                  <>
                    <Share2 className="h-3.5 w-3.5 text-ink-500" />
                    <span>اشتراک‌گذاری</span>
                  </>
                )}
              </button>
            </div>

            {/* Title & Tagline */}
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-ink-950 leading-tight">
              {study.name}
            </h1>
            {study.tagline && (
              <p className="mt-3 text-sm sm:text-base font-medium text-ink-600 leading-relaxed">
                {study.tagline}
              </p>
            )}

            {/* Visual Cover Header */}
            <div
              className="relative mt-8 aspect-[16/8] overflow-hidden rounded-2xl bg-ink-950 p-6 sm:p-8 text-white shadow-inner flex flex-col justify-between"
              style={{ background: study.gradient || "linear-gradient(135deg, #1c1917, #c41f36)" }}
            >
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(rgb(255 255 255 / 0.15) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.15) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <div className="relative z-10 flex items-center justify-between">
                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur-md border border-white/20">
                  {study.category}
                </span>
                <span className="rounded-full bg-black/40 px-3 py-1 text-xs font-medium backdrop-blur-md">
                  مدت زمان تحویل: {study.timeline}
                </span>
              </div>

              <div className="relative z-10">
                <span className="text-xs text-white/80 font-bold block mb-1">
                  شاخص کلیدی موفقیت پروژه:
                </span>
                <p className="font-display text-2xl sm:text-3xl font-black text-white">
                  {study.metricValue}
                </p>
                <p className="text-xs text-white/70 mt-1">{study.metricLabel}</p>
              </div>
            </div>

            {/* Before / After Metrics Comparison Grid */}
            {study.beforeAfterMetrics && study.beforeAfterMetrics.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-4 w-4 text-emerald-600" />
                  <h3 className="font-display text-base font-bold text-ink-950">
                    شاخص‌های مقایسه‌ای عملکرد (قبل و بعد از بازطراحی)
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {study.beforeAfterMetrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-ink-150 bg-ink-50/70 p-4 flex flex-col justify-between"
                    >
                      <span className="text-xs font-bold text-ink-800 block mb-2">
                        {metric.label}
                      </span>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="rounded-md bg-rose-100/70 px-2 py-0.5 text-rose-800 font-semibold line-through">
                            {metric.before}
                          </span>
                          <span className="text-ink-400">←</span>
                          <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-emerald-800 font-bold">
                            {metric.after}
                          </span>
                        </div>
                        <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-[11px] font-extrabold text-white">
                          {metric.diff}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Deep-Dive Problem and Solution Sections */}
            <div className="mt-10 space-y-8 pt-8 border-t border-ink-150">
              {/* Problem */}
              <div>
                <h3 className="font-display text-lg font-bold text-ink-950 flex items-center gap-2 mb-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-rose-100 text-rose-700 text-xs font-black">
                    !
                  </span>
                  <span>صورت مسئله و چالش‌های اولیه کارفرما</span>
                </h3>
                <p className="text-sm sm:text-base leading-loose text-ink-700 text-justify bg-rose-50/30 p-5 rounded-2xl border border-rose-100">
                  {study.problem}
                </p>
              </div>

              {/* Solution */}
              <div>
                <h3 className="font-display text-lg font-bold text-ink-950 flex items-center gap-2 mb-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 text-xs font-black">
                    ✓
                  </span>
                  <span>راهکار اجرایی، بازطراحی و پیاده‌سازی ردوبز</span>
                </h3>
                <p className="text-sm sm:text-base leading-loose text-ink-700 text-justify bg-emerald-50/30 p-5 rounded-2xl border border-emerald-100">
                  {study.solution}
                </p>
              </div>

              {/* Key Features */}
              {study.keyFeatures && study.keyFeatures.length > 0 && (
                <div>
                  <h3 className="font-display text-base font-bold text-ink-950 mb-3 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-accent-600" />
                    <span>امکانات و قابلیت‌های پیاده‌سازی‌شده</span>
                  </h3>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {study.keyFeatures.map((feat, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 rounded-xl bg-ink-50 p-3.5 border border-ink-100 text-xs sm:text-sm text-ink-800"
                      >
                        <CheckCircle2 className="h-4 w-4 text-accent-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Client Quote Card */}
              <div className="rounded-2xl bg-ink-950 text-white p-6 sm:p-8 shadow-card flex flex-col sm:flex-row items-start gap-4">
                <Quote className="h-8 w-8 text-accent-400 shrink-0" />
                <div className="space-y-3">
                  <p className="text-sm sm:text-base italic leading-relaxed text-ink-100">
                    &ldquo;{study.quote}&rdquo;
                  </p>
                  <div className="border-t border-white/15 pt-3">
                    <span className="font-bold text-sm text-white block">
                      {study.author}
                    </span>
                    <span className="text-xs text-ink-400">
                      {study.authorRole || "کارفرمای پروژه"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Project Sidebar (Right) */}
        <aside className="space-y-6 lg:sticky lg:top-24">
          {/* Project Details Spec Box */}
          <div className="rounded-3xl border border-ink-150 bg-white p-6 shadow-card space-y-5">
            <h3 className="text-sm font-bold text-ink-950 border-b border-ink-100 pb-3 flex items-center gap-2">
              <Layers className="h-4 w-4 text-accent-600" />
              <span>مشخصات و متادیتای پروژه</span>
            </h3>

            {/* Spec items */}
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-ink-400 block mb-0.5">کارفرما و برند:</span>
                <strong className="text-ink-900 font-bold text-sm">{study.name}</strong>
              </div>

              <div>
                <span className="text-ink-400 block mb-0.5">حوزه فعالیت و صنعت:</span>
                <span className="text-ink-800 font-semibold">{study.industry}</span>
              </div>

              <div>
                <span className="text-ink-400 block mb-0.5">مدت زمان اجرا و تحویل:</span>
                <span className="text-ink-800 font-semibold">{study.timeline}</span>
              </div>

              {study.techStack && study.techStack.length > 0 && (
                <div>
                  <span className="text-ink-400 block mb-1.5">استک فنی و تکنولوژی‌ها:</span>
                  <div className="flex flex-wrap gap-1">
                    {study.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-ink-100 px-2 py-0.5 text-[11px] font-medium text-ink-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {study.deliverables && study.deliverables.length > 0 && (
                <div className="pt-2 border-t border-ink-100">
                  <span className="text-ink-400 block mb-1.5 font-semibold">خروجی‌های تحویل‌شده:</span>
                  <ul className="space-y-1.5 text-[11px] text-ink-700">
                    {study.deliverables.map((del, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent-500 mt-1.5 shrink-0" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* CTA action */}
            <div className="pt-3 border-t border-ink-150">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-accent-500 px-4 py-3 text-xs sm:text-sm font-bold text-white hover:bg-accent-600 transition-colors shadow-glow"
              >
                <PhoneCall className="h-4 w-4" />
                <span>سفارش پروژه مشابه</span>
              </Link>
            </div>
          </div>

          {/* Guarantee pill */}
          <div className="rounded-2xl border border-ink-150 bg-ink-50/70 p-4 text-xs text-ink-700 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-ink-900">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>تضمین کیفیت ردوبز</span>
            </div>
            <p className="leading-relaxed text-[11.5px] text-ink-600">
              تمام پروژه‌ها همراه با قرارداد رسمی، تضمین لود زیر ۱.۵ ثانیه و ۳ ماه پشتیبانی فنی مستقیم اجرا می‌شوند.
            </p>
          </div>
        </aside>
      </div>

      {/* Related Case Studies */}
      {relatedStudies.length > 0 && (
        <div className="pt-8 border-t border-ink-150">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display text-xl font-bold text-ink-950">
                سایر نمونه‌کارهای موفق
              </h3>
              <p className="text-xs sm:text-sm text-ink-500 mt-1">
                بررسی داستان تحول دیجیتال در سایر کسب‌وکارها
              </p>
            </div>

            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1 text-xs font-bold text-accent-600 hover:text-accent-700 underline"
            >
              <span>مشاهده همه</span>
              <ArrowLeft className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedStudies.slice(0, 3).map((rel) => (
              <Link
                key={rel.slug}
                href={`/portfolio/${rel.slug}`}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-ink-150 bg-white p-5 shadow-card transition-all hover:-translate-y-1 hover:border-accent-300 hover:shadow-card-hover"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-accent-600 font-bold mb-2">
                    <span>{rel.category || "نمونه‌کار"}</span>
                    <span className="text-ink-400 font-normal">{rel.timeline}</span>
                  </div>

                  <h4 className="font-display text-base font-bold text-ink-950 group-hover:text-accent-600 transition-colors">
                    {rel.name}
                  </h4>

                  <p className="mt-2 text-xs text-ink-600 line-clamp-2 leading-relaxed">
                    {rel.tagline || rel.result}
                  </p>

                  <div className="mt-3 rounded-lg bg-emerald-50 p-2 text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                    <TrendingUp className="h-3.5 w-3.5" />
                    <span>{rel.metricValue}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-ink-100 flex items-center justify-between text-xs font-bold text-accent-600">
                  <span>مطالعه بررسی</span>
                  <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
