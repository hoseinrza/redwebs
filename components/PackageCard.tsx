"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap, Globe, Check, ShoppingCart, ArrowLeft } from "lucide-react";
import { Package } from "@/lib/types";
import { useCart } from "@/lib/cart-context";

export default function PackageCard({ pkg }: { pkg: Package }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const isCustom = pkg.techType === "custom_code";

  function handleAdd() {
    addItem(pkg);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div
      className={`flex h-full flex-col justify-between rounded-2xl border p-5 sm:p-6 transition-all duration-300 ${
        pkg.popular
          ? "border-ink-950 bg-ink-950 text-white shadow-card hover:shadow-card-hover"
          : "border-ink-150 bg-white text-ink-900 shadow-card hover:shadow-card-hover"
      }`}
    >
      <div>
        <div className="flex flex-wrap items-center justify-between gap-1.5 mb-3">
          <div className="flex items-center gap-1.5">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                isCustom
                  ? pkg.popular
                    ? "bg-accent-500/20 text-accent-300 border border-accent-400/30"
                    : "bg-accent-50 text-accent-700 border border-accent-200/60"
                  : pkg.popular
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
                  : "bg-emerald-50 text-emerald-800 border border-emerald-200/60"
              }`}
            >
              {isCustom ? (
                <>
                  <Zap className="h-2.5 w-2.5" />
                  <span>کدنویسی اختصاصی</span>
                </>
              ) : (
                <>
                  <Globe className="h-2.5 w-2.5" />
                  <span>وردپرس</span>
                </>
              )}
            </span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                pkg.popular ? "bg-white/10 text-ink-300" : "bg-ink-50 text-ink-500"
              }`}
            >
              مسیر {pkg.track}
            </span>
          </div>

          {pkg.popular && (
            <span className="inline-flex items-center rounded-full bg-accent-500 px-2 py-0.5 text-[10px] font-bold text-white">
              محبوب‌ترین
            </span>
          )}
        </div>

        <h3 className="font-display text-lg font-bold leading-snug">
          <Link href={`/services/${pkg.slug}`} className="hover:underline">
            {pkg.name}
          </Link>
        </h3>
        <p className={`mt-1 text-xs line-clamp-2 ${pkg.popular ? "text-ink-300" : "text-ink-500"}`}>
          {pkg.tagline}
        </p>

        <div className={`my-3.5 rounded-xl border px-3.5 py-2.5 ${pkg.popular ? "border-white/10 bg-white/5" : "border-ink-100 bg-ink-50/50"}`}>
          <div className="flex items-baseline justify-between gap-2">
            <span className={`text-[11px] ${pkg.popular ? "text-ink-400" : "text-ink-500"}`}>
              شروع قیمت:
            </span>
            <p className={`font-display text-xl font-black ${pkg.popular ? "text-accent-400" : "text-accent-600"}`}>
              {pkg.priceLabel}
            </p>
          </div>
          <span className={`mt-0.5 block text-left text-[10.5px] ${pkg.popular ? "text-ink-400" : "text-ink-500"}`}>
            تحویل {pkg.deliveryTime}
          </span>
        </div>

        <ul className="mt-3 space-y-2 text-xs">
          {pkg.features.slice(0, 4).map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold mt-0.5 ${
                  pkg.popular
                    ? "bg-white/10 text-accent-300"
                    : isCustom
                    ? "bg-accent-50 text-accent-600"
                    : "bg-emerald-50 text-emerald-700"
                }`}
              >
                <Check className="h-2.5 w-2.5" />
              </span>
              <span className={`line-clamp-1 ${pkg.popular ? "text-ink-100" : "text-ink-700"}`}>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 flex flex-col gap-1.5 pt-3 border-t border-ink-100/30">
        <button
          type="button"
          onClick={handleAdd}
          className={`inline-flex min-h-[38px] w-full items-center justify-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all duration-200 active:scale-[0.98] ${
            pkg.popular
              ? "bg-accent-500 text-white hover:bg-accent-600 shadow-glow"
              : "bg-accent-600 text-white hover:bg-accent-700 shadow-sm"
          }`}
        >
          {added ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span>به سبد اضافه شد</span>
            </>
          ) : (
            <>
              <ShoppingCart className="h-3.5 w-3.5" />
              <span>افزودن به سبد سفارش</span>
            </>
          )}
        </button>

        <Link
          href={`/services/${pkg.slug}`}
          className={`text-center text-[11px] font-semibold py-1 transition-colors inline-flex items-center justify-center gap-1 ${
            pkg.popular ? "text-ink-300 hover:text-white" : "text-ink-500 hover:text-ink-950"
          }`}
        >
          <span>مشاهده مشخصات کامل</span>
          <ArrowLeft className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
