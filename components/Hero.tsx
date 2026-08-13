import Link from "next/link";
import Container from "@/components/Container";
import Button from "@/components/Button";
import HeroVisual from "@/components/HeroVisual";

const ticker = [
  "NEXT.JS 14",
  "WORDPRESS & WOOCOMMERCE",
  "UI/UX DESIGN",
  "CUSTOM CODING",
  "CORE WEB VITALS",
  "REACT & TYPESCRIPT",
  "ELEMENTOR & CUSTOM THEMES",
  "SEO ARCHITECTURE",
];

const highlights = [
  { value: "۱۲۰+", label: "پروژه موفق" },
  { value: "۹۸٪", label: "رضایت مشتری" },
  { value: "زیر ۲ ثانیه", label: "سرعت لودینگ" },
];

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-ink-50 border-b border-ink-150">
      {/* Subtle geometric background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-45 [mask-image:radial-gradient(circle_at_50%_35%,#000_0%,transparent_75%)] bg-[linear-gradient(#e4e4e7_1px,transparent_1px),linear-gradient(90deg,#e4e4e7_1px,transparent_1px)] bg-[length:64px_64px]"
      />

      <Container className="relative pt-12 pb-16 md:pt-18 md:pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
          <div className="max-w-2xl">
            {/* Live Availability Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-accent-200/80 bg-accent-50/80 px-4 py-1.5 text-xs font-bold text-accent-700 backdrop-blur-sm shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-600" />
              </span>
              پذیرش سفارشات جدید برای پروژه‌های وب
            </div>

            {/* Main Headline */}
            <h1 className="mt-6 font-display text-3xl font-extrabold leading-[1.35] text-ink-950 sm:text-4xl md:text-5xl lg:text-[58px]">
              طراحی و توسعه سایتهایی که برای شما{" "}
              <span className="relative inline-block text-accent-600">
                مشتری می‌آورند.
                <span className="absolute -bottom-1 left-0 right-0 h-1.5 rounded-full bg-accent-200/70" />
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-loose text-ink-600 sm:text-lg">
              ما وب‌سایت‌های مدرن، پرسرعت و بهینه‌سازی‌شده برای نرخ تبدیل می‌سازیم.
              قیمت‌گذاری شفاف، زمان‌بندی دقیق و بدون استفاده از قالب‌های کند و آماده.
            </p>

            {/* Dual CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/services" className="!px-7 !py-3.5 text-sm sm:text-base shadow-glow">
                مشاهده پکیج‌ها و تعرفه‌ها ↗
              </Button>
              <Button href="/contact" variant="outline" className="!px-7 !py-3.5 text-sm sm:text-base">
                مشاوره رایگان پروژه
              </Button>
            </div>

            {/* Trust Highlights */}
            <div className="mt-12 grid grid-cols-3 gap-4 border-t border-ink-200/70 pt-6">
              {highlights.map((item) => (
                <div key={item.label}>
                  <p className="font-display text-xl font-black text-ink-950 sm:text-2xl text-accent-600">
                    {item.value}
                  </p>
                  <p className="mt-1 text-xs font-medium text-ink-500">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Visual Hero */}
          <div className="relative">
            <HeroVisual />
          </div>
        </div>
      </Container>

      {/* Infinite Ticker */}
      <div className="relative overflow-hidden border-t border-ink-200 bg-white/70 py-4 backdrop-blur-sm">
        <div className="animate-marquee flex w-max gap-8 whitespace-nowrap motion-reduce:animate-none">
          {[0, 1].map((i) => (
            <span key={i} className="flex gap-8 text-xs font-extrabold tracking-wider text-ink-700">
              {ticker.map((word) => (
                <span key={word} className="flex items-center gap-8">
                  {word}
                  <span className="text-accent-500 font-normal">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

