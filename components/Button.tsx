import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent-600 text-white shadow-card hover:bg-accent-700 hover:shadow-card-hover",
  secondary:
    "bg-ink-950 text-white hover:bg-ink-800",
  outline:
    "border border-ink-200 text-ink-900 hover:border-ink-400 hover:bg-ink-50",
  ghost:
    "text-ink-700 hover:bg-ink-100 hover:text-ink-950",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200 will-change-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
