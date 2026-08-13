"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ShoppingBag, ArrowLeft, ShieldCheck, Clock, Headphones } from "lucide-react";
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
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-ink-500">تعرفه پایه پکیج</span>
        <span className="rounded-full bg-accent-50 px-2.5 py-0.5 text-[11px] font-bold text-accent-700">
          مسیر {pkg.track}
        </span>
      </div>

      <div className="mt-3">
        <p className="font-display text-2xl sm:text-3xl font-black text-accent-600">
          {pkg.priceLabel}
        </p>
        <div className="mt-2 flex items-center gap-1.5 text-xs text-ink-600 font-medium">
          <Clock className="h-3.5 w-3.5 text-ink-400" />
          <span>مدت زمان تحویل: <strong>{pkg.deliveryTime}</strong></span>
        </div>
      </div>

      {added ? (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 text-center">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white mb-2">
            <Check className="h-5 w-5 stroke-[2.5]" />
          </div>
          <p className="text-sm font-bold text-emerald-950">پکیج با موفقیت به سبد سفارش اضافه شد</p>
          <p className="mt-1 text-xs text-emerald-700">می‌توانید هم‌اکنون سفارش خود را نهایی یا تکمیل کنید.</p>
          
          <div className="mt-4 flex flex-col gap-2">
            <Link
              href="/cart"
              className="inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-4 text-xs font-bold text-white hover:bg-emerald-700 shadow-xs transition-colors"
            >
              <span>تکمیل و مشاهده سبد سفارش</span>
              <ArrowLeft className="h-3.5 w-3.5" />
            </Link>
            <button
              type="button"
              onClick={() => setAdded(false)}
              className="inline-flex min-h-[38px] items-center justify-center rounded-xl border border-emerald-300 bg-white px-4 text-xs font-semibold text-emerald-900 hover:bg-emerald-100/50 transition-colors"
            >
              افزودن مورد دیگر
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between rounded-xl border border-ink-150 bg-ink-50/50 p-2.5">
            <span className="text-xs font-bold text-ink-800">تعداد پکیج</span>
            <div className="flex items-center rounded-lg border border-ink-200 bg-white shadow-xs">
              <button
                type="button"
                aria-label="کاهش تعداد"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-8 w-8 items-center justify-center text-sm font-bold text-ink-700 hover:bg-ink-100 rounded-r-lg transition-colors"
              >
                −
              </button>
              <span className="w-8 text-center text-xs font-bold text-ink-950">{quantity}</span>
              <button
                type="button"
                aria-label="افزایش تعداد"
                onClick={() => setQuantity((q) => q + 1)}
                className="flex h-8 w-8 items-center justify-center text-sm font-bold text-ink-700 hover:bg-ink-100 rounded-l-lg transition-colors"
              >
                +
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-accent-600 px-6 py-3 text-xs sm:text-sm font-bold text-white transition-all duration-200 hover:bg-accent-700 active:scale-[0.98] shadow-sm hover:shadow-glow"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>افزودن به سبد سفارش و شروع</span>
          </button>

          {/* Micro trust checklist */}
          <div className="pt-3 border-t border-ink-100 space-y-2 text-[11px] text-ink-600 font-medium">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span>قرارداد رسمی و ضمانت بازگشت وجه در صورت عدم تطابق</span>
            </div>
            <div className="flex items-center gap-2">
              <Headphones className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span>پشتیبانی مستقیم تیم فنی و طراح اختصاصی</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

