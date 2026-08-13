"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import DashEyebrow from "@/components/DashEyebrow";

const standardFeatures = [
  "سایت‌های شرکتی و کسب‌وکاری",
  "صفحات خدمات و لندینگ‌پیج",
  "فروشگاه‌های اینترنتی",
  "پیاده‌سازی روی وردپرس",
];

const customFeatures = [
  "پنل و داشبورد اختصاصی",
  "سیستم رزرو و مدیریت سفارش",
  "اتوماسیون فرآیندهای کسب‌وکار",
  "API و یکپارچه‌سازی اختصاصی",
];

const steps = ["انتخاب", "طراحی", "توسعه", "لانچ"];

export default function PathsSection() {
  const [stdHover, setStdHover] = useState(false);
  const [stdStep, setStdStep] = useState(0);
  const [custHover, setCustHover] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!stdHover) return;
    timerRef.current = setInterval(() => {
      setStdStep((s) => (s < 3 ? s + 1 : 0));
    }, 900);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [stdHover]);

  function handleStdEnter() {
    setStdStep(0);
    setStdHover(true);
  }
  function handleStdLeave() {
    setStdHover(false);
    setStdStep(0);
  }

  return (
    <section className="py-20 md:py-28 lg:py-[120px]">
      <div className="mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-14">
        <div className="max-w-xl">
          <DashEyebrow>انتخاب مسیر</DashEyebrow>
          <h2 className="mt-4 font-display text-3xl leading-[1.3] text-ink-900 md:text-5xl">
            دو مسیر داریم.
            <br />
            هدفمون یکیه.
          </h2>
          <p className="mt-5 max-w-md text-base leading-loose text-ink-600">
            بسته به نیاز، بودجه و میزان سفارشی‌سازی، مسیر مناسب پروژه‌ات رو
            انتخاب کن.
          </p>
        </div>

        <div className="mt-16 flex flex-wrap items-stretch gap-0 md:flex-nowrap">
          {/* Standard card */}
          <div
            onMouseEnter={handleStdEnter}
            onMouseLeave={handleStdLeave}
            className="relative z-[2] mt-10 max-w-[440px] flex-1 rounded-3xl border border-ink-150 bg-white p-8 transition-[transform,box-shadow] duration-300 ease-out"
            style={{
              transform: stdHover ? "translateY(-6px) rotate(-1deg)" : "rotate(-1deg)",
              boxShadow: stdHover
                ? "0 30px 60px -20px rgb(10 10 11 / 0.2)"
                : "0 1px 2px rgb(10 10 11 / 0.04), 0 16px 32px -16px rgb(10 10 11 / 0.12)",
            }}
          >
            <div className="absolute -top-3.5 right-7 flex gap-2">
              <span className="rounded-full bg-accent-50 px-3 py-1.5 text-[10.5px] font-bold text-accent-600 shadow-[0_4px_12px_-4px_rgb(196_31_54_/_0.3)]">
                سریع
              </span>
              <span className="rounded-full bg-ink-950 px-3 py-1.5 text-[10.5px] font-bold text-white">
                شفاف
              </span>
            </div>

            <p className="mt-3 text-[11px] font-bold tracking-wide text-ink-400">CARD 01</p>
            <h3 className="mt-2 font-display text-2xl text-ink-900">مسیر استاندارد</h3>
            <p className="mt-3.5 text-sm leading-loose text-ink-600">
              برای کسب‌وکارهایی که یک سایت حرفه‌ای، سریع و آماده می‌خواهند؛
              بدون پیچیدگی اضافه.
            </p>

            <div className="mt-6 flex items-center gap-1.5">
              {steps.map((step, i) => (
                <div key={step} className="flex flex-1 items-center gap-1.5 last:flex-none">
                  <span
                    className="text-[11px] font-bold transition-colors duration-300"
                    style={{ color: stdHover && stdStep >= i ? "#c41f36" : "#a1a1aa" }}
                  >
                    {step}
                  </span>
                  {i < steps.length - 1 && (
                    <span className="relative h-px flex-1 overflow-hidden bg-ink-150">
                      <span
                        className="absolute inset-0 origin-right bg-accent-600 transition-transform duration-500"
                        style={{
                          transform: `scaleX(${stdHover && stdStep >= i + 1 ? 1 : 0})`,
                        }}
                      />
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-2.5 border-t border-ink-100 pt-5">
              {standardFeatures.map((item) => (
                <div key={item} className="flex items-center gap-2 text-[13px] text-ink-700">
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-600" />
                  {item}
                </div>
              ))}
            </div>

            <Link
              href="/services"
              className="mt-7 inline-flex items-center gap-2 border-b-2 border-ink-950 py-1 text-sm font-bold text-ink-950 transition-transform duration-200"
              style={{ transform: stdHover ? "translateX(-4px)" : "translateX(0)" }}
            >
              این مسیر رو می‌خوام ↗
            </Link>
          </div>

          {/* Divider */}
          <div className="relative z-[3] hidden w-16 flex-shrink-0 flex-col items-center justify-center gap-3 md:flex">
            <span className="text-[11px] font-medium text-ink-500 [writing-mode:vertical-rl]">
              ساده شروع کن
            </span>
            <div className="h-6 w-px bg-ink-200" />
            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent-50 text-[11px] font-bold text-accent-600">
              یا
            </span>
            <div className="h-6 w-px bg-ink-200" />
            <span className="text-[11px] font-medium text-ink-500 [writing-mode:vertical-rl]">
              از صفر بساز
            </span>
          </div>

          {/* Custom card */}
          <div
            onMouseEnter={() => setCustHover(true)}
            onMouseLeave={() => setCustHover(false)}
            className="relative z-[2] min-w-0 flex-1 overflow-hidden rounded-3xl bg-ink-950 p-9 transition-[transform,box-shadow] duration-300 ease-out"
            style={{
              transform: custHover ? "translateY(-8px) rotate(0.5deg)" : "rotate(0.5deg)",
              boxShadow: custHover
                ? "0 40px 80px -20px rgb(0 0 0 / 0.5)"
                : "0 20px 50px -16px rgb(10 10 11 / 0.4)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-100"
              style={{
                backgroundImage:
                  "linear-gradient(rgb(255 255 255 / 0.05) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.05) 1px, transparent 1px)",
                backgroundSize: "36px 36px",
              }}
            />
            <div
              className="pointer-events-none absolute -left-14 -top-24 h-64 w-64 rounded-full blur-[70px] transition-[background] duration-300"
              style={{ background: `rgb(226 55 74 / ${custHover ? 0.28 : 0.15})` }}
            />

            <span className="relative inline-flex items-center rounded-full border border-white/10 bg-white/[0.08] px-3.5 py-1.5 text-[10.5px] font-bold text-accent-400">
              برای پروژه‌های خاص
            </span>

            <p className="relative mt-4 text-[11px] font-bold tracking-wide text-ink-500">CARD 02</p>
            <h3 className="relative mt-2 font-display text-3xl text-white">مسیر اختصاصی</h3>
            <p className="relative mt-3.5 max-w-md text-sm leading-loose text-ink-300">
              برای پروژه‌هایی که نیاز به منطق سفارشی، یکپارچه‌سازی و
              قابلیت‌های فراتر از یک سایت معمولی دارند.
            </p>

            <div className="relative my-7 flex h-[70px] items-center gap-4">
              <span
                className="h-3.5 w-3.5 flex-shrink-0 rounded-full bg-accent-500 transition-shadow duration-300"
                style={{ boxShadow: `0 0 0 4px rgb(226 55 74 / ${custHover ? 0.35 : 0.15})` }}
              />
              <span
                className="h-px flex-1 transition-[background] duration-300"
                style={{
                  background: `linear-gradient(to left, rgb(226 55 74 / ${custHover ? 1 : 0.25}), rgb(255 255 255 / 0.1))`,
                }}
              />
              <span
                className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-white transition-opacity duration-300"
                style={{ opacity: custHover ? 1 : 0.25 }}
              />
              <span
                className="h-px flex-1 transition-[background] duration-300"
                style={{
                  background: `linear-gradient(to left, rgb(226 55 74 / ${custHover ? 1 : 0.25}), rgb(255 255 255 / 0.1))`,
                }}
              />
              <span
                className="h-3.5 w-3.5 flex-shrink-0 rounded-full bg-accent-500 transition-shadow duration-300"
                style={{ boxShadow: `0 0 0 4px rgb(226 55 74 / ${custHover ? 0.35 : 0.15})` }}
              />
              <span className="h-px flex-1 bg-white/10" />
              <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-white opacity-60" />
            </div>

            <div className="relative grid grid-cols-1 gap-2.5 border-t border-white/[0.08] pt-5 sm:grid-cols-2">
              {customFeatures.map((item) => (
                <div key={item} className="flex items-center gap-2 text-[13px] text-ink-200">
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-400" />
                  {item}
                </div>
              ))}
            </div>

            <Link
              href="/services"
              className="relative mt-7 inline-flex items-center gap-2 rounded-xl bg-accent-600 px-6 py-3.5 text-sm font-bold text-white shadow-[0_14px_40px_-10px_rgb(196_31_54_/_0.5)] transition-transform duration-200"
              style={{ transform: custHover ? "translateX(-4px)" : "translateX(0)" }}
            >
              پروژه اختصاصی دارم ↗
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
