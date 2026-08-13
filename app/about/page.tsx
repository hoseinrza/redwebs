import type { Metadata } from "next";
import Section from "@/components/Section";
import Button from "@/components/Button";
import Eyebrow from "@/components/Eyebrow";

const stats = [
  { value: "۱۲۰+", label: "پروژه تحویل‌شده" },
  { value: "۹۸٪", label: "رضایت مشتری" },
  { value: "۷ سال", label: "تجربه در بازار ایران" },
  { value: "۸ تا ۱۲ هفته", label: "زمان معمول تحویل پروژه" },
];

export const metadata: Metadata = {
  title: "درباره ما",
  description: "داستان ردوبز، تیم و ارزش‌هایی که کار ما رو شکل می‌دن.",
};

const team = [
  { name: "امیرحسین رضازاده", role: "بنیان‌گذار و توسعه‌دهنده" },
  { name: "همکار طراحی", role: "طراح رابط و تجربه کاربری" },
  { name: "همکار محتوا", role: "استراتژی محتوا و سئو" },
];

const values = [
  {
    title: "شفافیت در قیمت و زمان",
    description: "هزینه و زمان‌بندی رو از روز اول شفاف می‌گیم، نه بعد از شروع پروژه.",
  },
  {
    title: "تمرکز روی نتیجه، نه فقط ظاهر",
    description: "هر تصمیم طراحی باید یه دلیل کسب‌وکاری داشته باشه.",
  },
  {
    title: "دسترسی مستقیم به تیم",
    description: "با واسطه و پشتیبانی چندلایه کار نمی‌کنیم؛ مستقیم با کسایی که می‌سازن حرف می‌زنید.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Section className="pt-16 md:pt-20">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>درباره ردوبز</Eyebrow>
          <h1 className="mt-4 text-3xl font-bold text-ink-900 md:text-4xl">
            تیمی کوچک که سایت‌هایی می‌سازه که واقعاً کار می‌کنن
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-base leading-loose text-ink-600">
            ردوبز رو با یه هدف ساده شروع کردیم: کسب‌وکارهای خدماتی و محلی
            معمولاً یا سایت ندارن، یا سایتی دارن که هیچ مشتری‌ای براشون
            نمی‌آره. ما این مسئله رو حل می‌کنیم.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-8 border-t border-ink-150 pt-10 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-ink-900 md:text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs text-ink-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-ink-50">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-ink-900 md:text-3xl">ارزش‌های ما</h2>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {values.map((value) => (
            <div key={value.title}>
              <h3 className="font-semibold text-ink-900">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{value.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-ink-900 md:text-3xl">تیم ما</h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {team.map((member) => (
            <div key={member.name} className="rounded-2xl border border-ink-150 bg-white p-6 text-center shadow-card">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ink-50 font-display text-2xl text-accent-600 ring-2 ring-brass-200">
                {member.name.charAt(0)}
              </div>
              <h3 className="mt-4 font-semibold text-ink-900">{member.name}</h3>
              <p className="mt-1 text-sm text-ink-600">{member.role}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-ink-950 text-center">
        <h2 className="text-2xl font-bold text-white md:text-3xl">دوست دارید باهم کار کنیم؟</h2>
        <p className="mx-auto mt-3 max-w-md text-ink-300">
          پکیج‌های آماده رو ببینید یا مستقیم با تیم ما درباره‌ی پروژه‌تون حرف بزنید.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/services">مشاهده‌ی پکیج‌ها</Button>
          <Button href="/contact" variant="outline" className="!border-white/20 !text-white hover:!bg-white/10">
            تماس با ما
          </Button>
        </div>
      </Section>
    </>
  );
}
