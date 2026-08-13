"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "@/components/Container";
import CartIcon from "@/components/CartIcon";

const navLinks = [
  { href: "/services", label: "خدمات" },
  { href: "/portfolio", label: "نمونه‌کارها" },
  { href: "/blog", label: "وبلاگ" },
  { href: "/about", label: "درباره ما" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (pathname.startsWith("/panel")) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-ink-150 bg-[#fdfcfb]/90 backdrop-blur">
      <Container className="flex h-[76px] items-center justify-between">
        <Link href="/" className="text-lg font-extrabold text-ink-950">
          <span className="text-accent-600">رد</span>وبز
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13.5px] font-medium transition-colors ${
                  active ? "text-ink-950" : "text-ink-700 hover:text-ink-950"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3.5">
          <Link
            href="/login"
            className="hidden text-[13px] font-semibold text-ink-950 transition-colors hover:text-accent-600 sm:inline-flex"
          >
            ورود به پنل مشتری
          </Link>
          <Link
            href="/contact"
            className="hidden items-center gap-1.5 rounded-[10px] bg-ink-950 px-5 py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-ink-800 sm:inline-flex"
          >
            تماس با ما
          </Link>

          <CartIcon />

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "بستن منو" : "باز کردن منو"}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-ink-700 transition-colors hover:bg-ink-100 md:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      <div
        className={`grid overflow-hidden border-t border-ink-150 bg-[#fdfcfb] transition-[grid-template-rows] duration-300 ease-out md:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr] border-t-0"
        }`}
      >
        <div className="overflow-hidden">
          <Container className="flex flex-col gap-1 py-4">
            {navLinks.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    active ? "bg-accent-50 text-accent-600" : "text-ink-700 hover:bg-ink-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/login"
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-ink-50"
            >
              ورود به پنل مشتری
            </Link>
            <Link
              href="/contact"
              className="mt-2 inline-flex min-h-[44px] w-full items-center justify-center rounded-xl bg-ink-950 px-6 text-sm font-bold text-white"
            >
              تماس با ما
            </Link>
          </Container>
        </div>
      </div>
    </header>
  );
}
