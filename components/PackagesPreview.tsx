"use client";

import Link from "next/link";
import { Zap, Globe, Check, FileText, ArrowLeft } from "lucide-react";
import Container from "@/components/Container";
import DashEyebrow from "@/components/DashEyebrow";
import Button from "@/components/Button";
import { packages } from "@/lib/data/packages";

export default function PackagesPreview() {
  // Select 4 flagship packages (2 WordPress + 2 Custom Code)
  const featuredSlugs = [
    "business-wordpress",
    "store-woocommerce",
    "landing-custom",
    "business-custom",
  ];

  const featured = featuredSlugs
    .map((slug) => packages.find((p) => p.slug === slug))
    .filter((p): p is typeof packages[0] => Boolean(p));

  return (
    <section className="py-20 md:py-28 bg-ink-50/60 border-t border-ink-150" id="packages">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <DashEyebrow>تعرفه‌ها و پکیج‌های برگزیده</DashEyebrow>
            <h2 className="mt-3 font-display text-2xl font-bold text-ink-950 sm:text-3xl md:text-4xl">
              پکیج‌های شفاف با زمان‌بندی و قیمت مشخص
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-600 sm:text-base">
              از راه‌اندازی سریع با <strong>وردپرس</strong> تا توسعه پرسرعت با <strong>کدنویسی اختصاصی Next.js</strong>؛ چهار پکیج منتخب زیر را بررسی کنید یا تمام گزینه‌ها را در صفحه خدمات ببینید.
            </p>
          </div>

          <Button
            href="/services"
            className="!px-6 !py-3 text-sm font-bold shadow-sm inline-flex items-center gap-2"
          >
            <span>مشاهده تمام پکیج‌ها ({packages.length} پکیج کامل)</span>
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>

        {/* 4 Flagship Package Cards Grid */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((pkg) => {
            const isPopular = pkg.popular;
            const isCustom = pkg.techType === "custom_code";

            return (
              <div
                key={pkg.slug}
                className={`relative flex flex-col justify-between overflow-hidden rounded-2xl p-5 sm:p-5.5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover ${
                  isPopular
                    ? "border-2 border-accent-500 bg-white"
                    : "border border-ink-150 bg-white"
                }`}
              >
                {isPopular && (
                  <div className="absolute top-0 right-0 bg-accent-500 px-3 py-0.5 text-[10px] font-bold text-white rounded-bl-lg shadow-xs">
                    پیشنهادی
                  </div>
                )}

                <div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        isCustom
                          ? "bg-accent-50 text-accent-700 border border-accent-200/60"
                          : "bg-emerald-50 text-emerald-800 border border-emerald-200/60"
                      }`}
                    >
                      {isCustom ? (
                        <>
                          <Zap className="h-2.5 w-2.5 text-accent-600" />
                          <span>کدنویسی اختصاصی</span>
                        </>
                      ) : (
                        <>
                          <Globe className="h-2.5 w-2.5 text-emerald-600" />
                          <span>وردپرس</span>
                        </>
                      )}
                    </span>
                    <span className="rounded-full bg-ink-50 px-2 py-0.5 text-[10px] font-bold text-ink-500">
                      مسیر {pkg.track}
                    </span>
                  </div>

                  <h3 className="mt-3 font-display text-base font-bold text-ink-950">
                    {pkg.name}
                  </h3>

                  <p className="mt-1 text-xs text-ink-500 line-clamp-1">
                    {pkg.tagline}
                  </p>

                  <div className="my-3.5 rounded-xl border border-ink-100 bg-ink-50/50 p-2.5">
                    <div className="flex items-baseline justify-between gap-1">
                      <span className="text-[10.5px] text-ink-400">شروع از:</span>
                      <p className="font-display text-lg font-black text-accent-600">
                        {pkg.priceLabel}
                      </p>
                    </div>
                    <span className="mt-0.5 block text-left text-[10px] text-ink-500 font-medium">
                      تحویل: {pkg.deliveryTime}
                    </span>
                  </div>

                  <ul className="space-y-1.5">
                    {pkg.features.slice(0, 3).map((feat) => (
                      <li key={feat} className="flex items-start gap-1.5 text-xs text-ink-700 leading-snug">
                        <span
                          className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full text-[9px] font-bold mt-0.5 ${
                            isCustom
                              ? "bg-accent-50 text-accent-600"
                              : "bg-emerald-50 text-emerald-700"
                          }`}
                        >
                          <Check className="h-2.5 w-2.5" />
                        </span>
                        <span className="line-clamp-1">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 pt-3 border-t border-ink-100">
                  <Button
                    href={`/services/${pkg.slug}`}
                    variant={isPopular ? "primary" : "outline"}
                    className="w-full justify-center !py-2 !text-xs font-bold inline-flex items-center gap-1"
                  >
                    <span>مشاهده مشخصات</span>
                    <ArrowLeft className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner to Services Page */}
        <div className="mt-10 rounded-2xl border border-ink-200/80 bg-white p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
              <FileText className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-ink-950">
                دنبال پلن‌های وب‌اپلیکیشن، داشبورد اختصاصی یا اتوماسیون هستید؟
              </p>
              <p className="text-xs text-ink-500 mt-0.5">
                در صفحه خدمات، جدول مقایسه کامل وردپرس و کدنویسی، راهنمای انتخاب و تمام ۸ پکیج را مشاهده کنید.
              </p>
            </div>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-accent-600 hover:text-accent-700 underline underline-offset-4"
          >
            <span>ورود به صفحه خدمات و تعرفه‌ها</span>
            <ArrowLeft className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
