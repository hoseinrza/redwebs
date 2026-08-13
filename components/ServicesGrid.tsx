import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Container from "@/components/Container";
import DashEyebrow from "@/components/DashEyebrow";
import Reveal from "@/components/Reveal";

const services = [
  {
    n: "۰۱",
    title: "طراحی رابط و تجربه کاربری (UI/UX)",
    description:
      "طراحی هویت بصری منحصر‌به‌فرد، دیزاین سیستم‌های یکپارچه و پروتوتایپ‌های تعاملی در فیگما با تمرکز بر سهولت استفاده و تبدیل بازدیدکننده به مشتری.",
    tag: "Figma & UI Systems",
    features: ["تحلیل رفتار کاربر", "دیزاین اختصاصی موبایل و دسکتاپ", "تست تعاملی"],
    tone: "border-accent-200/60 bg-white",
  },
  {
    n: "۰۲",
    title: "طراحی سایت با وردپرس و ووکامرس",
    description:
      "پیاده‌سازی سریع، استاندارد و اقتصادی با پنل مدیریت فارسی و آسان برای کارفرمایان، بهینه‌سازی سرعت و اتصال به درگاه‌های بانکی.",
    tag: "WordPress & WooCommerce",
    features: ["پنل مدیریت محتوای ساده", "سئو RankMath", "آموزش کار با پنل"],
    tone: "border-emerald-200/80 bg-white",
  },
  {
    n: "۰۳",
    title: "توسعه وب‌سایت با کدنویسی اختصاصی",
    description:
      "پیاده‌سازی پرسرعت با فریم‌ورک‌های مدرن بدون کدهای زائد. لودینگ زیر ۱ ثانیه، امنیت حداکثری و ساختار کامپوننت‌محور مقیاس‌پذیر.",
    tag: "Next.js & TypeScript",
    features: ["لودینگ زیر ۱ ثانیه", "امتیاز ۱۰۰ لایت‌هاوس", "امنیت نفوذناپذیر"],
    tone: "border-accent-200/80 bg-white",
  },
  {
    n: "۰۴",
    title: "سامانه‌ها و وب‌اپلیکیشن‌های اختصاصی",
    description:
      "ساخت سامانه‌های سازمانی، داشبوردهای مدیریتی، سیستم‌های رزرو آنلاین و وب‌اپلیکیشن‌های متصل به دیتابیس با قابلیت شخصی‌سازی کامل.",
    tag: "Custom Web Apps & API",
    features: ["احراز هویت و سطوح دسترسی", "داشبورد تحلیلی زنده", "اتصال به CRM و وب‌سرویس"],
    tone: "border-accent-300/80 bg-ink-950 text-white",
  },
];

export default function ServicesGrid() {
  return (
    <section className="py-20 md:py-28 bg-ink-50/50 border-y border-ink-150">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <DashEyebrow>حوزه‌های تخصص ما</DashEyebrow>
            <h2 className="mt-3 font-display text-2xl font-bold text-ink-950 sm:text-3xl md:text-4xl">
              هر آنچه برای ساخت و رشد حضور آنلاین نیاز دارید
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-600 sm:text-base">
              از لندینگ‌پیج‌های سریع تا سیستم‌های وب پیچیده؛ ما همه را با نهایت دقت فنی و استانداردهای روز پیاده می‌کنیم.
            </p>
          </div>

          <Link
            href="/services"
            className="group inline-flex items-center gap-2 border-b-2 border-ink-950 pb-1 text-sm font-bold text-ink-950"
          >
            <span>مشاهده تمام خدمات و تعرفه‌ها</span>
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const isDark = service.tone.includes("bg-ink-950");
            return (
              <Reveal
                key={service.n}
                delay={i * 80}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-5 sm:p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover ${service.tone}`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xl font-black text-accent-500">
                      {service.n}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        isDark
                          ? "bg-white/10 text-accent-300"
                          : "bg-ink-50 text-ink-600"
                      }`}
                    >
                      {service.tag}
                    </span>
                  </div>

                  <h3
                    className={`mt-4 text-base font-bold ${
                      isDark ? "text-white" : "text-ink-950"
                    }`}
                  >
                    {service.title}
                  </h3>

                  <p
                    className={`mt-2 text-xs leading-relaxed ${
                      isDark ? "text-ink-300" : "text-ink-600"
                    }`}
                  >
                    {service.description}
                  </p>
                </div>

                <div
                  className={`mt-5 border-t pt-3.5 ${
                    isDark ? "border-white/10" : "border-ink-100"
                  }`}
                >
                  <ul className="space-y-1.5">
                    {service.features.map((feat) => (
                      <li
                        key={feat}
                        className={`flex items-center gap-2 text-xs ${
                          isDark ? "text-ink-200" : "text-ink-700"
                        }`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

