import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import Container from "@/components/Container";
import Button from "@/components/Button";
import Eyebrow from "@/components/Eyebrow";
import DashEyebrow from "@/components/DashEyebrow";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "درباره ما",
  description: "داستان ردوبز، تیم ما، ارزش‌ها و استانداردهای طراحی و توسعه سایتی که واقعاً برای کسب‌وکارها مشتری می‌آورد.",
};

const stats = [
  { value: "۱۲۰+", label: "پروژه موفق تحویل‌شده", hint: "کسب‌وکارهای محلی و تخصصی" },
  { value: "۹۸٪", label: "رضایت کارفرمایان", hint: "بر اساس نظرسنجی پس از لانچ" },
  { value: "۷ سال", label: "سابقه تخصصی", hint: "در اکوسیستم وب و محصول دیجیتال" },
  { value: "۱۰۰٪", label: "کدنویسی استاندارد", hint: "بدون قالب آماده یا کدهای زائد" },
];

const team = [
  {
    name: "امیرحسین رضازاده",
    role: "بنیان‌گذار",
    bio: "معماری وب، توسعه زیرساخت و تضمین کارایی بالا، سرعت و پایداری فنی محصولات دیجیتال.",
    skills: ["توسعه وب", "معماری محصول", "کارایی بالا"],
    initial: "ا",
    badgeTone: "bg-accent-50 text-accent-700 border-accent-200/80",
    avatarBg: "bg-gradient-to-br from-brand-600 to-ink-950 text-white",
  },
  {
    name: "سعید شیردل",
    role: "مدیر عامل",
    bio: "رهبری استراتژیک، مدیریت ارتباط با مشتریان و توسعه ارزش‌های تجاری در پروژه‌های دیجیتال.",
    skills: ["استراتژی کسب‌وکار", "مدیریت ارشد", "مذاکره و رشد"],
    initial: "س",
    badgeTone: "bg-brass-50 text-brass-700 border-brass-200/80",
    avatarBg: "bg-gradient-to-br from-brass-600 to-ink-900 text-white",
  },
  {
    name: "درسا زاغیان",
    role: "طراح رابط کاربری",
    bio: "طراحی رابط‌های کاربری چشم‌نواز، بهینه‌سازی تجربه کاربری (UI/UX) و خلق دیزاین سیستم‌های منسجم.",
    skills: ["طراحی UI/UX", "دیزاین سیستم", "طراحی تعاملی"],
    initial: "د",
    badgeTone: "bg-rose-50 text-rose-700 border-rose-200/80",
    avatarBg: "bg-gradient-to-br from-brand-500 to-brand-800 text-white",
  },
  {
    name: "طوبی الله‌یاری",
    role: "استراتژیست و سئو",
    bio: "تدوین استراتژی محتوا، بهینه‌سازی ساختار برای موتورهای جستجو و رشد ترافیک ارگانیک کسب‌وکارها.",
    skills: ["سئو تکنیکال", "استراتژی محتوا", "تحلیل داده"],
    initial: "ط",
    badgeTone: "bg-ink-100 text-ink-800 border-ink-200",
    avatarBg: "bg-gradient-to-br from-ink-700 to-ink-950 text-white",
  },
];

const values = [
  {
    number: "۰۱",
    title: "شفافیت مطلق در قیمت و زمان",
    description:
      "هیچ هزینه پنهانی یا غافلگیری در کار نیست. از روز اول زمان‌بندی واقع‌بینانه و قرارداد شفاف ارائه می‌دهیم.",
    icon: (
      <svg className="h-6 w-6 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    number: "۰۲",
    title: "تمرکز روی بازگشت سرمایه و تبدیل",
    description:
      "یک وب‌سایت زیبا اگر مشتری نیاورد ارزشی ندارد. تمام تصمیمات طراحی ما با رویکرد جذب لید و نرخ تبدیل شکل می‌گیرد.",
    icon: (
      <svg className="h-6 w-6 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    number: "۰۳",
    title: "دسترسی مستقیم و بدون واسطه",
    description:
      "با کارشناسان پشتیبانی و واسطه‌های اداری طرف نیستید؛ مستقیماً با خود طراحان و توسعه‌دهندگان پروژه گفتگو می‌کنید.",
    icon: (
      <svg className="h-6 w-6 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    number: "۰۴",
    title: "وسواس در کیفیت فنی و پرفورمنس",
    description:
      "کدهای تمیز، لودینگ زیر ۲ ثانیه، سئو فنی دقیق و سازگاری کامل با انواع نمایشگرها؛ بدون هیچ‌گونه مصالحه در کیفیت.",
    icon: (
      <svg className="h-6 w-6 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

const processSteps = [
  {
    step: "۰۱",
    title: "کشف و تحلیل هدف",
    desc: "بررسی عمیق نیازهای بازار، شناخت مخاطب هدف و تدوین سند استراتژی محصول.",
  },
  {
    step: "۰۲",
    title: "طراحی رابط و تجربه (UI/UX)",
    desc: "طراحی پروتوتایپ‌های تعاملی و هویت بصری منحصر‌به‌فرد بر پایه دیزاین سیستم.",
  },
  {
    step: "۰۳",
    title: "توسعه و کدنویسی مدرن",
    desc: "پیاده‌سازی تمیز با فریم‌ورک‌های استاندارد روز و زیرساخت پرسرعت و امن.",
  },
  {
    step: "۰۴",
    title: "تست، سئو و لانچ",
    desc: "بهینه‌سازی Core Web Vitals، تست‌های نهایی و تحویل کامل همراه با پشتیبانی مستقیم.",
  },
];

const techPills = [
  "Next.js 14+",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Figma",
  "Core Web Vitals",
  "SEO Architecture",
  "Node.js",
];

export default function AboutPage() {
  return (
    <>
      {/* 1. Hero Section */}
      <div className="relative overflow-hidden bg-ink-50 pt-16 pb-14 md:pt-20 md:pb-20 border-b border-ink-150">
        <div
          className="pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(circle_at_50%_30%,#000_0%,transparent_75%)] bg-[linear-gradient(#e4e4e7_1px,transparent_1px),linear-gradient(90deg,#e4e4e7_1px,transparent_1px)] bg-[length:60px_60px]"
        />

        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center">
              <Eyebrow>درباره استودیو دیجیتال ردوبز</Eyebrow>
            </div>

            <h1 className="mt-6 font-display text-3xl font-extrabold leading-[1.35] text-ink-950 sm:text-4xl md:text-5xl lg:text-[52px]">
              ما سایتهایی میسازیم که برای کسبوکارها{" "}
              <span className="text-accent-600 underline decoration-accent-300 decoration-wavy decoration-2 underline-offset-8">
                واقعاً کار میکنند
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-loose text-ink-600 sm:text-lg">
              ردوبز با یک ماموریت روشن آغاز شد: رهایی کسب‌وکارهای ایرانی از قالب‌های کند،
              تکراری و بی‌ثمر، و ارائه محصولاتی مدرن که ترافیک ورودی را به مشتریان وفادار تبدیل می‌کنند.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Button href="/services" className="shadow-glow">
                مشاهده خدمات و پکیج‌ها ↗
              </Button>
              <Button href="/contact" variant="outline">
                تماس و مشاوره رایگان
              </Button>
            </div>
          </div>

          {/* Key Metrics Strip */}
          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-2xl border border-ink-150 bg-white p-5 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent-200 hover:shadow-card-hover"
              >
                <p className="font-display text-3xl font-extrabold text-ink-950 sm:text-4xl text-accent-600">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-bold text-ink-900">{stat.label}</p>
                <p className="mt-1 text-xs text-ink-500">{stat.hint}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* 2. Story / Bento Section */}
      <Section className="py-20 md:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <DashEyebrow>داستان و رسالت ما</DashEyebrow>
              <h2 className="mt-4 font-display text-2xl font-bold text-ink-950 sm:text-3xl md:text-4xl">
                چرا روش‌های سنتی ساخت سایت دیگر پاسخگو نیستند؟
              </h2>
              <p className="mt-5 text-base leading-loose text-ink-600">
                بیشتر سایت‌هایی که در وب می‌بینید، با قالب‌های شلوغ و سنگین ساخته شده‌اند؛
                سرعت لود پایینی دارند، در گوشی‌های همراه درست دیده نمی‌شوند و مهم‌تر از همه،
                هیچ نقش روشنی در جذب مشتری و رشد مالی کسب‌وکار بازی نمی‌کنند.
              </p>
              <p className="mt-4 text-base leading-loose text-ink-600">
                در ردوبز، ما طراحی و کدنویسی را بر پایه منطق کسب‌وکار، سرعت خارق‌العاده و روان‌شناسی
                کاربر پایه‌ریزی کرده‌ایم تا اطمینان یابیم هر کاربری که وارد سایت شما می‌شود، بهترین تجربه
                ممکن را داشته باشد.
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {techPills.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-ink-50 px-3 py-1 text-xs font-semibold text-ink-700"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Visual Bento Box */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-ink-150 bg-white p-6 shadow-card">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-50 text-accent-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-base font-bold text-ink-950">سرعت فوق‌العاده بالا</h3>
                <p className="mt-2 text-xs leading-relaxed text-ink-600">
                  لودینگ زیر ۲ ثانیه و کسب امتیاز سبز در تست‌های گوگل Lighthouse برای بهترین تجربه و سئو.
                </p>
              </div>

              <div className="rounded-3xl border border-ink-150 bg-white p-6 shadow-card">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brass-50 text-brass-700">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-base font-bold text-ink-950">موبایل‌فرست و واکنش‌گرا</h3>
                <p className="mt-2 text-xs leading-relaxed text-ink-600">
                  بیش از ۷۰٪ کاربران از موبایل می‌آیند؛ سایت شما در هر صفحه‌نمایشی بدون نقص کار می‌کند.
                </p>
              </div>

              <div className="rounded-3xl border border-ink-150 bg-white p-6 shadow-card">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink-100 text-ink-800">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="mt-4 text-base font-bold text-ink-950">معماری تمیز و مقیاس‌پذیر</h3>
                <p className="mt-2 text-xs leading-relaxed text-ink-600">
                  بدون وابستگی‌های مخرب؛ قابلیت افزودن هر امکانات اختصاصی در آینده بدون نیاز به دوباره‌کاری.
                </p>
              </div>

              <div className="rounded-3xl border border-accent-200 bg-gradient-to-br from-brand-600 to-ink-950 p-6 text-white shadow-card">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 text-white">
                  <span className="font-display text-lg">✦</span>
                </div>
                <h3 className="mt-4 text-base font-bold text-white">طراحی اختصاصی شما</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/80">
                  سایتی منحصر‌به‌فرد که امضای برند شماست، نه یک کپی تکراری از هزاران سایت دیگر.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. Methodology / Process */}
      <Section className="bg-ink-50 border-y border-ink-150 py-20 md:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <DashEyebrow>شیوه کار ما</DashEyebrow>
            <h2 className="mt-3 font-display text-2xl font-bold text-ink-950 sm:text-3xl md:text-4xl">
              مسیر ساده، شفاف و منظم از ایده تا راه‌اندازی
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-600">
              هیچ سردرگمی یا ابهامی وجود ندارد؛ در هر گام دقیقاً می‌دانید در چه مرحله‌ای از پروژه هستیم.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="relative flex flex-col justify-between rounded-3xl border border-ink-200/80 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
              >
                <div>
                  <span className="inline-block font-display text-2xl font-black text-accent-500">
                    {step.step}
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-ink-950">{step.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-ink-600">{step.desc}</p>
                </div>
                <div className="mt-6 h-1 w-8 rounded-full bg-accent-500/20" />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. Values */}
      <Section className="py-20 md:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>اصول ما</Eyebrow>
            <h2 className="mt-3 font-display text-2xl font-bold text-ink-950 sm:text-3xl md:text-4xl">
              ارزش‌هایی که هیچ‌گاه از آن‌ها کوتاه نمی‌آییم
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-600">
              چهار اصل زیربنایی که تک‌تک خطوط کد، دیزاین‌ها و ارتباطات ما را هدایت می‌کنند.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="group relative flex flex-col justify-between rounded-3xl border border-ink-150 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-200 hover:shadow-card-hover"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-50 transition-colors group-hover:bg-accent-50">
                      {value.icon}
                    </div>
                    <span className="font-display text-xs font-bold text-ink-300">{value.number}</span>
                  </div>
                  <h3 className="mt-6 text-base font-bold text-ink-950 group-hover:text-accent-600 transition-colors">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-ink-600">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 5. Team Section */}
      <Section className="bg-ink-50 border-t border-ink-150 py-20 md:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>افراد پشت ردوبز</Eyebrow>
            <h2 className="mt-3 font-display text-2xl font-bold text-ink-950 sm:text-3xl md:text-4xl">
              تیم تخصصی ردوبز
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-ink-600">
              ترکیبی از تجربه، خلاقیت و تخصص فنی برای ساخت سایت‌هایی با بالاترین استانداردهای روز.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div
                key={member.name}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-ink-150 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-200 hover:shadow-card-hover"
              >
                {/* Subtle top hover glow bar */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent-500/20 via-accent-500 to-accent-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div>
                  {/* Chic Monogram Avatar */}
                  <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
                    <div
                      className={`flex h-full w-full items-center justify-center rounded-2xl ${member.avatarBg} font-display text-3xl shadow-soft ring-4 ring-ink-50 transition-all duration-300 group-hover:scale-105 group-hover:ring-accent-100`}
                    >
                      {member.initial}
                    </div>
                    <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-accent-500 text-white shadow-sm">
                      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  </div>

                  {/* Name & Role */}
                  <div className="mt-5 text-center">
                    <h3 className="text-lg font-bold text-ink-900 transition-colors duration-200 group-hover:text-accent-600">
                      {member.name}
                    </h3>
                    <div className="mt-2 flex justify-center">
                      <span className={`inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-semibold ${member.badgeTone}`}>
                        {member.role}
                      </span>
                    </div>
                    <p className="mt-3.5 text-xs leading-relaxed text-ink-600">
                      {member.bio}
                    </p>
                  </div>
                </div>

                {/* Skills Tags */}
                <div className="mt-6 border-t border-ink-100 pt-4">
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {member.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg bg-ink-50 px-2 py-0.5 text-[11px] font-medium text-ink-600 transition-colors group-hover:bg-ink-100"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 6. High-Conversion CTA Banner */}
      <section className="relative overflow-hidden bg-ink-950 py-20 text-white md:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-15 [mask-image:radial-gradient(circle_at_50%_50%,#fff_0%,transparent_75%)] bg-[linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] bg-[length:48px_48px]"
        />

        <Container className="relative text-center">
          <div className="mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold text-accent-300">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
              شروع یک همکاری موفق
            </span>

            <h2 className="mt-6 font-display text-3xl font-extrabold leading-tight md:text-4xl lg:text-5xl text-white">
              آماده‌اید برای کسب‌وکارتان یک سایت در تراز جهانی بسازیم؟
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-base leading-loose text-ink-300">
              پکیج‌های آماده ما را بررسی کنید یا بدون تعهد و به صورت کاملاً رایگان، با تیم فنی ما درباره جزئیات پروژه‌تان صحبت کنید.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/services" className="!px-8 !py-4 text-base shadow-glow">
                مشاهده پکیج‌ها و تعرفه‌ها ↗
              </Button>
              <Button
                href="/contact"
                variant="outline"
                className="!border-white/20 !text-white hover:!bg-white/10 !px-8 !py-4 text-base"
              >
                درخواست مشاوره رایگان
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

