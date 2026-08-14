"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/panel") || pathname.startsWith("/admin")) return null;

  return (
    <footer className="border-t border-ink-150 px-5 pb-10 pt-14 sm:px-8 lg:px-14">
      <div className="mx-auto grid max-w-[1300px] grid-cols-2 gap-10 sm:grid-cols-4">
        <div className="col-span-2 sm:col-span-1">
          <Link href="/" className="text-lg font-extrabold text-ink-950">
            <span className="text-accent-600">رد</span>وبز
          </Link>
          <p className="mt-4 max-w-[280px] text-[13px] leading-loose text-ink-500">
            استودیوی دیجیتال ایرانی؛ طراحی و توسعه وب‌سایت، فروشگاه اینترنتی و
            سیستم‌های اختصاصی.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-xs font-bold text-ink-950">خدمات</p>
          <Link href="/services" className="text-[13px] text-ink-500 transition-colors hover:text-ink-950">
            وب‌سایت شرکتی
          </Link>
          <Link href="/services" className="text-[13px] text-ink-500 transition-colors hover:text-ink-950">
            فروشگاه اینترنتی
          </Link>
          <Link href="/services" className="text-[13px] text-ink-500 transition-colors hover:text-ink-950">
            لندینگ‌پیج
          </Link>
          <Link href="/services" className="text-[13px] text-ink-500 transition-colors hover:text-ink-950">
            پنل و سیستم اختصاصی
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-xs font-bold text-ink-950">شرکت</p>
          <Link href="/about" className="text-[13px] text-ink-500 transition-colors hover:text-ink-950">
            درباره ما
          </Link>
          <Link href="/portfolio" className="text-[13px] text-ink-500 transition-colors hover:text-ink-950">
            نمونه‌کارها
          </Link>
          <Link href="/blog" className="text-[13px] text-ink-500 transition-colors hover:text-ink-950">
            وبلاگ
          </Link>
          <Link href="/contact" className="text-[13px] text-ink-500 transition-colors hover:text-ink-950">
            تماس با ما
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-xs font-bold text-ink-950">ارتباط</p>
          <a
            href="mailto:hello@redwebs.ir"
            dir="ltr"
            className="text-right text-[13px] text-ink-500 transition-colors hover:text-ink-950"
          >
            hello@redwebs.ir
          </a>
          <span className="text-[13px] text-ink-500">تهران، ایران</span>
          <span className="text-[13px] text-ink-500">اینستاگرام</span>
          <span className="text-[13px] text-ink-500">لینکدین</span>
        </div>
      </div>

      <div className="mx-auto mt-9 flex max-w-[1300px] flex-col items-center justify-between gap-2 border-t border-ink-150 pt-6 sm:flex-row">
        <p className="text-xs text-ink-400">© ۱۴۰۴ ردوبز، همه حقوق محفوظ است</p>
        <p className="text-xs text-ink-400">حریم خصوصی · قوانین استفاده</p>
      </div>
    </footer>
  );
}
