"use client";

import { useState, useCallback } from "react";
import { Zap, Check } from "lucide-react";

export default function HeroVisual() {
  const [pos, setPos] = useState({ nx: 0, ny: 0 });

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setPos({ nx, ny });
  }, []);

  return (
    <div
      onMouseMove={onMove}
      className="relative hidden h-[500px] w-full items-center justify-center lg:flex"
      aria-hidden="true"
    >
      {/* 1. Main Studio Preview Card */}
      <div
        className="absolute right-4 top-4 w-[340px] rounded-3xl border border-ink-150 bg-white p-6 shadow-card transition-transform duration-200 ease-out"
        style={{
          transform: `translate(${(pos.nx * -16).toFixed(1)}px, ${(pos.ny * -12).toFixed(1)}px) rotate(-1.5deg)`,
        }}
      >
        <div className="flex items-center justify-between border-b border-ink-100 pb-3">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-rose-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
          </div>
          <span className="rounded-full bg-ink-50 px-2.5 py-0.5 text-[10px] font-bold text-ink-500">
            redwebs.agency/live
          </span>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-ink-900">نرخ تبدیل لید (Conversion)</span>
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
              +۲۸۰٪ افزایش
            </span>
          </div>

          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-ink-100">
            <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-accent-500 to-accent-600" />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-ink-50 p-2.5 text-center">
              <span className="text-[10px] text-ink-500">میانگین زمان لود</span>
              <p className="font-display text-base font-extrabold text-ink-900">۰.۸ ثانیه</p>
            </div>
            <div className="rounded-xl bg-ink-50 p-2.5 text-center">
              <span className="text-[10px] text-ink-500">امتیاز سئو فنی</span>
              <p className="font-display text-base font-extrabold text-accent-600">۱۰۰ / ۱۰۰</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Floating Dark Dev Stack Card */}
      <div
        className="absolute bottom-6 right-16 w-[310px] rounded-3xl bg-ink-950 p-6 text-white shadow-sign transition-transform duration-200 ease-out"
        style={{
          transform: `translate(${(pos.nx * 20).toFixed(1)}px, ${(pos.ny * 16).toFixed(1)}px) rotate(2deg)`,
        }}
      >
        <div className="flex items-center justify-between">
          <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-0.5 text-[10px] font-bold text-accent-300">
            MODERN STACK
          </span>
          <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
        </div>

        <h4 className="mt-3.5 font-display text-lg font-bold text-white">
          کدنویسی تمیز با Next.js 14
        </h4>
        <p className="mt-1.5 text-xs leading-relaxed text-ink-300">
          بدون وابستگی‌های سنگین، بدون پلاگین‌های زائد و با نهایت سرعت بارگذاری.
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5 border-t border-white/10 pt-3">
          {["Next.js 14", "WordPress / Woo", "TypeScript", "Tailwind"].map((tech) => (
            <span
              key={tech}
              className="rounded-lg bg-white/10 px-2 py-0.5 text-[10px] font-medium text-ink-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* 3. Floating Speed / Guarantee Badge */}
      <div
        className="absolute left-2 top-28 w-[190px] rounded-2xl border border-accent-100 bg-white p-4 shadow-card transition-transform duration-200 ease-out"
        style={{
          transform: `translate(${(pos.nx * -24).toFixed(1)}px, ${(pos.ny * 18).toFixed(1)}px) rotate(-4deg)`,
        }}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
            <Zap className="h-4 w-4 text-accent-600" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-ink-400">گارانتی سرعت</p>
            <p className="font-display text-xs font-black text-ink-950">Lighthouse Green</p>
          </div>
        </div>
        <div className="mt-2.5 flex items-center justify-between text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg">
          <span>Core Web Vitals</span>
          <span className="inline-flex items-center gap-1">
            <Check className="h-3 w-3" />
            <span>پاس شد</span>
          </span>
        </div>
      </div>
    </div>
  );
}

