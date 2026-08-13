"use client";

import { useState } from "react";
import Link from "next/link";
import { Package } from "@/lib/types";
import { useCart } from "@/lib/cart-context";

export default function PackageCard({ pkg }: { pkg: Package }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(pkg);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div
      className={`flex h-full flex-col rounded-2xl border p-8 transition-shadow duration-300 ${
        pkg.popular
          ? "border-ink-950 bg-ink-950 text-white shadow-card hover:shadow-card-hover"
          : "border-ink-150 bg-white text-ink-900 shadow-card hover:shadow-card-hover"
      }`}
    >
      {pkg.popular && (
        <span className="mb-4 inline-flex w-fit items-center rounded-full bg-accent-500 px-3 py-1 text-xs font-semibold text-white">
          محبوب‌ترین
        </span>
      )}

      <p className={`text-xs font-semibold tracking-wide ${pkg.popular ? "text-accent-400" : "text-accent-600"}`}>
        {pkg.track}
      </p>
      <h3 className="mt-2 font-display text-2xl leading-none">
        <Link href={`/services/${pkg.slug}`} className="hover:underline">
          {pkg.name}
        </Link>
      </h3>
      <p className={`mt-1 text-sm ${pkg.popular ? "text-ink-400" : "text-ink-500"}`}>{pkg.tagline}</p>

      <p className={`mt-5 text-2xl font-bold ${pkg.popular ? "text-white" : "text-ink-950"}`}>
        {pkg.priceLabel}
      </p>
      <p className={`mt-1 text-xs ${pkg.popular ? "text-ink-400" : "text-ink-500"}`}>
        زمان تحویل: {pkg.deliveryTime}
      </p>

      <p className={`mt-4 text-sm leading-relaxed ${pkg.popular ? "text-ink-300" : "text-ink-600"}`}>
        {pkg.description}
      </p>

      <ul className="mt-6 space-y-3 text-sm">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <svg
              className={`mt-0.5 h-4 w-4 flex-shrink-0 ${pkg.popular ? "text-accent-400" : "text-accent-500"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className={pkg.popular ? "text-ink-100" : "text-ink-700"}>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={handleAdd}
        className={`mt-8 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 ${
          pkg.popular
            ? "bg-accent-500 text-white hover:bg-accent-600"
            : "bg-accent-600 text-white hover:bg-accent-700"
        }`}
      >
        {added ? (
          <>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            به سبد اضافه شد
          </>
        ) : (
          "افزودن به سبد سفارش"
        )}
      </button>
    </div>
  );
}
