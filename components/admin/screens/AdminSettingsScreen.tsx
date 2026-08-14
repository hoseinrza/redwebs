"use client";

import { useState } from "react";
import {
  Key,
  Shield,
  Webhook,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Eye,
  EyeOff,
  Copy,
} from "lucide-react";

export default function AdminSettingsScreen() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [twoFactorRequired, setTwoFactorRequired] = useState(true);
  const [rateLimitEnabled, setRateLimitEnabled] = useState(true);
  const [showSecret, setShowSecret] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");

  function handleSave() {
    setSavedMsg("تنظیمات امنیتی، وب‌هوک‌ها و پارامترهای سرور با موفقیت ذخیره و اعمال شد.");
    setTimeout(() => setSavedMsg(""), 4000);
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 animate-fade-in font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-ink-200 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-accent-600" />
            <h1 className="text-xl sm:text-2xl font-black text-ink-950">پیکربندی سیستم، کلیدهای API و امنیت</h1>
          </div>
          <p className="text-xs sm:text-sm text-ink-500">
            تنظیم وب‌هوک‌های گیت‌هاب و زرین‌پال، مدیریت متغیرهای محیطی و امنیت دسترسی پنل
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-accent-600 text-white text-xs sm:text-sm font-bold hover:bg-accent-700 shadow-glow transition-all active:scale-95 shrink-0"
        >
          <CheckCircle2 className="h-4 w-4" />
          <span>ذخیره کلیه تغییرات</span>
        </button>
      </div>

      {savedMsg && (
        <div className="flex items-center gap-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-xs font-bold text-emerald-800 animate-fade-in">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{savedMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Security & Access Controls */}
        <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 border-b border-ink-150 pb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent-50 text-accent-600 text-xs font-bold">
              <Shield className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-ink-950">کنترل‌های امنیتی و دسترسی</h2>
              <p className="text-[11px] text-ink-500">حفاظت از پایگاه داده و جلوگیری از حملات Brute Force</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* 2FA switch */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-ink-50 border border-ink-150">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-ink-950 block">احراز هویت دو مرحله‌ای (2FA) برای تیم فنی</span>
                <span className="text-[11px] text-ink-500">الزام ورود با توکن TOTP و پیامک برای دسترسی ادمین</span>
              </div>
              <input
                type="checkbox"
                checked={twoFactorRequired}
                onChange={(e) => setTwoFactorRequired(e.target.checked)}
                className="h-5 w-5 rounded-md accent-accent-600 cursor-pointer"
              />
            </div>

            {/* Rate Limiting */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-ink-50 border border-ink-150">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-ink-950 block">سامانه ضد اسپم و محدودسازی Rate Limiting</span>
                <span className="text-[11px] text-ink-500">حداکثر ۵ درخواست OTP در هر ۱۰ دقیقه برای هر IP</span>
              </div>
              <input
                type="checkbox"
                checked={rateLimitEnabled}
                onChange={(e) => setRateLimitEnabled(e.target.checked)}
                className="h-5 w-5 rounded-md accent-accent-600 cursor-pointer"
              />
            </div>

            {/* Maintenance Mode */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-ink-50 border border-ink-150">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-ink-950 block">حالت نگهداری سیستم (Maintenance Mode)</span>
                <span className="text-[11px] text-ink-500">هدایت تمام کاربران عمومی به صفحه ارتقای زیرساخت</span>
              </div>
              <input
                type="checkbox"
                checked={maintenanceMode}
                onChange={(e) => setMaintenanceMode(e.target.checked)}
                className="h-5 w-5 rounded-md accent-rose-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Webhooks & Integrations */}
        <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 border-b border-ink-150 pb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-50 text-sky-600 text-xs font-bold">
              <Webhook className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-ink-950">وب‌هوک‌ها و ارتباطات یکپارچه (Integrations)</h2>
              <p className="text-[11px] text-ink-500">سرویس‌های متصل به پایپ‌لاین ردوبز</p>
            </div>
          </div>

          <div className="space-y-3.5">
            {/* GitHub Actions Webhook */}
            <div className="p-3.5 rounded-2xl bg-ink-50 border border-ink-150 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-ink-900">GitHub CI/CD Webhook</span>
                <span className="rounded-md bg-emerald-50 text-emerald-700 px-2 py-0.5 text-[10px] font-bold border border-emerald-200">
                  متصل و فعال
                </span>
              </div>
              <p className="text-[11px] text-ink-500 font-mono dir-ltr text-left">
                https://api.redwebs.ir/v1/webhooks/github-actions
              </p>
            </div>

            {/* ZarinPal Payment Gateway */}
            <div className="p-3.5 rounded-2xl bg-ink-50 border border-ink-150 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-ink-900">درگاه پرداخت زرین‌پال (ZarinPal Merchant ID)</span>
                <span className="rounded-md bg-emerald-50 text-emerald-700 px-2 py-0.5 text-[10px] font-bold border border-emerald-200">
                  تراکنش فعال
                </span>
              </div>
              <p className="text-[11px] text-ink-500 font-mono dir-ltr text-left">
                Merchant Key: zrn_live_948271038472910482019482
              </p>
            </div>

            {/* SMS Provider */}
            <div className="p-3.5 rounded-2xl bg-ink-50 border border-ink-150 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-ink-900">سامانه پیامکی کاوه‌نگار (OTP Gateway)</span>
                <span className="rounded-md bg-emerald-50 text-emerald-700 px-2 py-0.5 text-[10px] font-bold border border-emerald-200">
                  ارسال سریع خط خدماتی
                </span>
              </div>
              <p className="text-[11px] text-ink-500 font-mono dir-ltr text-left">
                خط اختصاصی ۱۰۰۰۸۸۴۵ · اعتبار شارژ: ۲,۴۰۰,۰۰۰ پیامک
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
