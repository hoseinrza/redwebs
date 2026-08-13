"use client";

import { FormEvent, useState } from "react";
import {
  Check,
  Send,
  Sparkles,
  Layers,
  Clock,
  Coins,
  Link as LinkIcon,
  MessageSquare,
  Building,
  CheckCircle2,
  HelpCircle,
  FileCode2,
  ShieldCheck,
  PhoneCall,
  Flame,
  ArrowLeft,
} from "lucide-react";
import { ApiResponse, ServiceInterest } from "@/lib/types";

type FormMode = "custom_order" | "quick_inquiry";
type Status = "idle" | "submitting" | "success" | "error";

const PROJECT_TYPES = [
  {
    id: "webapp_saas",
    title: "وب‌اپلیکیشن اختصاصی و پلتفرم ابری (SaaS)",
    desc: "Next.js / Node.js با معماری مقیاس‌پذیر و دیتابیس اختصاصی",
    serviceInterest: "سفارش پروژه خاص و وب‌اپلیکیشن" as ServiceInterest,
    badge: "پرفروش‌ترین سفارش خاص",
  },
  {
    id: "portal_lms",
    title: "پرتال سازمانی، سامانه آموزشی (LMS) یا نوبت‌دهی",
    desc: "داشبورد کاربران، پنل پرسنل، تقویم رزرو و آزمون‌ساز",
    serviceInterest: "طراحی پلتفرم / پرتال سازمانی" as ServiceInterest,
    badge: "تخصصی و چندکاربره",
  },
  {
    id: "custom_ecommerce",
    title: "فروشگاه آنلاین پیشرفته و کاستوم",
    desc: "ووکامرس اختصاصی یا Headless Commerce با سیستم انبارداری و پست",
    serviceInterest: "کدنویسی اختصاصی" as ServiceInterest,
    badge: "فروش بی‌وقفه",
  },
  {
    id: "redesign_speed",
    title: "بازطراحی جامع، کدنویسی مجدد و ارتقای سرعت",
    desc: "مهاجرت از قالب‌های سنگین به کد تمیز با لود زیر ۱ ثانیه",
    serviceInterest: "بازطراحی و ارتقای سرعت" as ServiceInterest,
    badge: "افزایش فروش",
  },
  {
    id: "startup_mvp",
    title: "ایده استارتاپی و پروتوتایپ سریع (MVP)",
    desc: "پیاده‌سازی سریع نسخه اولیه برای جذب سرمایه و تست بازار",
    serviceInterest: "ایده استارتاپی و SaaS" as ServiceInterest,
    badge: "توسعه سریع",
  },
];

const SPECIAL_FEATURES = [
  "احراز هویت پیامکی (OTP بدون رمز عبور)",
  "درگاه پرداخت آنلاین و تسویه خودکار",
  "داشبورد مدیریت و سطوح دسترسی چندگانه",
  "اتصال به وب‌سرویس نرم‌افزار حسابداری/انبارداری",
  "اتصال به سامانه‌های پیامکی و اعلان هوشمند",
  "اپلیکیشن وب نصب‌شونده روی گوشی (PWA)",
  "سیستم محافظت از کپی‌رایت ویدیو و HLS Streaming",
  "طراحی هویت بصری و دیزاین‌سیستم Figma اختصاصی",
  "سئوی تکنیکال عمیق و لود زیر ۱.۲ ثانیه",
  "محاسبه‌گر آنلاین اختصاصی یا سیستم استعلام قیمت",
];

const BUDGET_RANGES = [
  "پایه و بهینه‌سازی (زیر ۳۰ میلیون تومان)",
  "پروژه استاندارد شرکتی / فروشگاهی (۳۰ تا ۶۰ میلیون تومان)",
  "پروژه جامع و اختصاصی (۶۰ تا ۱۲۰ میلیون تومان)",
  "انترپرایز و پلتفرم مقیاس بالا (+۱۲۰ میلیون تومان)",
  "نیاز به بررسی نیازمندی‌ها و برآورد تخصصی توسط ردوبز",
];

const TIMELINE_OPTIONS = [
  "فوری (کمتر از ۳ هفته)",
  "معمول و استاندارد (۳ تا ۶ هفته)",
  "پروژه فازبندی‌شده / منعطف",
];

const inputClasses =
  "min-h-[44px] w-full rounded-2xl border border-ink-200 bg-white px-4 text-xs sm:text-sm text-ink-950 transition-all duration-200 placeholder:text-ink-400 focus:border-accent-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent-100";

export default function ContactForm() {
  const [mode, setMode] = useState<FormMode>("custom_order");
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const [trackingCode, setTrackingCode] = useState("");

  // Custom order form state
  const [selectedProjectType, setSelectedProjectType] = useState(PROJECT_TYPES[0].id);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    "احراز هویت پیامکی (OTP بدون رمز عبور)",
    "داشبورد مدیریت و سطوح دسترسی چندگانه",
  ]);
  const [selectedBudget, setSelectedBudget] = useState(BUDGET_RANGES[1]);
  const [selectedTimeline, setSelectedTimeline] = useState(TIMELINE_OPTIONS[1]);

  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    );
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setFeedback("");

    const form = event.currentTarget;
    const isCustom = mode === "custom_order";

    let payloadServiceInterest: ServiceInterest = "سفارش پروژه خاص و وب‌اپلیکیشن";
    if (isCustom) {
      const p = PROJECT_TYPES.find((pt) => pt.id === selectedProjectType);
      if (p) payloadServiceInterest = p.serviceInterest;
    } else {
      payloadServiceInterest = (
        form.elements.namedItem("serviceInterest") as HTMLSelectElement
      ).value as ServiceInterest;
    }

    const payload = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement)?.value || "",
      organization: (form.elements.namedItem("organization") as HTMLInputElement)?.value || "",
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      serviceInterest: payloadServiceInterest,
      isCustomOrder: isCustom,
      projectType: isCustom
        ? PROJECT_TYPES.find((pt) => pt.id === selectedProjectType)?.title
        : undefined,
      customFeatures: isCustom ? selectedFeatures : undefined,
      budgetRange: isCustom ? selectedBudget : undefined,
      timeline: isCustom ? selectedTimeline : undefined,
      referenceUrl: (form.elements.namedItem("referenceUrl") as HTMLInputElement)?.value || "",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result: ApiResponse = await res.json();

      if (!result.success) {
        setStatus("error");
        setFeedback(result.error);
        return;
      }

      const randomCode = `RB-${Math.floor(100000 + Math.random() * 900000)}`;
      setTrackingCode(randomCode);
      setStatus("success");
      setFeedback(result.message);
      form.reset();
    } catch {
      setStatus("error");
      setFeedback("ارتباط با سرور برقرار نشد. لطفاً اتصال اینترنت خود را بررسی کنید.");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-3xl border border-emerald-200 bg-white p-8 sm:p-10 text-center shadow-card space-y-6"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
          <Check className="h-8 w-8 stroke-[3]" />
        </div>

        <div className="space-y-2">
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
            درخواست با موفقیت دریافت و ثبت شد
          </span>
          <h3 className="font-display text-2xl font-black text-ink-950">
            اطلاعات سفارش شما به دست تیم فنی ردوبز رسید!
          </h3>
          <p className="text-sm text-ink-600 max-w-md mx-auto leading-relaxed">
            {feedback || "کارشناس ارشد فنی ما پس از بررسی دقیق نیازمندی‌ها، حداکثر تا ۲ ساعت آینده با شما تماس خواهد گرفت."}
          </p>
        </div>

        {/* Tracking info pill */}
        <div className="rounded-2xl border border-ink-150 bg-ink-50 p-5 max-w-md mx-auto text-right space-y-3">
          <div className="flex items-center justify-between text-xs border-b border-ink-200 pb-2.5">
            <span className="text-ink-500">شماره پیگیری سفارش:</span>
            <span className="font-mono font-bold text-ink-950 text-sm">{trackingCode}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-ink-500">حداکثر زمان پاسخگویی:</span>
            <span className="font-bold text-emerald-700">امروز تا ساعت ۱۸:۰۰</span>
          </div>
        </div>

        {/* Action steps */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-ink-950 px-5 py-3 text-xs font-bold text-white hover:bg-accent-600 transition-colors"
          >
            <span>ثبت درخواست یا سفارش دیگر</span>
          </button>
          <a
            href="https://t.me/redwebs_support"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-ink-200 bg-white px-5 py-3 text-xs font-bold text-ink-800 hover:bg-ink-50 transition-colors"
          >
            <span>ارتباط فوری در تلگرام</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-ink-150 bg-white shadow-card overflow-hidden">
      {/* Mode Switcher Tabs Header */}
      <div className="border-b border-ink-150 bg-ink-50/70 p-2 sm:p-3">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setMode("custom_order")}
            className={`relative flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-xs sm:text-sm font-bold transition-all ${
              mode === "custom_order"
                ? "bg-white text-ink-950 shadow-card border border-ink-200/80"
                : "text-ink-600 hover:text-ink-950 hover:bg-white/50"
            }`}
          >
            <Sparkles className="h-4 w-4 text-accent-500" />
            <span>سفارش پروژه اختصاصی و خاص</span>
            <span className="hidden md:inline-block rounded-md bg-accent-100/80 px-1.5 py-0.5 text-[10px] text-accent-700 font-semibold">
              پیشنهادی
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMode("quick_inquiry")}
            className={`relative flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-xs sm:text-sm font-bold transition-all ${
              mode === "quick_inquiry"
                ? "bg-white text-ink-950 shadow-card border border-ink-200/80"
                : "text-ink-600 hover:text-ink-950 hover:bg-white/50"
            }`}
          >
            <MessageSquare className="h-4 w-4 text-ink-500" />
            <span>پیام عمومی و مشاوره سریع</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-9 space-y-8">
        {mode === "custom_order" ? (
          /* ========================================================================= */
          /* CUSTOM / ENTERPRISE ORDER FLOW */
          /* ========================================================================= */
          <>
            {/* Step 1: Project Type Selection Cards */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs sm:text-sm font-bold text-ink-950 flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-500 text-[11px] font-black text-white">
                    ۱
                  </span>
                  <span>نوع و دسته‌بندی پروژه شما چیست؟</span>
                </label>
                <span className="text-[11px] text-ink-400">یک گزینه را انتخاب کنید</span>
              </div>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {PROJECT_TYPES.map((pt) => {
                  const isSelected = selectedProjectType === pt.id;
                  return (
                    <button
                      key={pt.id}
                      type="button"
                      onClick={() => setSelectedProjectType(pt.id)}
                      className={`text-right rounded-2xl border p-4 transition-all duration-200 flex flex-col justify-between ${
                        isSelected
                          ? "border-accent-500 bg-accent-50/40 ring-2 ring-accent-100 shadow-xs"
                          : "border-ink-200 bg-white hover:border-ink-300 hover:bg-ink-50/40"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span
                            className={`text-xs font-bold leading-snug ${
                              isSelected ? "text-accent-800" : "text-ink-900"
                            }`}
                          >
                            {pt.title}
                          </span>
                          <span
                            className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected
                                ? "border-accent-600 bg-accent-600 text-white"
                                : "border-ink-300 bg-white"
                            }`}
                          >
                            {isSelected && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                          </span>
                        </div>
                        <p className="text-[11.5px] leading-relaxed text-ink-500">
                          {pt.desc}
                        </p>
                      </div>
                      <span className="mt-2 text-[10px] font-bold text-accent-600 inline-block">
                        {pt.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Special Features & Modules Checklist */}
            <div className="space-y-3 pt-6 border-t border-ink-150">
              <div className="flex items-center justify-between">
                <label className="text-xs sm:text-sm font-bold text-ink-950 flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-500 text-[11px] font-black text-white">
                    ۲
                  </span>
                  <span>کدام امکانات و نیازمندی‌های خاص مد نظرتان است؟</span>
                </label>
                <span className="text-[11px] text-ink-400">انتخاب چندگانه</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SPECIAL_FEATURES.map((feature) => {
                  const checked = selectedFeatures.includes(feature);
                  return (
                    <button
                      key={feature}
                      type="button"
                      onClick={() => toggleFeature(feature)}
                      className={`flex items-center gap-2.5 rounded-xl border p-3 text-right transition-all text-xs font-medium ${
                        checked
                          ? "border-accent-400 bg-accent-50/50 text-accent-950 font-bold"
                          : "border-ink-200 bg-white text-ink-700 hover:border-ink-300"
                      }`}
                    >
                      <span
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                          checked
                            ? "border-accent-600 bg-accent-600 text-white"
                            : "border-ink-300 bg-white"
                        }`}
                      >
                        {checked && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                      </span>
                      <span className="truncate">{feature}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Budget Range & Desired Timeline */}
            <div className="space-y-4 pt-6 border-t border-ink-150">
              <label className="text-xs sm:text-sm font-bold text-ink-950 flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-500 text-[11px] font-black text-white">
                  ۳
                </span>
                <span>بازه بودجه تقریبی و زمان‌بندی مد نظر</span>
              </label>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <span className="text-xs font-medium text-ink-600 mb-1.5 block flex items-center gap-1.5">
                    <Coins className="h-3.5 w-3.5 text-accent-500" />
                    <span>بودجه برآوردی شما:</span>
                  </span>
                  <select
                    value={selectedBudget}
                    onChange={(e) => setSelectedBudget(e.target.value)}
                    className={inputClasses}
                  >
                    {BUDGET_RANGES.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <span className="text-xs font-medium text-ink-600 mb-1.5 block flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-accent-500" />
                    <span>زمان‌بندی تحویل مورد نظر:</span>
                  </span>
                  <select
                    value={selectedTimeline}
                    onChange={(e) => setSelectedTimeline(e.target.value)}
                    className={inputClasses}
                  >
                    {TIMELINE_OPTIONS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Step 4: Reference URL & Project Scope Details */}
            <div className="space-y-4 pt-6 border-t border-ink-150">
              <label className="text-xs sm:text-sm font-bold text-ink-950 flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-500 text-[11px] font-black text-white">
                  ۴
                </span>
                <span>شرح اهداف تجاری و جزئیات پروژه</span>
              </label>

              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-xs font-medium text-ink-700"
                >
                  توضیحات پروژه، اهداف یا چالش‌های فعلی کسب‌وکار *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  minLength={10}
                  rows={4}
                  placeholder="مثال: می‌خواهیم پلتفرم اختصاصی برای اتصال تکنسین‌ها به مشتریان طراحی کنیم با قابلیت پرداخت درگاه و پنل ارسال پیامک..."
                  className={`${inputClasses} min-h-0 py-3 leading-relaxed`}
                />
              </div>

              <div>
                <label
                  htmlFor="referenceUrl"
                  className="mb-1.5 block text-xs font-medium text-ink-700 flex items-center justify-between"
                >
                  <span className="flex items-center gap-1">
                    <LinkIcon className="h-3.5 w-3.5 text-ink-400" />
                    <span>لینک وب‌سایت فعلی، طرح فیگما یا رفرنس خارجی (اختیاری)</span>
                  </span>
                  <span className="text-[11px] text-ink-400">مثال: figma.com/file/... یا آدرس سایت</span>
                </label>
                <input
                  id="referenceUrl"
                  name="referenceUrl"
                  type="text"
                  placeholder="https://..."
                  dir="ltr"
                  className={inputClasses}
                />
              </div>
            </div>

            {/* Step 5: Contact Credentials */}
            <div className="space-y-4 pt-6 border-t border-ink-150">
              <label className="text-xs sm:text-sm font-bold text-ink-950 flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-500 text-[11px] font-black text-white">
                  ۵
                </span>
                <span>اطلاعات تماس جهت هماهنگی و ارسال پیش‌فاکتور</span>
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="نام و نام خانوادگی"
                  name="name"
                  type="text"
                  required
                  placeholder="مثال: علی محمدی"
                />
                <Field
                  label="شماره موبایل جهت هماهنگی و واتساپ/تلگرام"
                  name="phone"
                  type="tel"
                  required
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="ایمیل سازمانی / کاری"
                  name="email"
                  type="email"
                  required
                  placeholder="name@company.com"
                />
                <Field
                  label="نام برند، استارتاپ یا سازمان (اختیاری)"
                  name="organization"
                  type="text"
                  placeholder="مثال: شرکت تجارت نوین"
                />
              </div>
            </div>
          </>
        ) : (
          /* ========================================================================= */
          /* QUICK INQUIRY / GENERAL MESSAGE FLOW */
          /* ========================================================================= */
          <div className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="نام و نام خانوادگی"
                name="name"
                type="text"
                required
                placeholder="نام شما"
              />
              <Field
                label="شماره تماس (ترجیحاً دارای پیام‌رسان)"
                name="phone"
                type="tel"
                placeholder="۰۹۱۲..."
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="ایمیل"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
              />

              <div>
                <label
                  htmlFor="serviceInterest"
                  className="mb-1.5 block text-xs sm:text-sm font-medium text-ink-800"
                >
                  موضوع درخواست یا پکیج مد نظر
                </label>
                <select
                  id="serviceInterest"
                  name="serviceInterest"
                  required
                  defaultValue="مشاوره و بررسی هر دو"
                  className={inputClasses}
                >
                  <option value="مشاوره و بررسی هر دو">مشاوره رایگان انتخاب مسیر فنی</option>
                  <option value="وردپرس">پکیج‌های طراحی وردپرس (WordPress / WooCommerce)</option>
                  <option value="کدنویسی اختصاصی">کدنویسی اختصاصی وب‌سایت (Next.js)</option>
                  <option value="سفارش پروژه خاص و وب‌اپلیکیشن">سفارش پلتفرم اختصاصی و وب‌اپ</option>
                  <option value="بازطراحی و ارتقای سرعت">بهینه‌سازی سرعت و سئوی سایت موجود</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-1.5 block text-xs sm:text-sm font-medium text-ink-800"
              >
                متن پیام یا سوال شما *
              </label>
              <textarea
                id="message"
                name="message"
                required
                minLength={10}
                rows={4}
                placeholder="سوال یا جزئیات درخواست خود را بنویسید..."
                className={`${inputClasses} min-h-0 py-3 leading-relaxed`}
              />
            </div>
          </div>
        )}

        {/* Error Feedback */}
        {status === "error" && (
          <div
            role="alert"
            className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-medium text-rose-800"
          >
            {feedback}
          </div>
        )}

        {/* Bottom Actions & Trust Statement */}
        <div className="pt-6 border-t border-ink-150 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full sm:w-auto inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-accent-600 px-8 py-3.5 text-xs sm:text-sm font-bold text-white transition-all duration-200 hover:bg-accent-700 active:scale-[0.98] shadow-glow disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting" ? (
              <span>در حال ارسال اطلاعات...</span>
            ) : (
              <>
                <span>
                  {mode === "custom_order"
                    ? "ثبت سفارش خاص و درخواست پیش‌فاکتور"
                    : "ارسال پیام مشاوره"}
                </span>
                <Send className="h-4 w-4" />
              </>
            )}
          </button>

          <div className="flex items-center gap-2 text-[11px] text-ink-500">
            <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>اطلاعات و ایده‌های شما محفوظ و محرمانه تلقی می‌شوند (تضمین NDA)</span>
          </div>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type,
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-xs sm:text-sm font-medium text-ink-800">
        {label} {required && <span className="text-accent-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className={inputClasses}
      />
    </div>
  );
}
