import Container from "@/components/Container";
import Button from "@/components/Button";
import HeroVisual from "@/components/HeroVisual";

const ticker = [
  "STRATEGY",
  "DESIGN",
  "DEVELOPMENT",
  "UI/UX",
  "MOTION",
  "SEO",
  "E-COMMERCE",
  "WEB APP",
];

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-ink-50">
      <div
        className="pointer-events-none absolute inset-0 opacity-55 [mask-image:radial-gradient(circle_at_60%_30%,#000_0%,transparent_75%)] bg-[linear-gradient(#ececee_1px,transparent_1px),linear-gradient(90deg,#ececee_1px,transparent_1px)] bg-[length:72px_72px]"
      />

      <Container className="relative pt-14 md:pt-16">
        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-50 px-4 py-1.5 text-xs font-bold text-accent-600">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
              استودیوی دیجیتال ایرانی
            </span>

            <h1 className="mt-6 font-display text-4xl leading-[1.5] text-ink-900 md:text-5xl md:leading-[1.45] lg:text-[64px]">
              ما بهترین و کامل‌ترین
              <br />
              تیم وب ایرانیم.
            </h1>

            <p className="mt-6 max-w-md text-base leading-loose text-ink-600 md:text-lg">
              از ایده تا اجرا، هر چیزی که برای ساختن یک حضور دیجیتال قدرتمند
              لازم داری، اینجاست.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-6">
              <Button href="/services" className="!px-8 !py-4 text-base shadow-glow">
                پروژه‌ات رو شروع کن ↗
              </Button>
              <a
                href="#work"
                className="inline-flex items-center gap-2 border-b-2 border-ink-900 py-1 text-base font-semibold text-ink-900"
              >
                کارهای ما رو ببین ↓
              </a>
            </div>
          </div>

          <HeroVisual />
        </div>
      </Container>

      <div className="relative mt-6 overflow-hidden border-t border-ink-200 bg-ink-50 py-5">
        <div className="animate-marquee flex w-max gap-9 whitespace-nowrap motion-reduce:animate-none">
          {[0, 1].map((i) => (
            <span key={i} className="flex gap-9 text-[13px] font-bold tracking-wide text-ink-700">
              {ticker.map((word) => (
                <span key={word} className="flex items-center gap-9">
                  {word}
                  <span className="text-accent-500">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
