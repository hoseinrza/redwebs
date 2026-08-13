import Link from "next/link";
import { Check } from "lucide-react";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";

export default function CtaBanner() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <Reveal className="relative overflow-hidden rounded-[32px] bg-ink-950 px-6 py-16 text-center text-white shadow-sign sm:px-12 md:py-20">
          {/* Subtle Ambient Red Glow */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-accent-600/20 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-accent-500/15 blur-[100px]" />

          {/* Grid pattern overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />

          <div className="relative z-10 mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-1 text-xs font-bold text-accent-300 backdrop-blur-md">
              آماده شروع هستید؟
            </span>

            <h2 className="mt-6 font-display text-3xl font-extrabold leading-snug sm:text-4xl md:text-5xl text-white">
              ایده‌تان را به یک وب‌سایت پرسرعت و سودآور تبدیل کنید
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-ink-300 sm:text-base">
              فرم استعلام قیمت را پر کنید یا مستقیماً با ما تماس بگیرید. در کمتر از ۲۴ ساعت، پروپوزال و زمان‌بندی دقیق دریافت خواهید کرد.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button href="/contact" className="!px-8 !py-4 text-base shadow-glow">
                درخواست مشاوره رایگان ↗
              </Button>
              <Button
                href="/services"
                variant="outline"
                className="!border-white/20 !bg-white/5 !text-white hover:!bg-white/10 !px-8 !py-4 text-base"
              >
                مشاهده لیست قیمت‌ها
              </Button>
            </div>

            {/* Reassurance points */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 border-t border-white/10 pt-8 text-xs text-ink-400">
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span>مشاوره اولیه کاملاً رایگان</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span>قرارداد رسمی و شفاف</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span>پشتیبانی فنی مستمر</span>
              </span>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

