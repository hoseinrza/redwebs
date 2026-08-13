"use client";

import { useState } from "react";
import Link from "next/link";
import { Package } from "@/lib/types";
import { useCart } from "@/lib/cart-context";

export default function AddToCartPanel({ pkg }: { pkg: Package }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    for (let i = 0; i < quantity; i += 1) addItem(pkg);
    setAdded(true);
    setQuantity(1);
  }

  return (
    <div className="rounded-2xl border border-ink-150 bg-white p-6 shadow-card">
      <p className="text-xs font-semibold tracking-wide text-accent-600">{pkg.track}</p>
      <p className="mt-2 text-2xl font-bold text-ink-950">{pkg.priceLabel}</p>
      <p className="mt-1 text-sm text-ink-500">زمان تحویل: {pkg.deliveryTime}</p>

      {added ? (
        <div className="mt-6 rounded-xl border border-accent-100 bg-accent-50 p-4 text-center">
          <p className="text-sm font-semibold text-ink-950">به سبد سفارش اضافه شد</p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row-reverse">
            <Link
              href="/cart"
              className="inline-flex min-h-[40px] flex-1 items-center justify-center rounded-lg bg-accent-600 px-4 text-sm font-semibold text-white hover:bg-accent-700"
            >
              مشاهده‌ی سبد سفارش
            </Link>
            <button
              type="button"
              onClick={() => setAdded(false)}
              className="inline-flex min-h-[40px] flex-1 items-center justify-center rounded-lg border border-ink-200 px-4 text-sm font-semibold text-ink-900 hover:border-ink-400 hover:bg-ink-50"
            >
              افزودن مورد دیگر
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-ink-800">تعداد</span>
            <div className="flex items-center rounded-xl border border-ink-200">
              <button
                type="button"
                aria-label="کاهش تعداد"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-10 w-10 items-center justify-center text-ink-700 hover:bg-ink-50"
              >
                −
              </button>
              <span className="w-10 text-center text-sm font-medium text-ink-900">{quantity}</span>
              <button
                type="button"
                aria-label="افزایش تعداد"
                onClick={() => setQuantity((q) => q + 1)}
                className="flex h-10 w-10 items-center justify-center text-ink-700 hover:bg-ink-50"
              >
                +
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-accent-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-accent-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2"
          >
            افزودن به سبد سفارش
          </button>

          <p className="text-center text-xs text-ink-400">
            بعد از افزودن، از سبد سفارش می‌تونید مستقیم به ثبت نهایی برید.
          </p>
        </div>
      )}
    </div>
  );
}
