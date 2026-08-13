"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Clock,
  Calendar,
  User,
  Share2,
  Check,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Sparkles,
  Quote,
  Layers,
  PhoneCall,
  ArrowLeft,
  Bookmark,
} from "lucide-react";
import { BlogPost } from "@/lib/types";

interface BlogPostClientProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div>
      {/* Top Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-accent-600 z-50 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="grid gap-10 lg:grid-cols-[1fr_320px] items-start">
        {/* Main Article Content */}
        <article className="space-y-8">
          {/* Article Header Card */}
          <div className="rounded-3xl border border-ink-150 bg-white p-6 sm:p-10 shadow-card">
            {/* Meta Tags Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-100 pb-5 mb-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-accent-50 px-3 py-1 text-xs font-bold text-accent-700 border border-accent-200">
                  {post.category}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-ink-500 font-medium">
                  <Clock className="h-3.5 w-3.5 text-ink-400" />
                  <span>{post.readingTime}</span>
                </span>
                <span className="text-ink-300">·</span>
                <span className="inline-flex items-center gap-1 text-xs text-ink-500 font-medium">
                  <Calendar className="h-3.5 w-3.5 text-ink-400" />
                  <span>{post.date}</span>
                </span>
              </div>

              {/* Share & Copy Action */}
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

            {/* Post Title */}
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-ink-950 leading-tight">
              {post.title}
            </h1>

            {/* Author Byline */}
            <div className="mt-5 flex items-center gap-3 pt-4 border-t border-ink-100">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink-950 text-white font-bold text-xs">
                {post.author.slice(0, 2)}
              </div>
              <div>
                <strong className="block text-xs sm:text-sm font-bold text-ink-900">
                  {post.author}
                </strong>
                <span className="text-[11px] text-ink-500">
                  {post.authorRole || "تیم تخصصی طراحی و توسعه وب"}
                </span>
              </div>
            </div>

            {/* Featured Visual Graphic */}
            <div
              className="relative mt-8 aspect-[16/8] overflow-hidden rounded-2xl bg-ink-950 shadow-inner"
              style={{ background: post.gradient }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(rgb(255 255 255 / 0.08) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.08) 1px, transparent 1px)",
                  backgroundSize: "36px 36px",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 text-white">
                <span className="text-xs font-semibold tracking-wide text-accent-300">
                  مباحث تخصصی وب و دیزاین
                </span>
              </div>
            </div>

            {/* Lead Excerpt */}
            <p className="mt-8 text-base sm:text-lg font-medium leading-loose text-ink-800 bg-ink-50/70 p-5 rounded-2xl border-r-4 border-accent-500">
              {post.excerpt}
            </p>

            {/* Key Takeaways Box */}
            {post.takeaways && post.takeaways.length > 0 && (
              <div className="mt-8 rounded-2xl border border-accent-200 bg-accent-50/40 p-6">
                <div className="flex items-center gap-2 text-accent-800 font-bold text-sm mb-3">
                  <Sparkles className="h-4 w-4 text-accent-600" />
                  <span>نکات کلیدی و خلاصه‌ی این مقاله:</span>
                </div>
                <ul className="space-y-2.5">
                  {post.takeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-ink-800">
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent-500 text-white mt-0.5 text-[10px] font-bold">
                        ✓
                      </span>
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Body Content Paragraphs */}
            <div className="mt-8 space-y-5 text-sm sm:text-base leading-loose text-ink-700 text-justify">
              {post.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* Structured Sections (Subheadings, Checklists, Callouts) */}
            {post.sections && post.sections.length > 0 && (
              <div className="mt-10 space-y-8 pt-8 border-t border-ink-150">
                {post.sections.map((section, idx) => (
                  <div key={idx} className="space-y-4">
                    {section.heading && (
                      <h2 className="font-display text-lg sm:text-xl font-bold text-ink-950 pt-2 border-b border-ink-100 pb-2">
                        {section.heading}
                      </h2>
                    )}

                    {section.paragraphs.map((p, pIdx) => (
                      <p
                        key={pIdx}
                        className="text-sm sm:text-base leading-loose text-ink-700 text-justify"
                      >
                        {p}
                      </p>
                    ))}

                    {/* Callout quote */}
                    {section.callout && (
                      <div className="my-5 rounded-2xl bg-ink-950 text-white p-5 sm:p-6 shadow-xs flex items-start gap-3">
                        <Quote className="h-6 w-6 text-accent-400 shrink-0 mt-1" />
                        <p className="text-xs sm:text-sm font-medium leading-relaxed text-ink-200">
                          {section.callout}
                        </p>
                      </div>
                    )}

                    {/* Checklist */}
                    {section.checklist && (
                      <div className="my-4 rounded-xl border border-ink-150 bg-ink-50/60 p-4 sm:p-5">
                        <ul className="space-y-2">
                          {section.checklist.map((item, cIdx) => (
                            <li
                              key={cIdx}
                              className="flex items-start gap-2 text-xs sm:text-sm text-ink-800"
                            >
                              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Tags & Bottom Share Bar */}
            <div className="mt-10 pt-6 border-t border-ink-150 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-ink-500">برچسب‌ها:</span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg bg-ink-100 px-2.5 py-1 text-xs font-medium text-ink-700 hover:bg-ink-200 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 rounded-xl bg-accent-600 px-4 py-2 text-xs font-bold text-white hover:bg-accent-700 transition-colors shadow-xs"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>لینک کپی شد</span>
                  </>
                ) : (
                  <>
                    <Share2 className="h-3.5 w-3.5" />
                    <span>کپی لینک مقاله</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Author Box */}
          <div className="rounded-2xl border border-ink-150 bg-white p-6 shadow-card flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-right">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-ink-950 text-white font-bold text-lg shadow-xs">
              {post.author.slice(0, 2)}
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h4 className="font-bold text-sm sm:text-base text-ink-950">{post.author}</h4>
                <span className="rounded-full bg-accent-50 px-2 py-0.5 text-[10px] font-bold text-accent-700">
                  نویسنده
                </span>
              </div>
              <p className="mt-1 text-xs text-ink-500">
                {post.authorRole || "کارشناس ارشد و مشاور استراتژی دیجیتال در استودیو ردوبز"}
              </p>
              <p className="mt-2 text-xs text-ink-600 leading-relaxed">
                تمرکز ما در ردوبز ارائه راهکارهای مهندسی‌شده و اختصاصی برای افزایش بهره‌وری و نرخ تبدیل سایت‌های مدرن ایرانی است.
              </p>
            </div>
          </div>
        </article>

        {/* Sidebar (Sticky) */}
        <aside className="space-y-6 lg:sticky lg:top-24">
          {/* Table of Contents / Outline */}
          {post.sections && post.sections.length > 0 && (
            <div className="rounded-2xl border border-ink-150 bg-white p-5 shadow-card">
              <h3 className="text-xs font-bold text-ink-950 flex items-center gap-1.5 border-b border-ink-100 pb-3">
                <Layers className="h-4 w-4 text-accent-600" />
                <span>سرفصل‌های این مقاله</span>
              </h3>
              <ul className="mt-3 space-y-2 text-xs">
                {post.sections.map((section, idx) => (
                  <li key={idx} className="text-ink-600 hover:text-accent-600 transition-colors">
                    <span className="text-accent-500 font-bold ml-1.5">•</span>
                    <span>{section.heading || `بخش ${idx + 1}`}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Consultation / Conversion Card */}
          <div className="rounded-2xl border border-ink-200/80 bg-ink-950 text-white p-6 shadow-card">
            <span className="inline-flex items-center gap-1 rounded-full bg-accent-500/20 px-2.5 py-0.5 text-[10px] font-bold text-accent-400 border border-accent-500/30 mb-2">
              <PhoneCall className="h-3 w-3" />
              <span>مشاوره تخصصی</span>
            </span>
            <h4 className="font-display text-base font-bold">
              می‌خواهید این استانداردها را در سایت خود پیاده کنید؟
            </h4>
            <p className="mt-2 text-xs text-ink-300 leading-relaxed">
              تیم فنی ردوبز آماده است وب‌سایت یا پروژه شما را از نظر سرعت، UX و سئو به صورت رایگان بررسی کند.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-accent-500 px-4 py-2.5 text-xs font-bold text-white hover:bg-accent-600 transition-colors shadow-glow"
              >
                <span>درخواست مشاوره رایگان</span>
                <ArrowLeft className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 px-4 py-2 text-xs font-semibold text-ink-200 hover:bg-white/10 transition-colors"
              >
                مشاهده تعرفه پکیج‌ها
              </Link>
            </div>
          </div>

          {/* Recent/Popular from this category */}
          {relatedPosts.length > 0 && (
            <div className="rounded-2xl border border-ink-150 bg-white p-5 shadow-card">
              <h3 className="text-xs font-bold text-ink-950 flex items-center gap-1.5 border-b border-ink-100 pb-3">
                <BookOpen className="h-4 w-4 text-accent-600" />
                <span>مقالات مرتبط</span>
              </h3>
              <div className="mt-3 divide-y divide-ink-100">
                {relatedPosts.slice(0, 3).map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    className="block py-3 group first:pt-1 last:pb-1"
                  >
                    <span className="text-[10px] font-bold text-accent-600 block mb-1">
                      {rel.category}
                    </span>
                    <h5 className="text-xs font-bold text-ink-900 group-hover:text-accent-600 transition-colors line-clamp-2 leading-snug">
                      {rel.title}
                    </h5>
                    <span className="text-[10.5px] text-ink-400 block mt-1">
                      {rel.readingTime}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
