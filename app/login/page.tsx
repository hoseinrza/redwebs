import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Zap,
  CheckCircle2,
  Lock,
  Layers,
  MessageSquare,
  FileText,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Activity,
} from "lucide-react";
import AuthForm from "@/components/AuthForm";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "ورود به میز کار کارفرمایان | استودیو توسعه وب ردوبز",
  description:
    "ورود به پنل اختصاصی کارفرما جهت پیگیری زنده اسپرینت‌های توسعه، ارتباط مستقیم با تیم فنی، مشاهده نسخه‌های استیجینگ و پرداخت فاکتورها.",
};

const PORTAL_BENEFITS = [
  {
    icon: Activity,
    title: "رهگیری زنده و شفاف اسپرینت‌ها",
    desc: "مشاهده لحظه‌ای پیشرفت تسک‌های فرانت‌اند، بک‌اند و وضعیت آزمون‌های کیفی (QA).",
  },
  {
    icon: MessageSquare,
    title: "کانال ارتباط مستقیم با مهندس ارشد",
    desc: "تیکتینگ و پیام‌رسانی بلادرنگ بدون معطلی و واسطه‌های اداری.",
  },
  {
    icon: Layers,
    title: "پیش‌نمایش استیجینگ و کدهای زنده",
    desc: "تست مستقیم نسخه‌های آزمایشی روی ساب‌دامین‌های امن قبل از انتشار عمومی.",
  },
  {
    icon: FileText,
    title: "مدیریت فاکتورها، قراردادها و SLA",
    desc: "دسترسی به اسناد رسمی، فاکتورهای دوره‌ای و گزارش‌های مانیتورینگ عملکرد.",
  },
];

export default function LoginPage() {
  return (
    <div className="relative min-h-screen bg-ink-50/50 py-12 sm:py-16 lg:py-20 overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,#000_0%,transparent_75%)] bg-[linear-gradient(#e5e5e8_1px,transparent_1px),linear-gradient(90deg,#e5e5e8_1px,transparent_1px)] bg-[length:60px_60px]" />

      <Container className="relative z-10">
        {/* Top Header / Brand Nav */}
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <Link
            href="/"
            className="group flex items-center gap-2 text-xs sm:text-sm font-bold text-ink-700 hover:text-ink-950 transition-colors"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white border border-ink-200 group-hover:border-ink-300 shadow-xs">
              <ArrowRight className="h-4 w-4" />
            </div>
            <span>بازگشت به سایت ردوبز</span>
          </Link>

          <Link href="/" className="font-display text-xl sm:text-2xl font-black text-ink-950">
            <span className="text-accent-600">رد</span>وبز
          </Link>
        </div>

        {/* Main 2-Column Auth Grid */}
        <div className="grid gap-10 lg:grid-cols-12 items-center">
          {/* Left Column: Visual Showcase & Client Portal Benefits (lg:col-span-6) */}
          <div className="space-y-8 lg:col-span-6 order-2 lg:order-1">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent-200 bg-accent-50/80 px-3.5 py-1 text-xs font-bold text-accent-800">
                <Sparkles className="h-3.5 w-3.5 text-accent-600" />
                <span>فضای کار یکپارچه کارفرمایان ردوبز</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-ink-950 leading-tight">
                پروژه شما با نهایت شفافیت، گام‌به‌گام پیش چشمان شما
              </h1>
              <p className="text-sm sm:text-base leading-relaxed text-ink-600 text-justify">
                در پنل مشتریان ردوبز، تمام مراحل توسعه نرم‌افزار، از طراحی رابط کاربری فیگما تا تست بارگذاری و تحویل نهایی، به صورت زنده و مستند در اختیار شماست.
              </p>
            </div>

            {/* Live Interactive Project Mock Card */}
            <div className="rounded-3xl border border-ink-200/90 bg-white p-5 sm:p-6 shadow-card space-y-4">
              <div className="flex items-center justify-between border-b border-ink-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-ink-900">
                    پروژه فعال: پلتفرم بازرگانی و فروشگاه اختصاصی
                  </span>
                </div>
                <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200">
                  اسپرینت ۴ از ۵
                </span>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-ink-500">پیشرفت کل پروژه:</span>
                  <span className="font-bold text-accent-700">۸۸٪ (آماده تست استیجینگ)</span>
                </div>
                <div className="h-2 w-full rounded-full bg-ink-100 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-accent-500 to-emerald-500 rounded-full w-[88%]" />
                </div>
              </div>

              {/* Mini status metrics */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                <div className="rounded-xl bg-ink-50 p-2.5">
                  <span className="text-[10px] text-ink-500 block">سرعت لود (LCP)</span>
                  <span className="text-xs font-bold text-emerald-700 font-mono">۰.۸ ثانیه</span>
                </div>
                <div className="rounded-xl bg-ink-50 p-2.5">
                  <span className="text-[10px] text-ink-500 block">تست امنیتی</span>
                  <span className="text-xs font-bold text-ink-900">A+ Pass</span>
                </div>
                <div className="rounded-xl bg-ink-50 p-2.5">
                  <span className="text-[10px] text-ink-500 block">تسک‌های انجام‌شده</span>
                  <span className="text-xs font-bold text-ink-900 font-mono">۳۴ از ۳۸</span>
                </div>
              </div>
            </div>

            {/* Feature Highlights List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PORTAL_BENEFITS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-ink-150 bg-white/70 backdrop-blur-xs p-4 space-y-1.5"
                  >
                    <div className="flex items-center gap-2 text-ink-950 font-bold text-xs">
                      <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-accent-100 text-accent-700">
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <span>{item.title}</span>
                    </div>
                    <p className="text-[11.5px] leading-relaxed text-ink-600">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Interactive Login Form (lg:col-span-6) */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <AuthForm />
          </div>
        </div>

        {/* Bottom Help & Fast Contact Bar */}
        <div className="mt-12 pt-8 border-t border-ink-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-600">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>نیاز به پشتیبانی فنی یا مشاوره دارید؟</span>
            <Link href="/contact" className="font-bold text-accent-700 hover:underline">
              تماس مستقیم با پشتیبانی
            </Link>
          </div>

          <div className="flex items-center gap-4 text-ink-500">
            <span>شماره پشتیبانی: ۰۲۱-۹۱۰۹۴۵۲۱</span>
            <span>·</span>
            <span>تلگرام: @redwebs_support</span>
          </div>
        </div>
      </Container>
    </div>
  );
}
