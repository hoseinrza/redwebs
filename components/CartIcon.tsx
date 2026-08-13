"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { toPersianDigits } from "@/lib/format";

export default function CartIcon() {
  const { totalItems } = useCart();

  return (
    <Link
      href="/cart"
      aria-label="سبد سفارش"
      className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-ink-600 transition-colors hover:bg-ink-100 hover:text-ink-950"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.994-4.694 2.602-7.152.084-.34-.17-.66-.52-.66H5.106M7.5 14.25L5.106 5.121M6 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
        />
      </svg>
      {totalItems > 0 && (
        <span className="absolute -top-1 -end-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-accent-600 px-1 text-[10px] font-bold leading-none text-white">
          {toPersianDigits(totalItems)}
        </span>
      )}
    </Link>
  );
}
