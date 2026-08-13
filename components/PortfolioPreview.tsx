"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Sparkles, TrendingUp, Zap } from "lucide-react";
import Container from "@/components/Container";
import DashEyebrow from "@/components/DashEyebrow";
import Reveal from "@/components/Reveal";
import { caseStudies } from "@/lib/data/case-studies";

export default function PortfolioPreview() {
  const featuredCases = caseStudies.slice(0, 3);

  return (
    <section className="py-20 md:py-28 bg-ink-50/40 border-y border-ink-150/60" id="work">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <DashEyebrow>خروجی‌های واقعی و مستند</DashEyebrow>
            <h2 className="mt-3 font-display text-2xl font-black text-ink-950 sm:text-3xl md:text-4xl leading-tight">
              پروژه‌هایی که نتیجه ملموس تجاری رقم زدند
            </h2>
            <p className="mt-3 text-xs sm:text-sm md:text-base leading-relaxed text-ink-600">
              ما فراتر از ظاهر زیبا فکر می‌کنیم؛ هر پیکسل و هر خط کد در خدمت افزایش نرخ تبدیل، فروش مستقیم و کاهش اصطکاک مشتری است.
            </p>
          </div>

          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-xl bg-ink-950 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-xs transition-all hover:bg-accent-600 hover:shadow-glow self-start md:self-auto"
          >
            <span>مشاهده همه نمونه‌کارها ({caseStudies.length} پروژه)</span>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>

        {/* Project Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredCases.map((study, i) => (
            <Reveal
              key={study.slug}
              delay={i * 100}
              className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-ink-150 bg-white shadow-card transition-all duration-300 hover:-translate-y-2 hover:border-accent-300 hover:shadow-card-hover"
            >
              <div>
                {/* Visual Header / Cover */}
                <div
                  className="relative flex h-[210px] flex-col justify-between p-6 text-white overflow-hidden"
                  style={{ background: study.gradient || "linear-gradient(135deg, #18181b, #3f3f46)" }}
                >
                  {/* Subtle Grid overlay */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgb(255 255 255 / 0.15) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.15) 1px, transparent 1px)",
                      backgroundSize: "28px 28px",
                    }}
                  />

                  {/* Top bar */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="rounded-full bg-black/40 px-3 py-1 text-[11px] font-bold backdrop-blur-md border border-white/10">
                      {study.category || study.industry.split("—")[0]}
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-xs text-white backdrop-blur-md border border-white/20 transition-transform group-hover:scale-110 group-hover:bg-white group-hover:text-ink-950">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>

                  {/* Metric Result Highlight */}
                  <div className="relative z-10 rounded-2xl bg-black/40 p-3.5 backdrop-blur-md border border-white/15">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-300 mb-1">
                      <TrendingUp className="h-3.5 w-3.5" />
                      <span>نتیجه ملموس پروژه:</span>
                    </div>
                    <p className="font-display text-base sm:text-lg font-black text-white">
                      {study.metricValue}
                    </p>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6">
                  {/* Tech stack chips */}
                  {study.techStack && study.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {study.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-ink-100/70 px-2 py-0.5 text-[10.5px] font-medium text-ink-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <h3 className="font-display text-lg sm:text-xl font-bold text-ink-950 group-hover:text-accent-600 transition-colors">
                    {study.name}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink-600 line-clamp-2">
                    {study.tagline || study.result}
                  </p>

                  {/* Client Quote */}
                  <div className="mt-4 rounded-xl bg-ink-50/80 p-3.5 text-xs leading-relaxed text-ink-700 italic border border-ink-100">
                    &ldquo;{study.quote}&rdquo;
                    <span className="block mt-1.5 text-[11px] font-bold text-ink-500 not-italic">
                      — {study.author} ({study.authorRole || "کارفرما"})
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="border-t border-ink-100 p-6 pt-4 flex items-center justify-between">
                <span className="text-[11px] text-ink-500 font-medium flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  <span>{study.timeline}</span>
                </span>
                <Link
                  href={`/portfolio/${study.slug}`}
                  className="text-xs font-bold text-accent-600 hover:text-accent-700 inline-flex items-center gap-1 group-hover:underline"
                >
                  <span>بررسی کامل پروژه</span>
                  <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Value metrics strip */}
        <div className="mt-14 rounded-2xl border border-ink-200 bg-white p-6 shadow-card grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-ink-100">
          <div className="p-3">
            <span className="font-display text-xl sm:text-2xl font-black text-ink-950 block">
              ۱۰۰٪
            </span>
            <span className="text-xs text-ink-500 mt-1 block">تحویل سر موعد مقرر قرارداد</span>
          </div>
          <div className="p-3">
            <span className="font-display text-xl sm:text-2xl font-black text-accent-600 block">
              +۲۸۰٪
            </span>
            <span className="text-xs text-ink-500 mt-1 block">میانگین رشد نرخ تبدیل لید</span>
          </div>
          <div className="p-3">
            <span className="font-display text-xl sm:text-2xl font-black text-ink-950 block">
              زیر ۱.۲ ثانیه
            </span>
            <span className="text-xs text-ink-500 mt-1 block">سرعت لود در اینترنت موبایل</span>
          </div>
          <div className="p-3">
            <span className="font-display text-xl sm:text-2xl font-black text-accent-600 block">
              ۴.۹ / ۵
            </span>
            <span className="text-xs text-ink-500 mt-1 block">شاخص رضایت کارفرمایان</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
