"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Globe,
  Zap,
  Cpu,
  ShieldCheck,
  Smartphone,
  Search,
  Video,
  Headphones,
  Check,
  ArrowLeft,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Container from "@/components/Container";
import DashEyebrow from "@/components/DashEyebrow";
import PackageCard from "@/components/PackageCard";
import Button from "@/components/Button";
import { packages } from "@/lib/data/packages";

type TechFilter = "all" | "wordpress" | "custom_code" | "web_app";

const comparisonData = [
  {
    feature: "سرعت لود و امتیاز Core Web Vitals",
    wordpress: "بسیار خوب (۱.۵ تا ۲.۵ ثانیه با کش)",
    custom: "فوق‌العاده سریع (زیر ۱ ثانیه تضمینی)",
    winner: "custom",
  },
  {
    feature: "هزینه اولیه و اقتصادی بودن",
    wordpress: "بسیار مناسب و اقتصادی برای شروع",
    custom: "سرمایه‌گذاری متوسط تا پیشرفته",
    winner: "wordpress",
  },
  {
    feature: "سهولت مدیریت محتوا توسط کارفرما",
    wordpress: "بسیار آسان با پنل فارسی وردپرس",
    custom: "داشبورد اختصاصی و متناسب با نیاز",
    winner: "wordpress",
  },
  {
    feature: "امنیت و مقاومت در برابر هک",
    wordpress: "خوب (با پیکربندی افزونه‌های امنیتی)",
    custom: "حداکثری (فاقد آسیب‌پذیری‌های عمومی)",
    winner: "custom",
  },
  {
    feature: "پایداری در ترافیک‌های سنگین",
    wordpress: "مناسب برای ترافیک‌های معمول و فروشگاه‌های متوسط",
    custom: "فوق‌العاده بالا برای کمپین‌های میلیونی",
    winner: "custom",
  },
  {
    feature: "قابلیت توسعه و اتصال به سامانه‌های دیگر",
    wordpress: "از طریق افزونه‌ها و وب‌هوک‌های موجود",
    custom: "نامحدود با API اختصاصی و معماری ماژولار",
    winner: "custom",
  },
  {
    feature: "زمان تحویل و لانچ پروژه",
    wordpress: "۱ تا ۴ هفته",
    custom: "۲ تا ۸ هفته",
    winner: "wordpress",
  },
];

const includedFeatures = [
  {
    icon: Zap,
    title: "تست و گارانتی سرعت",
    desc: "بهینه‌سازی کامل کش، فشرده‌سازی تصاویر و پاس کردن تست‌های گوگل لایت‌هاوس.",
  },
  {
    icon: ShieldCheck,
    title: "امنیت و گواهی SSL",
    desc: "پیکربندی امنیتی فایروال، لایه‌های حفاظتی و نصب گواهینامه SSL معتبر.",
  },
  {
    icon: Smartphone,
    title: "ریسپانسیو بی‌نقص",
    desc: "نمایش کاملاً استاندارد و ارگونومیک در انواع موبایل، تبلت و نمایشگرهای دسکتاپ.",
  },
  {
    icon: Search,
    title: "سئوی تکنیکال اولیه",
    desc: "تنظیم تگ‌های متا، سایت‌مپ XML، فایل robots.txt و ثبت در سرچ کنسول گوگل.",
  },
  {
    icon: Video,
    title: "ویدیوهای آموزش پنل",
    desc: "ضبط ویدیوهای آموزشی اختصاصی برای کار با پنل مدیریت و درج محصولات یا مقالات.",
  },
  {
    icon: Headphones,
    title: "پشتیبانی فنی ۶ ماهه",
    desc: "رفع رایگان باگ‌ها و سوالات فنی شما در طول ۶ ماه پس از تحویل نهایی پروژه.",
  },
];

const steps = [
  {
    num: "۰۱",
    title: "نیازسنجی و عقد قرارداد",
    desc: "دریافت بریف دقیق، تعیین اسکوپ کاری، مشخص کردن زمان‌بندی و امضای قرارداد رسمی.",
  },
  {
    num: "۰۲",
    title: "طراحی UI/UX در فیگما",
    desc: "طراحی بصری صفحات در Figma و دریافت تاییدیه کارفرما قبل از شروع کدنویسی.",
  },
  {
    num: "۰۳",
    title: "پیاده‌سازی و توسعه فنی",
    desc: "توسعه فرانت‌اند و بک‌اند با وردپرس استاندارد یا کدنویسی تمیز Next.js.",
  },
  {
    num: "۰۴",
    title: "تست نهایی، آموزش و لانچ",
    desc: "تست عملکرد، بارگذاری روی سرور، آموزش کار با پنل و پشتیبانی زنده هنگام لانچ.",
  },
];

const faqs = [
  {
    q: "تفاوت اصلی وردپرس با کدنویسی اختصاصی چیست و کدام برای من بهتر است؟",
    a: "وردپرس یک سیستم مدیریت محتوای آماده است که برای وب‌سایت‌های شرکتی استاندارد، وبلاگ‌ها و فروشگاه‌های معمولی به دلیل هزینه کمتر و زمان تحویل سریع‌تر عالی است. کدنویسی اختصاصی (Next.js) برای پروژه‌هایی است که نیاز به سرعت لود زیر ۱ ثانیه، طراحی کاملاً سفارشی، امنیت حداکثری یا قابلیت‌های وب‌اپلیکیشن دارند.",
  },
  {
    q: "آیا بعد از تحویل پروژه، سورس‌کد و مالکیت کامل سایت به من تعلق می‌گیرد؟",
    a: "بله، ۱۰۰٪ مالکیت سایت، دسترسی هاست، دامین، دیتابیس و سورس‌کد پس از تسویه‌حساب نهایی در اختیار شما قرار می‌گیرد و هیچ وابستگی انحصاری وجود ندارد.",
  },
  {
    q: "فرآیند پرداخت و پیش‌پرداخت به چه صورت است؟",
    a: "معمولاً پرداخت‌ها در ۳ مرحله انجام می‌شود: ۴۰٪ پیش‌پرداخت هنگام عقد قرارداد، ۳۰٪ پس از تایید طرح اولیه و ۳۰٪ نهایی هنگام تست و لانچ روی دامنه اصلی.",
  },
  {
    q: "اگر هیچ آشنایی با مدیریت سایت نداشته باشم، چطور با پنل کار کنم؟",
    a: "برای تمام پکیج‌ها، ویدیوهای آموزشی اختصاصی با صدای فارسی ضبط شده و گام‌به‌گام نحوه درج مطلب، تغییر قیمت‌ها، مدیریت سفارش‌ها و بنرها را آموزش می‌دهیم.",
  },
];

export default function ServicesPage() {
  const [techFilter, setTechFilter] = useState<TechFilter>("all");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const filteredPackages = packages.filter((pkg) => {
    if (techFilter === "all") return true;
    if (techFilter === "wordpress") return pkg.techType === "wordpress";
    if (techFilter === "custom_code")
      return (
        pkg.techType === "custom_code" &&
        !pkg.slug.includes("dashboard") &&
        !pkg.slug.includes("automation")
      );
    if (techFilter === "web_app")
      return (
        pkg.slug.includes("dashboard") || pkg.slug.includes("automation")
      );
    return true;
  });

  const wpCount = packages.filter((p) => p.techType === "wordpress").length;
  const customCount = packages.filter(
    (p) =>
      p.techType === "custom_code" &&
      !p.slug.includes("dashboard") &&
      !p.slug.includes("automation")
  ).length;
  const appCount = packages.filter(
    (p) => p.slug.includes("dashboard") || p.slug.includes("automation")
  ).length;

  return (
    <div className="bg-ink-50/40 pt-12 pb-24 md:pt-16 md:pb-32">
      {/* 1. Services Hero */}
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <DashEyebrow>استودیوی دیجیتال ردوبز</DashEyebrow>
          <h1 className="mt-4 font-display text-3xl font-extrabold text-ink-950 sm:text-4xl md:text-5xl">
            تعرفه‌ها، پکیج‌ها و خدمات توسعه وب
          </h1>
          <p className="mt-4 text-base leading-loose text-ink-600 sm:text-lg">
            قیمت‌گذاری شفاف، زمان‌بندی قطعی و بدون هزینه‌های پنهان. تکنولوژی مناسب کسب‌وکارتان را انتخاب کنید یا با فیلترهای زیر پکیج‌ها را مقایسه نمایید.
          </p>

          {/* Value Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs font-bold text-ink-700">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 border border-ink-200/80 shadow-xs">
              <Check className="h-3.5 w-3.5 text-emerald-500" />
              <span>زمان‌بندی تحویل تضمینی</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 border border-ink-200/80 shadow-xs">
              <Check className="h-3.5 w-3.5 text-emerald-500" />
              <span>قرارداد رسمی و شفاف</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 border border-ink-200/80 shadow-xs">
              <Check className="h-3.5 w-3.5 text-emerald-500" />
              <span>پشتیبانی ۶ ماهه رایگان</span>
            </span>
          </div>

          {/* Interactive Filter Pills */}
          <div className="mt-10 inline-flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-white p-2 border border-ink-200/80 shadow-card max-w-full">
            <button
              type="button"
              onClick={() => setTechFilter("all")}
              className={`rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 ${
                techFilter === "all"
                  ? "bg-ink-950 text-white shadow-xs"
                  : "text-ink-600 hover:text-ink-950 hover:bg-ink-50"
              }`}
            >
              همه پکیج‌ها ({packages.length})
            </button>

            <button
              type="button"
              onClick={() => setTechFilter("wordpress")}
              className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 ${
                techFilter === "wordpress"
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "text-ink-600 hover:text-ink-950 hover:bg-ink-50"
              }`}
            >
              <Globe className="h-3.5 w-3.5" />
              <span>وردپرس و ووکامرس ({wpCount})</span>
            </button>

            <button
              type="button"
              onClick={() => setTechFilter("custom_code")}
              className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 ${
                techFilter === "custom_code"
                  ? "bg-accent-600 text-white shadow-xs"
                  : "text-ink-600 hover:text-ink-950 hover:bg-ink-50"
              }`}
            >
              <Zap className="h-3.5 w-3.5" />
              <span>کدنویسی اختصاصی Next.js ({customCount})</span>
            </button>

            <button
              type="button"
              onClick={() => setTechFilter("web_app")}
              className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 ${
                techFilter === "web_app"
                  ? "bg-purple-700 text-white shadow-xs"
                  : "text-ink-600 hover:text-ink-950 hover:bg-ink-50"
              }`}
            >
              <Cpu className="h-3.5 w-3.5" />
              <span>سامانه‌ها و اتوماسیون ({appCount})</span>
            </button>
          </div>
        </div>

        {/* 2. Packages Grid */}
        <motion.div
          key={techFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredPackages.map((pkg, index) => (
              <motion.div
                key={pkg.slug}
                layout
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.35,
                    delay: index * 0.05,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                  transition: { duration: 0.18 },
                }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="h-full"
              >
                <PackageCard pkg={pkg} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* 3. Included in All Packages Section */}
        <div className="mt-28">
          <div className="mx-auto max-w-2xl text-center">
            <DashEyebrow>استاندارد ردوبز</DashEyebrow>
            <h2 className="mt-3 font-display text-2xl font-bold text-ink-950 sm:text-3xl md:text-4xl">
              آنچه روی تمامی پکیج‌ها دریافت می‌کنید
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-600">
              بدون توجه به پکیج انتخابی، استانداردهای فنی زیر جزو تعهدات پایه ما به تمام کارفرمایان است.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {includedFeatures.map((item) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-3xl border border-ink-150 bg-white p-7 shadow-card transition-transform duration-200 hover:-translate-y-1"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-50 text-accent-600">
                    <IconComp className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-base font-bold text-ink-950">{item.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-ink-600">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Comparison Matrix: WordPress vs Custom Code */}
        <div className="mt-28 rounded-3xl border border-ink-150 bg-white p-8 shadow-card sm:p-12" id="compare">
          <div className="max-w-2xl">
            <DashEyebrow>جدول مقایسه تخصصی</DashEyebrow>
            <h2 className="mt-3 font-display text-2xl font-bold text-ink-950 sm:text-3xl">
              کدام مسیر برای بیزینس شما ایده‌آل است؟
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">
              تفاوت‌های بنیادین میان طراحی بر پایه وردپرس و توسعه اختصاصی با Next.js در یک نگاه:
            </p>
          </div>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-right text-sm">
              <thead>
                <tr className="border-b border-ink-200 bg-ink-50 text-xs font-bold text-ink-900">
                  <th className="py-4 px-4 rounded-r-xl">معیار مقایسه</th>
                  <th className="py-4 px-4 text-emerald-800">
                    <span className="inline-flex items-center gap-1.5">
                      <Globe className="h-4 w-4 text-emerald-600" />
                      <span>طراحی با وردپرس (WordPress)</span>
                    </span>
                  </th>
                  <th className="py-4 px-4 text-accent-700 rounded-l-xl">
                    <span className="inline-flex items-center gap-1.5">
                      <Zap className="h-4 w-4 text-accent-600" />
                      <span>کدنویسی اختصاصی (Next.js)</span>
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {comparisonData.map((row) => (
                  <tr key={row.feature} className="hover:bg-ink-50/50 transition-colors">
                    <td className="py-4 px-4 font-bold text-ink-900">{row.feature}</td>
                    <td className="py-4 px-4 text-ink-700">
                      <span className="flex items-center gap-1.5">
                        {row.winner === "wordpress" && (
                          <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800">
                            مزیت
                          </span>
                        )}
                        {row.wordpress}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-ink-900 font-semibold">
                      <span className="flex items-center gap-1.5">
                        {row.winner === "custom" && (
                          <span className="rounded-full bg-accent-100 px-1.5 py-0.5 text-[10px] font-bold text-accent-800">
                            مزیت
                          </span>
                        )}
                        {row.custom}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 rounded-2xl bg-ink-50 p-6 border border-ink-100 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-bold text-ink-950 text-sm">نیاز به راهنمایی در انتخاب پکیج دارید؟</p>
              <p className="text-xs text-ink-500 mt-1">مشاوران فنی ما به صورت رایگان بر اساس بودجه و نیازهایتان بهترین انتخاب را پیشنهاد می‌دهند.</p>
            </div>
            <Button href="/contact" className="!text-xs !py-2.5">
              دریافت مشاوره رایگان ↗
            </Button>
          </div>
        </div>

        {/* 5. 4-Step Working Methodology */}
        <div className="mt-28">
          <div className="mx-auto max-w-2xl text-center">
            <DashEyebrow>متدولوژی کاری</DashEyebrow>
            <h2 className="mt-3 font-display text-2xl font-bold text-ink-950 sm:text-3xl md:text-4xl">
              فرآیند ۴ مرحله‌ای اجرای پروژه در ردوبز
            </h2>
            <p className="mt-3 text-sm text-ink-600">
              از اولین تماس تا تحویل و لانچ نهایی، همه چیز شفاف و مرحله‌به‌مرحله پیش می‌رود.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.num}
                className="relative flex flex-col justify-between rounded-3xl border border-ink-150 bg-white p-7 shadow-card"
              >
                <div>
                  <span className="font-display text-3xl font-black text-accent-500">
                    {step.num}
                  </span>
                  <h3 className="mt-4 text-base font-bold text-ink-950">{step.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-ink-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6. FAQ Accordion */}
        <div className="mt-28 rounded-3xl border border-ink-150 bg-white p-8 shadow-card sm:p-12">
          <div className="max-w-2xl">
            <DashEyebrow>سوالات متداول</DashEyebrow>
            <h2 className="mt-3 font-display text-2xl font-bold text-ink-950 sm:text-3xl">
              پرسش‌های رایج کارفرمایان درباره خدمات و تعرفه‌ها
            </h2>
          </div>

          <div className="mt-8 space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="overflow-hidden rounded-2xl border border-ink-150 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between bg-ink-50/50 p-5 text-right text-sm font-bold text-ink-950 hover:bg-ink-50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="text-base text-accent-600 font-bold ml-2">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="bg-white p-5 text-xs leading-loose text-ink-600 border-t border-ink-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 7. Bottom High-Contrast CTA */}
        <div className="mt-24 rounded-3xl bg-ink-950 p-8 sm:p-12 text-center text-white shadow-sign relative overflow-hidden">
          <div className="pointer-events-none absolute -left-10 -top-10 h-64 w-64 rounded-full bg-accent-600/20 blur-[80px]" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-display text-2xl font-bold sm:text-3xl md:text-4xl text-white">
              هنوز سوالی دارید یا پروژه سفارشی مد نظرتان است؟
            </h2>
            <p className="mt-4 text-sm text-ink-300 leading-relaxed">
              تیم فنی ردوبز آماده است تا نیازمندی‌های اختصاصی کسب‌وکار شما را بررسی کرده و پروپوزال متناسب ارائه دهد.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button href="/contact" className="!px-8 !py-3.5 shadow-glow">
                شروع مشاوره رایگان ↗
              </Button>
              <Button
                href="/portfolio"
                variant="outline"
                className="!border-white/20 !bg-white/5 !text-white hover:!bg-white/10 !px-8 !py-3.5"
              >
                مشاهده نمونه‌کارهای اجراشده
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
