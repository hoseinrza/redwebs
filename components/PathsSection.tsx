"use client";

import { useState } from "react";
import Link from "next/link";
import { Globe, Zap, Check, ArrowLeft } from "lucide-react";
import Container from "@/components/Container";
import DashEyebrow from "@/components/DashEyebrow";

const wpFeatures = [
  "راه‌اندازی سریع و اقتصادی با وردپرس و ووکامرس",
  "پنل مدیریت محتوای ساده و فارسی برای شما و همکارانتان",
  "طراحی سفارشی بدون قالب‌های سنگین آماده",
  "امکان اضافه کردن افزونه‌های مختلف در آینده",
  "تحویل سریع در ۱ تا ۳ هفته",
];

const customFeatures = [
  "کدنویسی تمیز فرانت‌اند و بک‌اند با Next.js 14 و TypeScript",
  "سرعت بارگذاری فوق‌العاده زیر ۱ ثانیه (Lighthouse 100)",
  "امنیت حداکثری و نفوذناپذیر در برابر باگ‌های افزونه‌ها",
  "ساختار کامپوننت‌محور و انعطاف نامحدود در طراحی UI/UX",
  "مناسب سامانه‌های سازمانی، داشبوردها و پلتفرم‌های پرترافیک",
];

export default function PathsSection() {
  const [activeHover, setActiveHover] = useState<"wp" | "custom" | null>(null);

  return (
    <section className="py-20 md:py-28 lg:py-[110px]" id="paths">
      <Container>
        <div className="max-w-xl">
          <DashEyebrow>انتخاب تکنولوژی پیاده‌سازی</DashEyebrow>
          <h2 className="mt-3 font-display text-3xl font-extrabold leading-snug text-ink-950 sm:text-4xl md:text-5xl">
            وردپرس یا کدنویسی اختصاصی؟
            <br />
            <span className="text-accent-600">هر دو را به بهترین شکل اجرا می‌کنیم.</span>
          </h2>
          <p className="mt-4 text-base leading-loose text-ink-600">
            بسته به نوع کسب‌وکار، بودجه و افق رشد مد نظرتان، مسیر مناسب پروژه‌تان را انتخاب کنید. تیم ما در هر دو زمینه تخصص و وسواس فنی دارد.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* 1. WordPress Path Card */}
          <div
            onMouseEnter={() => setActiveHover("wp")}
            onMouseLeave={() => setActiveHover(null)}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-emerald-200/80 bg-white p-8 sm:p-10 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover"
          >
            {/* Tag */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-800 border border-emerald-200/70">
                <Globe className="h-3.5 w-3.5 text-emerald-600" />
                <span>مسیر وردپرس (WordPress)</span>
              </span>
              <span className="text-xs font-bold text-ink-400">سریع و اقتصادی</span>
            </div>

            <div className="mt-6">
              <h3 className="font-display text-2xl font-bold text-ink-950 sm:text-3xl">
                طراحی با وردپرس و ووکامرس
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-600 sm:text-base">
                مناسب کسب‌وکارهایی که می‌خواهند با هزینه‌ای مناسب و در کمترین زمان ممکن، سایتی زیبا و با پنل مدیریتی آسان برای انتشار مقالات و فروش محصولات داشته باشند.
              </p>

              <div className="mt-7 space-y-3 border-t border-ink-100 pt-6">
                {wpFeatures.map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-xs sm:text-sm text-ink-700">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-bold text-emerald-700">
                      <Check className="h-3 w-3" />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 border-t border-ink-100 pt-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[11px] text-ink-400">شروع تعرفه از:</span>
                <p className="font-display text-lg font-black text-emerald-800">۸,۵۰۰,۰۰۰ تومان</p>
              </div>
              <Link
                href="/services?tech=wordpress"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 text-sm font-bold text-white shadow-sm transition-transform group-hover:-translate-x-1 hover:bg-emerald-800"
              >
                <span>مشاهده پکیج‌های وردپرس</span>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* 2. Custom Coding Path Card */}
          <div
            onMouseEnter={() => setActiveHover("custom")}
            onMouseLeave={() => setActiveHover(null)}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-ink-950 p-8 sm:p-10 text-white shadow-sign transition-all duration-300 hover:-translate-y-1.5"
          >
            {/* Ambient Background Glow */}
            <div className="pointer-events-none absolute -left-10 -top-10 h-64 w-64 rounded-full bg-accent-600/20 blur-[80px]" />

            {/* Tag */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold text-accent-300 border border-white/10 backdrop-blur-md">
                <Zap className="h-3.5 w-3.5 text-accent-400" />
                <span>مسیر کدنویسی اختصاصی (Next.js)</span>
              </span>
              <span className="text-xs font-bold text-ink-400">نهایت سرعت و پرفورمنس</span>
            </div>

            <div className="relative z-10 mt-6">
              <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
                توسعه اختصاصی با استک مدرن
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-300 sm:text-base">
                مناسب برندهای پیشرو، سامانه‌های پرترافیک، استارتاپ‌ها و سازمان‌هایی که نیاز به انعطاف ۱۰۰ درصدی، سرعت لود زیر ۱ ثانیه و امنیت بی‌نقص دارند.
              </p>

              <div className="mt-7 space-y-3 border-t border-white/10 pt-6">
                {customFeatures.map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-xs sm:text-sm text-ink-200">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-600/20 text-xs font-bold text-accent-400">
                      <Check className="h-3 w-3" />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-8 border-t border-white/10 pt-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[11px] text-ink-400">شروع تعرفه از:</span>
                <p className="font-display text-lg font-black text-accent-400">۱۴,۰۰۰,۰۰۰ تومان</p>
              </div>
              <Link
                href="/services?tech=custom"
                className="inline-flex items-center gap-2 rounded-xl bg-accent-600 px-6 py-3 text-sm font-bold text-white shadow-glow transition-transform group-hover:-translate-x-1 hover:bg-accent-500"
              >
                <span>مشاهده پکیج‌های کدنویسی</span>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
