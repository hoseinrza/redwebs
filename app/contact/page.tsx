import type { Metadata } from "next";
import Link from "next/link";
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  MessageCircle,
  ShieldCheck,
  FileCheck,
  Zap,
  Code2,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  ArrowLeft,
  ChevronDown,
} from "lucide-react";
import Container from "@/components/Container";
import DashEyebrow from "@/components/DashEyebrow";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "ثبت سفارش اختصاصی و تماس با استودیو ردوبز",
  description:
    "درخواست مشاوره، استعلام قیمت و ثبت سفارش پروژه‌های وب‌اپلیکیشن اختصاصی، پلتفرم‌های سازمانی و سامانه‌های سفارشی با گارانتی SLA.",
};

const DIRECT_CHANNELS = [
  {
    title: "تماس تلفنی مستقیم",
    value: "۰۲۱-۹۱۰۹۴۵۲۱",
    sub: "شنبه تا چهارشنبه ۹ الی ۱۸",
    href: "tel:02191094521",
    icon: Phone,
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    title: "پشتیبانی فوری در تلگرام",
    value: "@redwebs_support",
    sub: "پاسخ‌گویی حتی در روزهای تعطیل",
    href: "https://t.me/redwebs_support",
    icon: MessageCircle,
    color: "text-sky-600 bg-sky-50",
  },
  {
    title: "ایمیل رسمی سازمان",
    value: "hello@redwebs.ir",
    sub: "جهت ارسال فایل RFP و مستندات",
    href: "mailto:hello@redwebs.ir",
    icon: Mail,
    color: "text-accent-600 bg-accent-50",
  },
];

const PROCESS_STEPS = [
  {
    step: "۰۱",
    title: "ثبت فرم و بررسی فنی اولیه",
    desc: "بررسی نیازمندی‌ها، امکان‌سنجی معماری و دیتابیس در کمتر از ۲۴ ساعت کاری.",
  },
  {
    step: "۰۲",
    title: "جلسه آنلاین ۳۰ دقیقه‌ای شفاف‌سازی",
    desc: "بررسی دقیق سناریوهای کاربری، دسترسی‌ها و هماهنگی انتظارات با مدیر فنی.",
  },
  {
    step: "۰۳",
    title: "ارسال پروپوزال، زمان‌بندی و پیش‌فاکتور",
    desc: "ارائه معماری دقیق (Stack)، هزینه نهایی بدون تبصره مخفی و مایل‌استون‌های تحویل.",
  },
  {
    step: "۰۴",
    title: "عقد قرارداد رسمی و شروع اسپرینت‌ها",
    desc: "امضای قرارداد با ضمانت تاخیر و محرمانگی (NDA)، و گزارش‌دهی هفتگی پیشرفت.",
  },
];

const FAQS = [
  {
    q: "هزینه و زمان‌بندی پروژه‌های خاص و وب‌اپلیکیشن‌ها چگونه محاسبه می‌شود؟",
    a: "بر خلاف پکیج‌های آماده، هزینه پروژه‌های اختصاصی بر اساس متغیرهای واقعی شامل: تعداد صفحات/ماژول‌ها، پیچیدگی دیتابیس، نوع احراز هویت، وب‌سرویس‌های متصل و نیاز به طراحی رابط کاربری از صفر در فیگما محاسبه می‌شود. تمام مبالغ در پیش‌فاکتور شفاف و بدون هیچ‌گونه هزینه پنهان درج می‌گردند.",
  },
  {
    q: "آیا برای حفظ ایده استارتاپی ما قرارداد عدم افشای اطلاعات (NDA) امضا می‌کنید؟",
    a: "بله، ۱۰۰٪. ما پیش از بررسی مستندات دقیق ایده یا فایل‌های تجاری شما، قرارداد استاندارد NDA را به‌صورت رسمی و حقوقی منعقد می‌کنیم تا خیالتان از محرمانگی کامل اطلاعات راحت باشد.",
  },
  {
    q: "مالکیت سورس‌کد و دیتابیس پس از پایان پروژه متعلق به چه کسی است؟",
    a: "تمام سورس‌کدها در گیت‌هاب/گیت‌لب اختصاصی شرکت شما تحویل داده شده و ۱۰۰٪ مالکیت مادی و معنوی کدها، دیتابیس و دسترسی‌های سرور به نام کارفرما منتقل می‌شود.",
  },
  {
    q: "پس از تحویل پروژه، پشتیبانی و نگهداری چگونه خواهد بود؟",
    a: "کلیه سفارش‌های اختصاصی دارای ۳ ماه پشتیبانی فنی و مانیتورینگ رایگان هستند. پس از آن نیز می‌توانید قراردادهای نگهداری سالانه (شامل آپدیت، مانیتورینگ امنیتی و توسعه فیچرهای جدید) را با ما تمدید کنید.",
  },
  {
    q: "آیا امکان اتصال سایت به نرم‌افزارهای حسابداری، سپیدار، هلو یا CRM وجود دارد؟",
    a: "بله. تیم فنی ما تجربه اتصال مستقیم به وب‌سرویس‌ها و APIهای انواع سیستم‌های مالی، اتوماسیون سازمانی، سامانه مودیان و درگاه‌های بانکی را داراست.",
  },
];

export default function ContactPage() {
  return (
    <div className="py-12 sm:py-16">
      <Container>
        {/* Page Hero Header */}
        <div className="max-w-3xl mb-12">
          <DashEyebrow>استعلام قیمت و ثبت سفارش اختصاصی</DashEyebrow>
          <h1 className="mt-3 font-display text-2xl sm:text-4xl lg:text-5xl font-black text-ink-950 leading-tight">
            پروژه خاص یا ایده متفاوتی دارید؟ همراه شما در اجرای بی‌نقص هستیم
          </h1>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-ink-600">
            از وب‌اپلیکیشن‌های پیشرفته Next.js و پلتفرم‌های چندکاربره تا بازطراحی جامع و سیستم‌های یکپارچه؛ مشخصات پروژه خود را ثبت کنید تا در کوتاه‌ترین زمان، بهترین راه‌حل فنی و پیش‌فاکتور دقیق را دریافت کنید.
          </p>
        </div>

        {/* Quick Contact Badges Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-12">
          {DIRECT_CHANNELS.map((ch) => {
            const Icon = ch.icon;
            return (
              <a
                key={ch.title}
                href={ch.href}
                target={ch.href.startsWith("http") ? "_blank" : undefined}
                rel={ch.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-4 rounded-3xl border border-ink-150 bg-white p-5 shadow-card transition-all hover:-translate-y-1 hover:border-accent-300 hover:shadow-card-hover"
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${ch.color} transition-transform group-hover:scale-110`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-ink-500 block mb-0.5">
                    {ch.title}
                  </span>
                  <span className="font-bold text-sm text-ink-950 group-hover:text-accent-600 transition-colors block">
                    {ch.value}
                  </span>
                  <span className="text-[11px] text-ink-400 block mt-0.5">
                    {ch.sub}
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        {/* Main Content Grid: Interactive Form (Left) + Process & Trust Sidebar (Right) */}
        <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] items-start">
          {/* Main Order & Contact Form */}
          <div>
            <ContactForm />
          </div>

          {/* Sticky Sidebar: Process & Guarantee */}
          <aside className="space-y-6 lg:sticky lg:top-24">
            {/* Guarantee Box */}
            <div className="rounded-3xl border border-ink-150 bg-white p-6 sm:p-7 shadow-card space-y-4">
              <div className="flex items-center gap-2 text-ink-950 font-bold text-sm border-b border-ink-100 pb-3">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                <span>تضمین‌های حقوقی و فنی ردوبز</span>
              </div>

              <ul className="space-y-3 text-xs sm:text-[12.5px] text-ink-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>قرارداد محرمانگی (NDA):</strong> تضمین عدم افشای ایده و اسناد سازمانی
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>مالکیت ۱۰۰٪ سورس‌کد:</strong> تحویل کامل ریپازیتوری بدون قفل یا وابستگی
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>ضمانت سرعت SLA:</strong> گواهی سرعت لود کمتر از ۱.۵ ثانیه در اینترنت ایران
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>۳ ماه پشتیبانی فنی رایگان:</strong> مانیتورینگ بدون قطعی پس از لانچ
                  </span>
                </li>
              </ul>
            </div>

            {/* How Custom Orders Work (4 Steps) */}
            <div className="rounded-3xl border border-ink-150 bg-gradient-to-br from-ink-950 to-ink-900 text-white p-6 sm:p-7 shadow-card space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-bold text-accent-400 flex items-center gap-1.5">
                  <Zap className="h-4 w-4" />
                  <span>مسیر اجرای سفارش‌های خاص</span>
                </span>
                <span className="text-[11px] text-ink-400">۴ گام شفاف</span>
              </div>

              <div className="space-y-4">
                {PROCESS_STEPS.map((step) => (
                  <div key={step.step} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[11px] font-mono font-bold text-accent-400 border border-white/15">
                      {step.step}
                    </span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white mb-0.5">
                        {step.title}
                      </h4>
                      <p className="text-[11.5px] leading-relaxed text-ink-300">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Consultation Call Card */}
            <div className="rounded-3xl border border-accent-200 bg-accent-50/50 p-6 shadow-xs text-right space-y-3">
              <div className="flex items-center gap-2 text-accent-800 font-bold text-sm">
                <Sparkles className="h-4 w-4 text-accent-600" />
                <span>جلسه آنلاین مشاوره ۳۰ دقیقه‌ای</span>
              </div>
              <p className="text-xs text-ink-700 leading-relaxed">
                اگر قبل از ثبت سفارش نیاز دارید در مورد چالش فنی پروژه‌تان با مدیر فنی هم‌فکری کنید، هماهنگی جلسه در گوگل‌میت رایگان است.
              </p>
              <a
                href="https://t.me/redwebs_support"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-700 hover:text-accent-800 underline"
              >
                <span>هماهنگی تایم جلسه در تلگرام</span>
                <ArrowLeft className="h-3.5 w-3.5" />
              </a>
            </div>
          </aside>
        </div>

        {/* Custom Orders FAQ Accordion Section */}
        <div className="mt-20 pt-16 border-t border-ink-150">
          <div className="max-w-2xl mb-10">
            <DashEyebrow>شفافیت کامل در همکاری</DashEyebrow>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl font-black text-ink-950 leading-tight">
              سوالات پرتکرار سفارش‌های خاص و سازمانی
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-ink-600">
              پاسخ به ابهامات رایج کارفرمایان درباره قرارداد، مالکیت کدها و فرآیند اجرا.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl border border-ink-150 bg-white p-6 shadow-card space-y-2.5"
              >
                <h3 className="font-display text-sm sm:text-base font-bold text-ink-950 flex items-start gap-2">
                  <HelpCircle className="h-4 w-4 text-accent-500 shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-ink-600 text-justify">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
