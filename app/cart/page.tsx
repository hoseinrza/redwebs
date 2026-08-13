"use client";

import Section from "@/components/Section";
import Button from "@/components/Button";
import { useCart } from "@/lib/cart-context";
import { formatPrice, toPersianDigits } from "@/lib/format";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <Section className="pt-16 md:pt-20">
        <div className="mx-auto max-w-md text-center">
          <h1 className="text-2xl font-bold text-ink-900">سبد سفارش شما خالیه</h1>
          <p className="mt-3 text-ink-600">
            یکی از پکیج‌های خدمات ما رو انتخاب کنید تا سفارشتون رو شروع کنید.
          </p>
          <Button href="/services" className="mt-8">
            مشاهده‌ی خدمات
          </Button>
        </div>
      </Section>
    );
  }

  return (
    <Section className="pt-16 md:pt-20">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-bold text-ink-900">سبد سفارش</h1>

        <div className="mt-8 divide-y divide-ink-100 rounded-2xl border border-ink-100 bg-white shadow-card">
          {items.map((item) => (
            <div key={item.slug} className="flex flex-wrap items-center justify-between gap-4 p-6">
              <div>
                <h3 className="font-semibold text-ink-900">{item.name}</h3>
                <p className="mt-1 text-sm text-ink-500">{toPersianDigits(item.priceLabel)}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center rounded-xl border border-ink-200">
                  <button
                    type="button"
                    aria-label="کاهش تعداد"
                    onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                    className="flex h-9 w-9 items-center justify-center text-ink-700 hover:bg-ink-50"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-sm font-medium text-ink-900">
                    {toPersianDigits(item.quantity)}
                  </span>
                  <button
                    type="button"
                    aria-label="افزایش تعداد"
                    onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                    className="flex h-9 w-9 items-center justify-center text-ink-700 hover:bg-ink-50"
                  >
                    +
                  </button>
                </div>

                <p className="w-32 text-end text-sm font-semibold text-ink-900">
                  {formatPrice(item.price * item.quantity)}
                </p>

                <button
                  type="button"
                  aria-label="حذف از سبد"
                  onClick={() => removeItem(item.slug)}
                  className="text-ink-400 hover:text-accent-600"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between rounded-2xl bg-ink-50 px-6 py-5">
          <p className="font-semibold text-ink-900">جمع کل (تخمینی)</p>
          <p className="text-lg font-bold text-ink-900">{formatPrice(totalPrice)}</p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row-reverse">
          <Button href="/checkout" className="flex-1 sm:flex-none">
            ادامه به ثبت سفارش
          </Button>
          <Button href="/services" variant="outline" className="flex-1 sm:flex-none">
            ادامه‌ی انتخاب پکیج
          </Button>
        </div>
      </div>
    </Section>
  );
}
