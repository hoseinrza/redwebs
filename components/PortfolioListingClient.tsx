"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Sparkles,
  TrendingUp,
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Layers,
  PhoneCall,
  Clock,
  Briefcase,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { CaseStudy } from "@/lib/types";

interface PortfolioListingClientProps {
  caseStudies: CaseStudy[];
}

export default function PortfolioListingClient({ caseStudies }: PortfolioListingClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>("همه");
  const [activeTech, setActiveTech] = useState<string>("همه");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = Array.from(
      new Set(caseStudies.map((cs) => cs.category).filter(Boolean) as string[])
    );
    return ["همه", ...cats];
  }, [caseStudies]);

  // Extract unique tech stacks
  const allTechs = useMemo(() => {
    const set = new Set<string>();
    caseStudies.forEach((cs) => {
      cs.techStack?.forEach((t) => {
        if (t.includes("Next.js")) set.add("Next.js");
        else if (t.includes("WordPress") || t.includes("وردپرس")) set.add("وردپرس");
        else if (t.includes("Tailwind")) set.add("Tailwind CSS");
        else if (t.includes("WooCommerce") || t.includes("ووکامرس")) set.add("ووکامرس");
      });
    });
    return ["همه", ...Array.from(set)];
  }, [caseStudies]);

  // Filtered case studies
  const filteredStudies = useMemo(() => {
    return caseStudies.filter((cs) => {
      const matchesCategory =
        activeCategory === "همه" || cs.category === activeCategory;

      const matchesTech =
        activeTech === "همه" ||
        cs.techStack?.some((t) => t.toLowerCase().includes(activeTech.toLowerCase()));

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        cs.name.toLowerCase().includes(query) ||
        cs.industry.toLowerCase().includes(query) ||
        cs.result.toLowerCase().includes(query) ||
        cs.solution.toLowerCase().includes(query) ||
        cs.techStack?.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesTech && matchesSearch;
    });
  }, [caseStudies, activeCategory, activeTech, searchQuery]);

  // Featured flagship case study
  const featuredCase = useMemo(() => {
    if (searchQuery || activeCategory !== "همه" || activeTech !== "همه") {
      return null;
    }
    return caseStudies.find((cs) => cs.featured) || caseStudies[0];
  }, [caseStudies, activeCategory, activeTech, searchQuery]);

  // Rest of the grid
  const gridStudies = useMemo(() => {
    if (featuredCase) {
      return filteredStudies.filter((cs) => cs.slug !== featuredCase.slug);
    }
    return filteredStudies;
  }, [filteredStudies, featuredCase]);

  return (
    <div className="space-y-12">
      {/* Search and Filters Bar */}
      <div className="rounded-3xl border border-ink-150 bg-white p-5 sm:p-7 shadow-card">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو در نام پروژه، تکنولوژی، صنعت..."
              className="w-full rounded-2xl border border-ink-200 bg-ink-50/70 py-2.5 pr-10 pl-4 text-xs sm:text-sm text-ink-950 placeholder:text-ink-400 focus:border-accent-500 focus:bg-white focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-ink-400 hover:text-ink-700"
              >
                پاک کردن
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              const count =
                cat === "همه"
                  ? caseStudies.length
                  : caseStudies.filter((cs) => cs.category === cat).length;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                    isActive
                      ? "bg-accent-600 text-white shadow-xs"
                      : "bg-ink-50 text-ink-700 hover:bg-ink-100 hover:text-ink-950"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                      isActive
                        ? "bg-white/25 text-white"
                        : "bg-ink-200/70 text-ink-600"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary Tech Filter Pills */}
        <div className="mt-4 pt-4 border-t border-ink-100 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-ink-400 font-bold text-[11px]">فیلتر تکنولوژی:</span>
          {allTechs.map((tech) => (
            <button
              key={tech}
              type="button"
              onClick={() => setActiveTech(tech)}
              className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition-colors ${
                activeTech === tech
                  ? "bg-ink-950 text-white"
                  : "bg-ink-100/60 text-ink-600 hover:bg-ink-200"
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Flagship Spotlight (When no search active) */}
      {featuredCase && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="relative overflow-hidden rounded-3xl border border-ink-200/90 bg-white shadow-card">
            <div className="grid gap-0 lg:grid-cols-[1.1fr_1fr]">
              {/* Visual Cover Side */}
              <div
                className="relative flex min-h-[300px] flex-col justify-between p-8 sm:p-10 text-white overflow-hidden"
                style={{ background: featuredCase.gradient || "linear-gradient(135deg, #1c1917, #c41f36)" }}
              >
                {/* Visual grid background */}
                <div
                  className="absolute inset-0 opacity-25"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgb(255 255 255 / 0.15) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.15) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />

                <div className="relative z-10 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-500 px-3 py-1 text-xs font-bold text-white shadow-xs">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>پروژه شاخص و ویژه</span>
                  </span>
                  <span className="rounded-full bg-black/40 px-3 py-1 text-xs font-semibold backdrop-blur-md border border-white/10">
                    {featuredCase.category}
                  </span>
                </div>

                <div className="relative z-10 my-8">
                  <span className="text-xs text-white/80 font-medium block mb-1">
                    {featuredCase.industry}
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-black text-white leading-snug">
                    {featuredCase.name}
                  </h2>
                  <p className="mt-2 text-xs sm:text-sm text-white/90 leading-relaxed max-w-lg">
                    {featuredCase.tagline}
                  </p>
                </div>

                {/* Metric pill */}
                <div className="relative z-10 rounded-2xl bg-black/50 p-4 backdrop-blur-md border border-white/20">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 mb-1">
                    <TrendingUp className="h-4 w-4" />
                    <span>تأثیر کلیدی بر بیزنس:</span>
                  </div>
                  <p className="font-display text-xl sm:text-2xl font-black text-white">
                    {featuredCase.metricValue}
                  </p>
                  <p className="text-[11px] text-white/70 mt-0.5">{featuredCase.metricLabel}</p>
                </div>
              </div>

              {/* Details and Deliverables Side */}
              <div className="flex flex-col justify-between p-8 sm:p-10">
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {featuredCase.techStack?.map((t) => (
                      <span
                        key={t}
                        className="rounded-lg bg-ink-100 px-2.5 py-1 text-xs font-medium text-ink-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-sm font-bold text-ink-900 mb-2">دستاوردهای کلیدی پروژه:</h3>
                  <ul className="space-y-2 mb-6">
                    {featuredCase.deliverables?.slice(0, 3).map((del, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-ink-700">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Testimonial Quote */}
                  <div className="rounded-2xl bg-ink-50 p-4 border border-ink-150 text-xs italic text-ink-800 leading-relaxed">
                    &ldquo;{featuredCase.quote}&rdquo;
                    <span className="block mt-2 font-bold text-[11px] text-ink-600 not-italic">
                      — {featuredCase.author} ({featuredCase.authorRole})
                    </span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-ink-150 flex items-center justify-between">
                  <span className="text-xs text-ink-500 font-medium flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-accent-500" />
                    <span>مدت اجرا: {featuredCase.timeline}</span>
                  </span>

                  <Link
                    href={`/portfolio/${featuredCase.slug}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-accent-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-accent-700 transition-colors shadow-xs"
                  >
                    <span>مشاهده بررسی کامل و نتایج</span>
                    <ArrowLeft className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Grid of Portfolio Cases */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base sm:text-lg font-bold text-ink-950 flex items-center gap-2">
            <Layers className="h-4 w-4 text-accent-600" />
            <span>
              {searchQuery || activeCategory !== "همه" || activeTech !== "همه"
                ? `نتایج فیلتر (${filteredStudies.length} نمونه‌کار)`
                : "سایر پروژه‌ها و بررسی‌های موردی"}
            </span>
          </h3>

          {(searchQuery || activeCategory !== "همه" || activeTech !== "همه") && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("همه");
                setActiveTech("همه");
              }}
              className="text-xs font-bold text-accent-600 hover:text-accent-700 underline"
            >
              نمایش همه نمونه‌کارها
            </button>
          )}
        </div>

        {gridStudies.length === 0 ? (
          <div className="rounded-3xl border border-ink-200 bg-white p-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-ink-100 text-ink-400 mb-3">
              <Search className="h-6 w-6" />
            </div>
            <h4 className="text-base font-bold text-ink-900">پروژه‌ای با این مشخصات یافت نشد</h4>
            <p className="mt-1 text-xs text-ink-500">
              لطفاً کلمات کلیدی دیگری را جستجو کنید یا فیلترهای دسته‌بندی و تکنولوژی را بازنشانی کنید.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("همه");
                setActiveTech("همه");
              }}
              className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-accent-600 px-4 py-2 text-xs font-bold text-white hover:bg-accent-700 transition-colors"
            >
              پاک کردن فیلترها
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {gridStudies.map((study, i) => (
                <motion.div
                  key={study.slug}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.35, delay: i * 0.05 },
                  }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="h-full"
                >
                  <Link
                    href={`/portfolio/${study.slug}`}
                    className="group flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-ink-150 bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-300 hover:shadow-card-hover"
                  >
                    <div>
                      {/* Visual Header */}
                      <div
                        className="relative h-44 w-full p-5 text-white overflow-hidden flex flex-col justify-between"
                        style={{ background: study.gradient || "linear-gradient(135deg, #18181b, #3f3f46)" }}
                      >
                        <div
                          className="absolute inset-0 opacity-20"
                          style={{
                            backgroundImage:
                              "linear-gradient(rgb(255 255 255 / 0.15) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.15) 1px, transparent 1px)",
                            backgroundSize: "24px 24px",
                          }}
                        />

                        <div className="relative z-10 flex items-center justify-between">
                          <span className="rounded-full bg-black/40 px-2.5 py-0.5 text-[10.5px] font-bold backdrop-blur-md border border-white/10">
                            {study.category || study.industry.split("—")[0]}
                          </span>
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-xs backdrop-blur-md transition-transform group-hover:scale-110">
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </span>
                        </div>

                        <div className="relative z-10 rounded-xl bg-black/40 p-2.5 backdrop-blur-md border border-white/15">
                          <span className="text-[10px] text-emerald-300 font-bold block">
                            نتیجه شاخص:
                          </span>
                          <span className="font-display text-sm font-extrabold text-white block truncate">
                            {study.metricValue}
                          </span>
                        </div>
                      </div>

                      {/* Content Details */}
                      <div className="p-5">
                        {study.techStack && study.techStack.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2.5">
                            {study.techStack.slice(0, 3).map((t) => (
                              <span
                                key={t}
                                className="rounded-md bg-ink-100 px-2 py-0.5 text-[10px] font-medium text-ink-600"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}

                        <h3 className="font-display text-base sm:text-lg font-bold text-ink-950 group-hover:text-accent-600 transition-colors leading-snug">
                          {study.name}
                        </h3>

                        <p className="mt-2 text-xs text-ink-600 leading-relaxed line-clamp-2">
                          {study.tagline || study.result}
                        </p>

                        <div className="mt-3.5 rounded-xl bg-ink-50/70 p-3 text-[11.5px] italic text-ink-700 border border-ink-100 line-clamp-2">
                          &ldquo;{study.quote}&rdquo;
                        </div>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="px-5 pb-5 pt-3 border-t border-ink-100 flex items-center justify-between">
                      <span className="text-[11px] text-ink-500 font-medium">
                        زمان تحویل: {study.timeline}
                      </span>

                      <span className="inline-flex items-center gap-1 text-xs font-bold text-accent-600 group-hover:text-accent-700">
                        <span>مطالعه نتایج</span>
                        <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Trust Badges & Guarantee */}
      <div className="rounded-3xl border border-ink-150 bg-white p-6 sm:p-8 shadow-card grid gap-6 md:grid-cols-3">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-ink-950">تضمین عملکرد و کیفیت</h4>
            <p className="mt-1 text-xs text-ink-600 leading-relaxed">
              تمام پروژه‌ها با استانداردهای سخت‌گیرانه سرعت لود زیر ۱.۵ ثانیه و بدون باگ تحویل داده می‌شوند.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-ink-950">تحویل بدون تاخیر زمانی</h4>
            <p className="mt-1 text-xs text-ink-600 leading-relaxed">
              زمان‌بندی قرارداد دقیق و شفاف است؛ در صورت هرگونه تاخیر از سمت تیم، خسارت طبق قرارداد پرداخت می‌شود.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <Briefcase className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-ink-950">پشتیبانی و آموزش اختصاصی</h4>
            <p className="mt-1 text-xs text-ink-600 leading-relaxed">
              آموزش ویدیویی کار با پنل و ۳ ماه پشتیبانی فنی رایگان شامل تمامی پکیج‌های توسعه وب است.
            </p>
          </div>
        </div>
      </div>

      {/* Project Inquiry CTA Banner */}
      <div className="rounded-3xl border border-ink-200/80 bg-gradient-to-br from-ink-950 via-ink-900 to-ink-950 p-8 sm:p-12 text-white shadow-card">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-500/20 px-3 py-1 text-xs font-bold text-accent-400 border border-accent-500/30 mb-3">
              <Zap className="h-3.5 w-3.5" />
              <span>شروع پروژه اختصاصی شما</span>
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-black leading-tight">
              می‌خواهید کسب‌وکار شما نمونه‌کار موفق بعدی ما باشد؟
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-ink-300 leading-relaxed">
              مشخصات و اهداف کسب‌وکارتان را با ما در میان بگذارید تا بهترین معماری، زمان‌بندی و پیش‌فاکتور دقیق را بدون تعصب دریافت کنید.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-accent-500 px-6 py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-accent-600 transition-colors shadow-glow"
            >
              <PhoneCall className="h-4 w-4" />
              <span>درخواست مشاوره و برآورد رایگان</span>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-6 py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-white/15 transition-colors"
            >
              <span>مشاهده لیست تعرفه پکیج‌ها</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
