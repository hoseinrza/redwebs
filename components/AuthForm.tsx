"use client";

import { FormEvent, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Smartphone,
  Mail,
  Lock,
  User,
  Building,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  Eye,
  EyeOff,
  Clock,
  Terminal,
} from "lucide-react";

type AuthMethod = "otp" | "password";
type AuthMode = "login" | "signup";
type Status = "idle" | "submitting" | "otp_sent" | "success" | "error";

const inputClasses =
  "min-h-[46px] w-full rounded-2xl border border-ink-200 bg-white px-4 text-xs sm:text-sm text-ink-950 transition-all duration-200 placeholder:text-ink-400 focus:border-accent-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent-100";

export default function AuthForm() {
  const router = useRouter();
  const [authMethod, setAuthMethod] = useState<AuthMethod>("otp");
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Form values
  const [phone, setPhone] = useState("");
  const [otpCode, setOtpCode] = useState(["", "", "", "", ""]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");

  // OTP countdown timer
  const [countdown, setCountdown] = useState(120);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, countdown]);

  const startOtpTimer = () => {
    setCountdown(120);
    setIsTimerRunning(true);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) {
      val = val.slice(-1);
    }
    const newCode = [...otpCode];
    newCode[index] = val;
    setOtpCode(newCode);

    // Auto move to next input if filled
    if (val && index < 4) {
      const nextInput = document.getElementById(`otp-digit-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpCode[index] && index > 0) {
      const prevInput = document.getElementById(`otp-digit-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSendOtp = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const cleanPhone = phone.trim().replace(/\s+/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      setErrorMessage("لطفاً شماره موبایل معتبر (مثال: ۰۹۱۲۳۴۵۶۷۸۹) وارد کنید.");
      return;
    }

    setStatus("submitting");
    setTimeout(() => {
      setStatus("otp_sent");
      startOtpTimer();
    }, 600);
  };

  const handleVerifyOtp = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const fullCode = otpCode.join("");
    if (fullCode.length < 5) {
      setErrorMessage("لطفاً کد تایید ۵ رقمی ارسال‌شده را کامل وارد کنید.");
      return;
    }

    setStatus("submitting");
    setTimeout(() => {
      try {
        const clientData = {
          name: name || (authMode === "signup" ? "کارفرمای جدید" : "آرمان محمدی"),
          phone: phone || "۰۹۱۲ ۳۴۵ ۶۷۸۹",
          email: email || "customer@redwebs.ir",
          company: company || "استودیو ردوبز",
          isLoggedIn: true,
          role: "کارفرما و مالک پروژه",
        };
        window.localStorage.setItem("redwebs-customer", JSON.stringify(clientData));
      } catch {
        // ignore
      }

      setStatus("success");
      setTimeout(() => {
        router.push("/panel");
      }, 1200);
    }, 700);
  };

  const handlePasswordAuth = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !email.includes("@")) {
      setErrorMessage("لطفاً یک آدرس ایمیل کاری و معتبر وارد کنید.");
      return;
    }

    if (!password || password.length < 6) {
      setErrorMessage("رمز عبور باید حداقل ۶ کاراکتر باشد.");
      return;
    }

    if (authMode === "signup" && (!name || name.trim().length < 2)) {
      setErrorMessage("لطفاً نام و نام خانوادگی خود را کامل وارد کنید.");
      return;
    }

    setStatus("submitting");
    setTimeout(() => {
      try {
        const clientData = {
          name: name || "کارفرمای ردوبز",
          email: email,
          phone: phone || "۰۹۱۲ ۰۰۰ ۰۰۰۰",
          company: company || "سازمان همکار",
          isLoggedIn: true,
          role: "کارفرما و مالک پروژه",
        };
        window.localStorage.setItem("redwebs-customer", JSON.stringify(clientData));
      } catch {
        // ignore
      }

      setStatus("success");
      setTimeout(() => {
        router.push("/panel");
      }, 1200);
    }, 700);
  };

  const handleDemoLogin = () => {
    setStatus("submitting");
    setTimeout(() => {
      try {
        const demoClient = {
          name: "آرمان محمدی",
          email: "arman@example.com",
          phone: "۰۹۱۲ ۳۴۵ ۶۷۸۹",
          company: "موسسه بازرگانی آرامش",
          role: "کارفرمای VIP",
          isLoggedIn: true,
        };
        window.localStorage.setItem("redwebs-customer", JSON.stringify(demoClient));
      } catch {
        // ignore
      }
      setStatus("success");
      setTimeout(() => {
        router.push("/panel");
      }, 800);
    }, 500);
  };

  const handleAdminLogin = () => {
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        router.push("/admin");
      }, 600);
    }, 400);
  };

  const isSubmitting = status === "submitting";
  const isOtpStep = status === "otp_sent";

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-white p-8 sm:p-10 text-center shadow-card space-y-5 animate-in fade-in zoom-in-95 duration-300">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/25">
          <CheckCircle2 className="h-8 w-8 stroke-[2.5]" />
        </div>

        <div className="space-y-2">
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
            احراز هویت موفقیت‌آمیز
          </span>
          <h3 className="font-display text-2xl font-black text-ink-950">
            خوش آمدید! در حال انتقال به میز کار...
          </h3>
          <p className="text-xs sm:text-sm text-ink-600">
            اطلاعات کاربری با موفقیت بارگذاری شد. چند لحظه صبر کنید...
          </p>
        </div>

        <div className="flex justify-center pt-2">
          <div className="h-1.5 w-32 overflow-hidden rounded-full bg-ink-100">
            <div className="h-full w-full animate-pulse bg-accent-600 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-ink-150 bg-white shadow-card overflow-hidden">
      {/* Mode Navigation Tabs (Login / Register) */}
      <div className="border-b border-ink-150 bg-ink-50/70 p-2 sm:p-3">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => {
              setAuthMode("login");
              setStatus("idle");
              setErrorMessage("");
            }}
            className={`flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-xs sm:text-sm font-bold transition-all ${
              authMode === "login"
                ? "bg-white text-ink-950 shadow-card border border-ink-200/80"
                : "text-ink-600 hover:text-ink-950 hover:bg-white/50"
            }`}
          >
            <span>ورود به میز کار</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setAuthMode("signup");
              setStatus("idle");
              setErrorMessage("");
            }}
            className={`flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-xs sm:text-sm font-bold transition-all ${
              authMode === "signup"
                ? "bg-white text-ink-950 shadow-card border border-ink-200/80"
                : "text-ink-600 hover:text-ink-950 hover:bg-white/50"
            }`}
          >
            <span>افتتاح حساب کارفرما</span>
            <span className="hidden sm:inline-block rounded-md bg-accent-100 px-1.5 py-0.5 text-[10px] text-accent-700 font-semibold">
              جدید
            </span>
          </button>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {/* Method Toggle: OTP (SMS) vs Email/Password */}
        <div className="flex items-center justify-between border-b border-ink-100 pb-4">
          <span className="text-xs font-bold text-ink-700">روش احراز هویت:</span>
          <div className="flex items-center gap-1.5 bg-ink-100/70 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => {
                setAuthMethod("otp");
                setStatus("idle");
                setErrorMessage("");
              }}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                authMethod === "otp"
                  ? "bg-white text-accent-700 shadow-xs"
                  : "text-ink-600 hover:text-ink-950"
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span>پیامک (OTP)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setAuthMethod("password");
                setStatus("idle");
                setErrorMessage("");
              }}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                authMethod === "password"
                  ? "bg-white text-accent-700 shadow-xs"
                  : "text-ink-600 hover:text-ink-950"
              }`}
            >
              <Mail className="h-3.5 w-3.5" />
              <span>ایمیل و پسورد</span>
            </button>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* METHOD 1: OTP SMS FLOW                               */}
        {/* ---------------------------------------------------- */}
        {authMethod === "otp" && (
          <div>
            {!isOtpStep ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                {authMode === "signup" && (
                  <div>
                    <label
                      htmlFor="signup-name"
                      className="mb-1.5 block text-xs sm:text-sm font-medium text-ink-800"
                    >
                      نام و نام خانوادگی *
                    </label>
                    <div className="relative">
                      <User className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                      <input
                        id="signup-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="مثال: آرمان محمدی"
                        className={`${inputClasses} pr-10`}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="phone-input"
                    className="mb-1.5 block text-xs sm:text-sm font-medium text-ink-800 flex items-center justify-between"
                  >
                    <span>شماره موبایل کارفرما *</span>
                    <span className="text-[11px] text-ink-400">ارسال رمز یکبار مصرف</span>
                  </label>
                  <div className="relative">
                    <Smartphone className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                    <input
                      id="phone-input"
                      type="tel"
                      dir="ltr"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="۰۹۱۲ ۳۴۵ ۶۷۸۹"
                      className={`${inputClasses} pr-10 text-left font-mono`}
                    />
                  </div>
                </div>

                {authMode === "signup" && (
                  <div>
                    <label
                      htmlFor="signup-company"
                      className="mb-1.5 block text-xs sm:text-sm font-medium text-ink-800"
                    >
                      نام برند، سازمان یا شرکت (اختیاری)
                    </label>
                    <div className="relative">
                      <Building className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                      <input
                        id="signup-company"
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="مثال: شرکت بازرگانی پارس"
                        className={`${inputClasses} pr-10`}
                      />
                    </div>
                  </div>
                )}

                {errorMessage && (
                  <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex min-h-[46px] items-center justify-center gap-2 rounded-2xl bg-accent-600 px-6 py-3 text-xs sm:text-sm font-bold text-white hover:bg-accent-700 transition-colors shadow-glow disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>در حال ارسال پیامک...</span>
                  ) : (
                    <>
                      <span>دریافت کد تایید یکبار مصرف</span>
                      <ArrowLeft className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* OTP Code Input Step */
              <form onSubmit={handleVerifyOtp} className="space-y-5 animate-in fade-in duration-200">
                <div className="rounded-2xl border border-accent-150 bg-accent-50/50 p-4 text-center space-y-1.5">
                  <span className="text-xs text-accent-900 font-bold block">
                    کد تایید ۵ رقمی به شماره زیر ارسال شد:
                  </span>
                  <div className="flex items-center justify-center gap-2 font-mono font-bold text-sm text-accent-700 dir-ltr">
                    <span>{phone}</span>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="text-xs text-ink-500 hover:text-ink-900 underline font-sans"
                    >
                      (ویرایش شماره)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-center text-xs font-medium text-ink-700">
                    کد پیامک‌شده را وارد کنید:
                  </label>
                  <div className="flex justify-center gap-2.5 dir-ltr">
                    {otpCode.map((digit, idx) => (
                      <input
                        key={idx}
                        id={`otp-digit-${idx}`}
                        type="text"
                        maxLength={1}
                        inputMode="numeric"
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        className="h-12 w-12 rounded-xl border border-ink-300 text-center font-mono text-lg font-black text-ink-950 focus:border-accent-500 focus:ring-2 focus:ring-accent-200 focus:outline-none transition-all shadow-xs"
                      />
                    ))}
                  </div>
                </div>

                {/* Resend OTP Timer */}
                <div className="flex items-center justify-between text-xs text-ink-500 pt-1">
                  <span>ارسال مجدد کد:</span>
                  {countdown > 0 ? (
                    <span className="font-mono font-bold text-ink-700 flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-accent-500" />
                      <span>
                        {Math.floor(countdown / 60)}:
                        {String(countdown % 60).padStart(2, "0")}
                      </span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        startOtpTimer();
                        setErrorMessage("");
                      }}
                      className="font-bold text-accent-600 hover:text-accent-700 inline-flex items-center gap-1"
                    >
                      <RefreshCw className="h-3 w-3" />
                      <span>ارسال مجدد پیامک</span>
                    </button>
                  )}
                </div>

                {errorMessage && (
                  <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex min-h-[46px] items-center justify-center gap-2 rounded-2xl bg-accent-600 px-6 py-3 text-xs sm:text-sm font-bold text-white hover:bg-accent-700 transition-colors shadow-glow disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>در حال تایید کد...</span>
                  ) : (
                    <>
                      <span>تایید کد و ورود به پنل</span>
                      <CheckCircle2 className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* METHOD 2: EMAIL & PASSWORD FLOW                      */}
        {/* ---------------------------------------------------- */}
        {authMethod === "password" && (
          <form onSubmit={handlePasswordAuth} className="space-y-4">
            {authMode === "signup" && (
              <div>
                <label
                  htmlFor="signup-pw-name"
                  className="mb-1.5 block text-xs sm:text-sm font-medium text-ink-800"
                >
                  نام و نام خانوادگی *
                </label>
                <div className="relative">
                  <User className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                  <input
                    id="signup-pw-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثال: علی رضایی"
                    className={`${inputClasses} pr-10`}
                  />
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="email-input"
                className="mb-1.5 block text-xs sm:text-sm font-medium text-ink-800"
              >
                آدرس ایمیل سازمانی یا شخصی *
              </label>
              <div className="relative">
                <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                <input
                  id="email-input"
                  type="email"
                  dir="ltr"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className={`${inputClasses} pr-10 text-left`}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password-input"
                  className="block text-xs sm:text-sm font-medium text-ink-800"
                >
                  رمز عبور *
                </label>
                {authMode === "login" && (
                  <Link
                    href="/contact"
                    className="text-[11px] font-bold text-accent-600 hover:text-accent-700 underline"
                  >
                    فراموشی رمز عبور؟
                  </Link>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                <input
                  id="password-input"
                  type={showPassword ? "text" : "password"}
                  dir="ltr"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="حداقل ۶ کاراکتر"
                  className={`${inputClasses} pr-10 pl-10 text-left font-mono`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {authMode === "signup" && (
              <div>
                <label
                  htmlFor="company-input"
                  className="mb-1.5 block text-xs sm:text-sm font-medium text-ink-800"
                >
                  نام شرکت یا کسب‌وکار (اختیاری)
                </label>
                <div className="relative">
                  <Building className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                  <input
                    id="company-input"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="مثال: استارتاپ ویرا"
                    className={`${inputClasses} pr-10`}
                  />
                </div>
              </div>
            )}

            {errorMessage && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex min-h-[46px] items-center justify-center gap-2 rounded-2xl bg-accent-600 px-6 py-3 text-xs sm:text-sm font-bold text-white hover:bg-accent-700 transition-colors shadow-glow disabled:opacity-60"
            >
              {isSubmitting ? (
                <span>در حال ورود...</span>
              ) : (
                <>
                  <span>{authMode === "login" ? "ورود به حساب کاربری" : "تکمیل ثبت‌نام و ورود"}</span>
                  <ArrowLeft className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* ---------------------------------------------------- */}
        {/* ONE-CLICK DEMO CLIENT LOGIN                         */}
        {/* ---------------------------------------------------- */}
        <div className="pt-4 border-t border-ink-150 space-y-3">
          <div className="relative flex items-center justify-center">
            <span className="bg-white px-3 text-[11px] font-semibold text-ink-400 uppercase tracking-wider relative z-10">
              دسترسی سریع برای بررسی محیط کاربری
            </span>
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-ink-150" />
            </div>
          </div>

          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={isSubmitting}
            className="w-full flex items-center justify-between rounded-2xl border border-accent-200 bg-accent-50/60 p-3.5 text-right transition-all hover:bg-accent-100/70 hover:border-accent-300 group shadow-xs"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-600 text-white shadow-xs">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-ink-950 group-hover:text-accent-800 block">
                  ورود سریع کارفرما (بدون نیاز به ثبت‌نام)
                </span>
                <span className="text-[11px] text-ink-500 block mt-0.5">
                  مشاهده آنی داشبورد پروژه، اسپرینت‌ها، تیکت‌ها و فاکتورها
                </span>
              </div>
            </div>
            <ArrowLeft className="h-4 w-4 text-accent-600 transition-transform group-hover:-translate-x-1 shrink-0" />
          </button>

          <button
            type="button"
            onClick={handleAdminLogin}
            disabled={isSubmitting}
            className="w-full flex items-center justify-between rounded-2xl border border-ink-800 bg-ink-950 p-3.5 text-right transition-all hover:bg-ink-900 group shadow-xs text-white"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-600 text-white shadow-xs">
                <Terminal className="h-4 w-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-white group-hover:text-accent-300 block">
                  ورود به پنل تیم فنی و ادمین ارشد (Dev & CTO)
                </span>
                <span className="text-[11px] text-ink-400 block mt-0.5">
                  مانیتورینگ سرورها، کانبان اسپرینت‌ها، استقرار CI/CD و مدیریت مشتریان
                </span>
              </div>
            </div>
            <ArrowLeft className="h-4 w-4 text-accent-400 transition-transform group-hover:-translate-x-1 shrink-0" />
          </button>
        </div>

        {/* Bottom Trust & Security Banner */}
        <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-ink-400">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>اتصال امن رمزنگاری‌شده ۲۵۶ بیتی SSL · حفظ حریم خصوصی کارفرمایان</span>
        </div>
      </div>
    </div>
  );
}
