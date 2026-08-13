import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Zap,
  Globe,
  ArrowRight,
  Check,
  Clock,
  ShieldCheck,
  Headphones,
  Code2,
  FileCheck,
  CheckCircle2,
  Layers,
  Sparkles,
  PhoneCall,
  Calendar,
} from "lucide-react";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Eyebrow from "@/components/Eyebrow";
import Button from "@/components/Button";
import PackageCard from "@/components/PackageCard";
import AddToCartPanel from "@/components/AddToCartPanel";
import { packages, getPackageBySlug } from "@/lib/data/packages";

export function generateStaticParams() {
  return packages.map((pkg) => ({ slug: pkg.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const pkg = getPackageBySlug(params.slug);
  if (!pkg) return {};
  return {
    title: `${pkg.name} | جزئیات و سفارش پکیج`,
    description: `${pkg.tagline} - ${pkg.description}`,
  };
}

export default function PackageDetailPage({ params }: { params: { slug: string } }) {
  const pkg = getPackageBySlug(params.slug);
  if (!pkg) notFound();

  const isCustom = pkg.techType === "custom_code";
  const related = packages.filter((p) => p.techType === pkg.techType && p.slug !== pkg.slug).slice(0, 3);

  // Delivery process steps
  const processSteps = [
    {
      step: "۰۱",
      title: "جلسه نیازسنجی و پروپوزال فنی",
      desc: "بررسی دقیق اهداف، مخاطبان هدف، بررسی نمونه‌های مورد پسند و تدوین نقشه راه پروژه.",
    },
    {
      step: "۰۲",
      title: "طراحی وایرفریم و پروتوتایپ UI/UX",
      desc: "طراحی وایرلس و اسکچ صفحات در فیگما بر اساس هویت بصری برند شما تا رسیدن به تایید نهایی.",
    },
    {
      step: "۰۳",
      title: isCustom ? "توسعه فرانت‌اند و API با Next.js" : "پیاده‌سازی در وردپرس و پیکربندی ماژول‌ها",
      desc: isCustom
        ? "کدنویسی ماژولار با تایپ‌اسکریپت، اتصال دیتابیس و بهینه‌سازی کامل پرفورمنس لایت‌هاوس."
        : "پیاده‌سازی دقیق دیزاین، تنظیم ساختار پایگاه‌داده، ماژول‌ها و امنیت استاندارد.",
    },
    {
      step: "۰۴",
      title: "تست نهایی، آموزش و لانچ رسمی",
      desc: "تست در انواع دیوایس‌ها، ضبط ویدیوهای آموزشی پنل مدیریت، استقرار روی سرور اصلی و شروع پشتیبانی.",
    },
  ];

  // Specific guarantees
  const guarantees = [
    {
      icon: Clock,
      title: "تعهد دقیق زمان‌بندی",
      desc: `تحویل تضمین‌شده در بازه ${pkg.deliveryTime} طبق بندهای صریح قرارداد`,
    },
    {
      icon: ShieldCheck,
      title: "مالکیت ۱۰۰٪ سورس و دیتا",
      desc: "ارائه کلیه دسترسی‌ها، فایل‌های سورس، مخزن گیت یا لایسنس‌ها به کارفرما",
    },
    {
      icon: Headphones,
      title: "۶ ماه پشتیبانی و گارانتی",
      desc: "رفع هرگونه باگ احتمالی و پاسخگویی به ابهامات کاربری به صورت رایگان",
    },
    {
      icon: Code2,
      title: "کدنویسی تمیز و بهینه",
      desc: "رعایت استانداردهای بین‌المللی SEO On-Page و بیشترین سرعت لود",
    },
  ];

  return (
    <>
      <div className="bg-ink-50/60 border-b border-ink-150/70 pt-8 pb-10">
        <Container>
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-medium text-ink-500 mb-6">
            <Link href="/" className="hover:text-ink-950 transition-colors">
              صفحه اصلی
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-ink-950 transition-colors">
              خدمات و پکیج‌ها
            </Link>
            <span>/</span>
            <span className="text-ink-950 font-bold">{pkg.name}</span>
          </nav>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                    isCustom
                      ? "bg-accent-50 text-accent-700 border border-accent-200"
                      : "bg-emerald-50 text-emerald-800 border border-emerald-200"
                  }`}
                >
                  {isCustom ? (
                    <>
                      <Zap className="h-3.5 w-3.5 text-accent-600" />
                      <span>کدنویسی اختصاصی (Next.js)</span>
                    </>
                  ) : (
                    <>
                      <Globe className="h-3.5 w-3.5 text-emerald-600" />
                      <span>وردپرس و ووکامرس</span>
                    </>
                  )}
                </span>
                <span className="rounded-full bg-ink-100 px-3 py-1 text-xs font-bold text-ink-700">
                  {pkg.techLabel}
                </span>
                {pkg.popular && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-accent-500 px-3 py-1 text-xs font-bold text-white shadow-xs">
                    <Sparkles className="h-3 w-3" />
                    <span>پکیج منتخب و پرفروش</span>
                  </span>
                )}
              </div>
              <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink-950">
                {pkg.name}
              </h1>
              <p className="mt-2 text-sm sm:text-base text-ink-600 max-w-2xl leading-relaxed">
                {pkg.tagline}
              </p>
            </div>

            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-600 hover:text-accent-700 underline underline-offset-4"
            >
              <ArrowRight className="h-3.5 w-3.5" />
              <span>مشاهده همه پکیج‌ها</span>
            </Link>
          </div>
        </Container>
      </div>

      <Container className="py-12">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] items-start">
          {/* Main Content Area */}
          <div className="space-y-10">
            {/* Overview Section */}
            <div className="rounded-2xl border border-ink-150 bg-white p-6 sm:p-8 shadow-card">
              <h2 className="text-lg font-bold text-ink-950 flex items-center gap-2 border-b border-ink-100 pb-3">
                <Layers className="h-5 w-5 text-accent-600" />
                <span>درباره و اهداف این پکیج</span>
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-loose text-ink-700 text-justify">
                {pkg.description}
              </p>

              {/* Highlights tags */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-ink-100 text-xs">
                <div className="rounded-xl bg-ink-50 p-3">
                  <span className="text-ink-400 block mb-1">نوع تکنولوژی</span>
                  <strong className="text-ink-900 block truncate">{pkg.techLabel}</strong>
                </div>
                <div className="rounded-xl bg-ink-50 p-3">
                  <span className="text-ink-400 block mb-1">زمان تحویل</span>
                  <strong className="text-ink-900 block">{pkg.deliveryTime}</strong>
                </div>
                <div className="rounded-xl bg-ink-50 p-3 col-span-2 sm:col-span-1">
                  <span className="text-ink-400 block mb-1">مدت گارانتی</span>
                  <strong className="text-ink-900 block">۶ ماه رایگان</strong>
                </div>
              </div>
            </div>

            {/* Included Features Checklist */}
            <div className="rounded-2xl border border-ink-150 bg-white p-6 sm:p-8 shadow-card">
              <h2 className="text-lg font-bold text-ink-950 flex items-center gap-2 border-b border-ink-100 pb-3">
                <CheckCircle2 className="h-5 w-5 text-accent-600" />
                <span>امکانات و قابلیت‌های پکیج {pkg.name}</span>
              </h2>
              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm">
                {pkg.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 rounded-xl border border-ink-100 bg-ink-50/40 p-3.5"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-100 text-accent-700 mt-0.5">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </span>
                    <span className="font-medium text-ink-800 leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Delivery Workflow Steps */}
            <div className="rounded-2xl border border-ink-150 bg-white p-6 sm:p-8 shadow-card">
              <h2 className="text-lg font-bold text-ink-950 flex items-center gap-2 border-b border-ink-100 pb-3">
                <FileCheck className="h-5 w-5 text-accent-600" />
                <span>مراحل اجرای پروژه از شروع تا تحویل</span>
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {processSteps.map((step) => (
                  <div
                    key={step.step}
                    className="relative rounded-2xl border border-ink-100 bg-white p-5 shadow-xs"
                  >
                    <span className="font-display text-xl font-black text-accent-500">
                      {step.step}
                    </span>
                    <h3 className="mt-2 text-sm font-bold text-ink-950">{step.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-ink-600">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Guarantees Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {guarantees.map((item) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={item.title}
                    className="flex items-start gap-3.5 rounded-2xl border border-ink-150 bg-white p-5 shadow-xs"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                      <IconComp className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-ink-950">{item.title}</h4>
                      <p className="mt-1 text-xs text-ink-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sticky Checkout & Action Panel */}
          <div className="lg:sticky lg:top-24 space-y-6">
            <AddToCartPanel pkg={pkg} />

            {/* Need Customization Banner */}
            <div className="rounded-2xl border border-ink-200/80 bg-ink-950 text-white p-6 shadow-card">
              <div className="flex items-center gap-2 text-accent-400 text-xs font-bold mb-2">
                <PhoneCall className="h-4 w-4" />
                <span>مشاوره و استعلام اختصاصی</span>
              </div>
              <h3 className="font-display text-base font-bold">نیاز به تغییر در امکانات پکیج دارید؟</h3>
              <p className="mt-2 text-xs text-ink-300 leading-relaxed">
                می‌توانید قابلیت‌های دلخواه خود را به این پکیج اضافه کنید یا سفارش اختصاصی ثبت نمایید.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-ink-950 hover:bg-ink-100 transition-colors"
                >
                  <PhoneCall className="h-3.5 w-3.5" />
                  <span>درخواست مشاوره رایگان</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Packages */}
        {related.length > 0 && (
          <div className="mt-20 border-t border-ink-200/80 pt-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-bold text-ink-950">سایر پکیج‌های پیشنهادی هم‌رده</h2>
                <p className="text-xs text-ink-500 mt-1">
                  پکیج‌های مکمل در شاخه {isCustom ? "کدنویسی اختصاصی" : "وردپرس و ووکامرس"}
                </p>
              </div>
              <Link
                href="/services"
                className="text-xs font-bold text-accent-600 hover:text-accent-700 inline-flex items-center gap-1"
              >
                <span>تمام خدمات</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PackageCard key={p.slug} pkg={p} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </>
  );
}

