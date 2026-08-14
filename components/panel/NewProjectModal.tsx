"use client";

import { useState } from "react";
import {
  X,
  Sparkles,
  Layers,
  Code2,
  Globe,
  ShoppingCart,
  Layout,
  Rocket,
  CheckCircle2,
  Calendar,
  DollarSign,
  Paperclip,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Zap,
  Clock,
  Briefcase,
  Cpu,
  Check,
} from "lucide-react";
import { toPersianDigits, formatPrice } from "@/lib/format";

export interface NewProjectData {
  title: string;
  projectType: string;
  techStack: string;
  budgetRange: string;
  timeline: string;
  features: string[];
  description: string;
  domain?: string;
}

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (project: NewProjectData) => void;
}

const PROJECT_TYPES = [
  {
    id: "custom-web",
    title: "وب‌سایت اختصاصی با Next.js",
    desc: "سرعت فوق‌العاده، سئو فنی بی‌نظیر، انیمیشن‌های تعاملی و طراحی مدرن",
    icon: Code2,
    badge: "توصیه مهندسی",
    popular: true,
  },
  {
    id: "ecommerce",
    title: "فروشگاه آنلاین پیشرفته",
    desc: "درگاه‌های بانکی، مدیریت انبار، سبد خرید مدرن و سیستم پیامکی",
    icon: ShoppingCart,
    badge: "فروش بالا",
  },
  {
    id: "corporate",
    title: "سایت شرکتی و سازمانی",
    desc: "معرفی کامل برند، خدمات، چندزبانه، پورتفولیو و فرم‌های استعلام",
    icon: Globe,
    badge: "کسب‌وکارها",
  },
  {
    id: "landing",
    title: "لندینگ‌پیج کمپین و تبلیغات",
    desc: "طراحی پرقدرت با نرخ تبدیل بالا برای جذب سرنخ (Lead Generation)",
    icon: Layout,
    badge: "تحویل ۱ هفته",
  },
  {
    id: "webapp",
    title: "وب‌اپلیکیشن و پنل کاربری",
    desc: "داشبورد اختصاصی SaaS، احراز هویت، دیتابیس ابری و پنل مدیریت",
    icon: Cpu,
    badge: "مقیاس‌پذیر",
  },
  {
    id: "redesign",
    title: "ریدیزاین و ارتقای سایت فعلی",
    desc: "بازطراحی کامل رابط کاربری UI/UX و بهینه‌سازی سرعت و پرفورمنس",
    icon: Rocket,
    badge: "بهینه‌سازی",
  },
];

const TECH_OPTIONS = [
  {
    id: "nextjs",
    name: "Next.js 15 + TypeScript + Tailwind",
    meta: "بیشترین سرعت، بهترین رتبه سئو و انعطاف فنی کامل",
    recommended: true,
  },
  {
    id: "wordpress",
    name: "وردپرس و ووکامرس پیشرفته",
    meta: "مدیریت محتوای بسیار ساده، اقتصادی و آماده در زمان کمتر",
    recommended: false,
  },
  {
    id: "consult",
    name: "مشاوره و انتخاب با تیم فنی ردوبز",
    meta: "معماری بر اساس نیاز دقیق کسب‌وکار شما توسط لید دولوپر انتخاب می‌شود",
    recommended: false,
  },
];

const FEATURE_CHECKBOXES = [
  "اتصال به درگاه بانکی شاپرک (زرین‌پال / سامان)",
  "سیستم چندزبانه (انگلیسی، عربی، فارسی)",
  "فرم نوبت‌دهی / استعلام قیمت آنلاین",
  "یکپارچه‌سازی با سامانه پیامک و OTP",
  "پنل اختصاصی کاربری یا کارفرما",
  "انیمیشن‌های تعاملی و موشن‌های سه‌بعدی",
  "پیکربندی سئو داخلی و نقشه سایت گوگل",
  "اتصال به ابزارهای هوش مصنوعی و ربات هوشمند",
];

const BUDGET_OPTIONS = [
  "زیر ۱۵ میلیون تومان",
  "۱۵ تا ۳۰ میلیون تومان",
  "۳۰ تا ۶۰ میلیون تومان",
  "بیش از ۶۰ میلیون تومان (پروژه‌های Enterprise)",
  "نیازمند برآورد دقیق فنی توسط کارشناس",
];

const TIMELINE_OPTIONS = [
  { id: "urgent", label: "فوری و ضرب‌الاجل (کمتر از ۲ هفته)", tag: "اسپرینت فشرده" },
  { id: "normal", label: "استاندارد و برنامه‌ریزی‌شده (۳ تا ۵ هفته)", tag: "پیش‌فرض", default: true },
  { id: "flexible", label: "انعطاف‌پذیر بر اساس کیفیت خروجی", tag: "طراحی عمیق" },
];

export default function NewProjectModal({ isOpen, onClose, onSubmit }: NewProjectModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedType, setSelectedType] = useState("custom-web");
  const [selectedTech, setSelectedTech] = useState("nextjs");
  const [title, setTitle] = useState("");
  const [domain, setDomain] = useState("");
  const [budget, setBudget] = useState("۳۰ تا ۶۰ میلیون تومان");
  const [timeline, setTimeline] = useState("standard");
  const [features, setFeatures] = useState<string[]>([
    "اتصال به درگاه بانکی شاپرک (زرین‌پال / سامان)",
    "یکپارچه‌سازی با سامانه پیامک و OTP",
    "پیکربندی سئو داخلی و نقشه سایت گوگل",
  ]);
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [trackingCode, setTrackingCode] = useState("");

  if (!isOpen) return null;

  function toggleFeature(feat: string) {
    setFeatures((prev) =>
      prev.includes(feat) ? prev.filter((f) => f !== feat) : [...prev, feat]
    );
  }

  function handleFinalSubmit() {
    if (!title.trim()) {
      alert("لطفاً عنوان یا نام پروژه را وارد کنید.");
      return;
    }

    setIsSubmitting(true);
    const code = `RW-${toPersianDigits(Math.floor(10000 + Math.random() * 90000))}`;
    setTrackingCode(code);

    const projectData: NewProjectData = {
      title,
      projectType: PROJECT_TYPES.find((p) => p.id === selectedType)?.title || selectedType,
      techStack: TECH_OPTIONS.find((t) => t.id === selectedTech)?.name || selectedTech,
      budgetRange: budget,
      timeline,
      features,
      description,
      domain,
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      onSubmit(projectData);
    }, 900);
  }

  function handleResetAndClose() {
    setIsSuccess(false);
    setStep(1);
    setTitle("");
    setDescription("");
    setDomain("");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={handleResetAndClose}
        className="fixed inset-0 bg-ink-950/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-3xl rounded-3xl border border-ink-150 bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-ink-150 px-6 py-4 bg-ink-50/70">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-600 text-white shadow-xs">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-base sm:text-lg font-bold text-ink-950">
                سفارش و آغاز پروژه جدید
              </h2>
              <p className="text-xs text-ink-500">
                مشخصات طرح را تعیین کنید تا در کمتر از ۲ ساعت تیم فنی بررسی را شروع کند.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleResetAndClose}
            aria-label="بستن پنجره"
            className="flex h-8 w-8 items-center justify-center rounded-xl text-ink-400 hover:bg-ink-200/60 hover:text-ink-950 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Stepper indicator (if not success) */}
        {!isSuccess && (
          <div className="border-b border-ink-100 bg-white px-6 py-3">
            <div className="flex items-center justify-between gap-2 max-w-xl mx-auto">
              {[
                { s: 1, label: "نوع پروژه" },
                { s: 2, label: "فناوری و زیرساخت" },
                { s: 3, label: "مشخصات و قابلیت‌ها" },
                { s: 4, label: "بودجه و زمان‌بندی" },
              ].map((item) => (
                <div key={item.s} className="flex items-center gap-2">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold font-mono transition-colors ${
                      step === item.s
                        ? "bg-accent-600 text-white shadow-xs"
                        : step > item.s
                        ? "bg-emerald-500 text-white"
                        : "bg-ink-100 text-ink-500"
                    }`}
                  >
                    {step > item.s ? <Check className="h-3.5 w-3.5" /> : toPersianDigits(item.s)}
                  </div>
                  <span
                    className={`hidden sm:inline text-xs font-bold ${
                      step === item.s ? "text-accent-700" : "text-ink-500"
                    }`}
                  >
                    {item.label}
                  </span>
                  {item.s < 4 && (
                    <div className="hidden sm:block h-0.5 w-6 sm:w-10 bg-ink-200 mx-1" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {/* SUCCESS SCREEN */}
          {isSuccess ? (
            <div className="py-8 text-center space-y-6 max-w-lg mx-auto animate-in fade-in">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-glow">
                <CheckCircle2 className="h-10 w-10" />
              </div>

              <div className="space-y-2">
                <h3 className="font-display text-xl sm:text-2xl font-black text-ink-950">
                  درخواست پروژه با موفقیت ثبت شد!
                </h3>
                <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">
                  سفارش شما با کد پیگیری اختصاصی در سیستم میز کارفرما ثبت شد و مستقیماً در اختیار مدیر فنی و سرپرست تیم طراحی قرار گرفت.
                </p>
              </div>

              {/* Order Tracking Badge */}
              <div className="rounded-2xl border border-accent-200 bg-accent-50/80 p-4 text-center space-y-1">
                <span className="text-xs text-accent-800 font-semibold block">شماره پیگیری سفارش پروژه:</span>
                <span className="font-mono text-xl sm:text-2xl font-black text-accent-700 tracking-wider dir-ltr inline-block">
                  {trackingCode}
                </span>
                <span className="block text-[11px] text-ink-500 pt-1">
                  پروژه به لیست «پروژه‌های من» اضافه شد و پیام هماهنگی برای شما ارسال گردید.
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-accent-600 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-glow hover:bg-accent-700 transition-all"
                >
                  <span>مشاهده در لیست پروژه‌ها</span>
                  <ArrowLeft className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* STEP 1: PROJECT TYPE SELECTION */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-ink-950">
                      نوع پروژه یا خدمت مدنظرتان را انتخاب کنید:
                    </h3>
                    <span className="text-xs text-ink-400">گام ۱ از ۴</span>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {PROJECT_TYPES.map((pt) => {
                      const Icon = pt.icon;
                      const isSelected = selectedType === pt.id;
                      return (
                        <div
                          key={pt.id}
                          onClick={() => setSelectedType(pt.id)}
                          className={`relative flex cursor-pointer items-start gap-3.5 rounded-2xl border p-4 transition-all ${
                            isSelected
                              ? "border-accent-600 bg-accent-50/60 shadow-xs ring-2 ring-accent-600/20"
                              : "border-ink-200 bg-white hover:border-ink-300 hover:bg-ink-50/50"
                          }`}
                        >
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                              isSelected
                                ? "bg-accent-600 text-white"
                                : "bg-ink-100 text-ink-700"
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-xs sm:text-sm font-bold text-ink-950">
                                {pt.title}
                              </span>
                              <span
                                className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                  isSelected
                                    ? "bg-accent-200/80 text-accent-900"
                                    : "bg-ink-100 text-ink-600"
                                }`}
                              >
                                {pt.badge}
                              </span>
                            </div>
                            <p className="mt-1 text-[11px] text-ink-500 leading-relaxed">
                              {pt.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2: TECH STACK SELECTION */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-ink-950">
                      معماری فنی و پلتفرم اجرایی مورد نظر:
                    </h3>
                    <span className="text-xs text-ink-400">گام ۲ از ۴</span>
                  </div>

                  <div className="space-y-3">
                    {TECH_OPTIONS.map((t) => {
                      const isSelected = selectedTech === t.id;
                      return (
                        <div
                          key={t.id}
                          onClick={() => setSelectedTech(t.id)}
                          className={`flex cursor-pointer items-start justify-between gap-4 rounded-2xl border p-4 transition-all ${
                            isSelected
                              ? "border-accent-600 bg-accent-50/60 shadow-xs ring-2 ring-accent-600/20"
                              : "border-ink-200 bg-white hover:border-ink-300 hover:bg-ink-50/50"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                                isSelected
                                  ? "border-accent-600 bg-accent-600 text-white"
                                  : "border-ink-300 bg-white"
                              }`}
                            >
                              {isSelected && <Check className="h-3 w-3" />}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs sm:text-sm font-bold text-ink-950">
                                  {t.name}
                                </span>
                                {t.recommended && (
                                  <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10.5px] font-bold text-emerald-700 border border-emerald-200">
                                    توصیه اصلی ردوبز
                                  </span>
                                )}
                              </div>
                              <p className="mt-1 text-[11.5px] text-ink-500 leading-relaxed">
                                {t.meta}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="rounded-2xl bg-ink-50 p-4 border border-ink-150 flex items-center gap-3 text-xs text-ink-600">
                    <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
                    <span>تمامی پروژه‌ها همراه با گارانتی عملکرد، لایسنس مادام‌العمر کدها و تحویل کامل سورس گیت‌هاب تحویل داده می‌شوند.</span>
                  </div>
                </div>
              )}

              {/* STEP 3: DETAILS & FEATURES */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-ink-950">
                      مشخصات و ویژگی‌های اختصاصی پروژه:
                    </h3>
                    <span className="text-xs text-ink-400">گام ۳ از ۴</span>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-ink-900 mb-1.5">
                        عنوان یا نام برند پروژه <span className="text-accent-600">*</span>
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="مثال: کلینیک دندانپزشکی درخشان، فروشگاه مدآرت"
                        className="w-full h-11 rounded-2xl border border-ink-200 bg-white px-3.5 text-xs sm:text-sm text-ink-950 placeholder:text-ink-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-100 focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-ink-900 mb-1.5">
                        دامنه یا وب‌سایت فعلی (اختیاری)
                      </label>
                      <input
                        type="text"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        placeholder="example.com"
                        className="w-full h-11 rounded-2xl border border-ink-200 bg-white px-3.5 text-xs sm:text-sm text-ink-950 placeholder:text-ink-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-100 focus:outline-none transition-all dir-ltr text-right"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-ink-900 mb-2">
                      قابلیت‌های کلیدی مورد نیاز:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {FEATURE_CHECKBOXES.map((feat) => {
                        const checked = features.includes(feat);
                        return (
                          <div
                            key={feat}
                            onClick={() => toggleFeature(feat)}
                            className={`flex cursor-pointer items-center gap-2.5 rounded-xl border p-2.5 text-xs font-medium transition-all ${
                              checked
                                ? "border-accent-500 bg-accent-50/50 text-accent-950"
                                : "border-ink-200 bg-white text-ink-700 hover:bg-ink-50"
                            }`}
                          >
                            <div
                              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                                checked
                                  ? "border-accent-600 bg-accent-600 text-white"
                                  : "border-ink-300 bg-white"
                              }`}
                            >
                              {checked && <Check className="h-3 w-3" />}
                            </div>
                            <span className="truncate">{feat}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-ink-900 mb-1.5">
                      توضیحات تکمیلی یا نیازمندی‌های خاص:
                    </label>
                    <textarea
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="هدف اصلی از راه‌اندازی این پروژه، جامعه مخاطب هدف یا نمونه‌های مشابهی که می‌پسندید..."
                      className="w-full rounded-2xl border border-ink-200 bg-white p-3 text-xs sm:text-sm text-ink-950 placeholder:text-ink-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-100 focus:outline-none transition-all"
                    />
                  </div>
                </div>
              )}

              {/* STEP 4: BUDGET & TIMELINE */}
              {step === 4 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-ink-950">
                      برآورد بودجه و زمان‌بندی مدنظر شما:
                    </h3>
                    <span className="text-xs text-ink-400">گام ۴ از ۴</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-ink-900 mb-2">
                      محدوده بودجه سرمایه‌گذاری:
                    </label>
                    <div className="space-y-2">
                      {BUDGET_OPTIONS.map((b) => (
                        <label
                          key={b}
                          className={`flex cursor-pointer items-center justify-between rounded-2xl border p-3 text-xs font-bold transition-all ${
                            budget === b
                              ? "border-accent-600 bg-accent-50 text-accent-950"
                              : "border-ink-200 bg-white text-ink-800 hover:bg-ink-50"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <input
                              type="radio"
                              name="budget"
                              checked={budget === b}
                              onChange={() => setBudget(b)}
                              className="accent-accent-600"
                            />
                            <span>{b}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-ink-900 mb-2">
                      فوریت و بازه تحویل پروژه:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {TIMELINE_OPTIONS.map((tm) => (
                        <div
                          key={tm.id}
                          onClick={() => setTimeline(tm.label)}
                          className={`flex cursor-pointer flex-col justify-between gap-2 rounded-2xl border p-3 transition-all ${
                            timeline === tm.label
                              ? "border-accent-600 bg-accent-50/70 shadow-xs"
                              : "border-ink-200 bg-white hover:bg-ink-50"
                          }`}
                        >
                          <span className="text-[11px] font-bold text-ink-950">{tm.label}</span>
                          <span className="rounded-md bg-ink-100 px-2 py-0.5 text-[10px] font-semibold text-ink-600 w-fit">
                            {tm.tag}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Summary recap box */}
                  <div className="rounded-2xl border border-ink-150 bg-ink-50/80 p-4 space-y-2 text-xs">
                    <span className="font-bold text-ink-950 block">خلاصه سفارش:</span>
                    <div className="grid grid-cols-2 gap-2 text-ink-600">
                      <div>
                        نوع: <span className="font-bold text-ink-900">{PROJECT_TYPES.find((p) => p.id === selectedType)?.title}</span>
                      </div>
                      <div>
                        پلتفرم: <span className="font-bold text-ink-900">{TECH_OPTIONS.find((t) => t.id === selectedTech)?.name}</span>
                      </div>
                      <div>
                        عنوان: <span className="font-bold text-ink-900">{title || "نامشخص"}</span>
                      </div>
                      <div>
                        بودجه: <span className="font-bold text-ink-900">{budget}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        {!isSuccess && (
          <div className="flex items-center justify-between border-t border-ink-150 bg-ink-50/80 px-6 py-4">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((prev) => (prev - 1) as 1 | 2 | 3 | 4)}
                className="inline-flex items-center gap-1.5 rounded-2xl border border-ink-200 bg-white px-4 py-2.5 text-xs font-bold text-ink-700 hover:bg-ink-100 transition-colors"
              >
                <ArrowRight className="h-4 w-4" />
                <span>گام قبلی</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleResetAndClose}
                className="text-xs font-bold text-ink-500 hover:text-ink-800"
              >
                انصراف
              </button>
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={() => {
                  if (step === 3 && !title.trim()) {
                    alert("لطفاً عنوان پروژه را وارد کنید.");
                    return;
                  }
                  setStep((prev) => (prev + 1) as 1 | 2 | 3 | 4);
                }}
                className="inline-flex items-center gap-2 rounded-2xl bg-accent-600 px-5 py-2.5 text-xs font-bold text-white shadow-glow hover:bg-accent-700 transition-all active:scale-[0.98]"
              >
                <span>مرحله بعدی</span>
                <ArrowLeft className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinalSubmit}
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 rounded-2xl bg-accent-600 px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-glow hover:bg-accent-700 transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>در حال ثبت سفارش...</span>
                ) : (
                  <>
                    <Rocket className="h-4 w-4" />
                    <span>تایید نهایی و آغاز پروژه</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
