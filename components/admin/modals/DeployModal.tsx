"use client";

import { useState, useEffect } from "react";
import { X, Play, RefreshCw, CheckCircle2, Server, Terminal, ShieldAlert, Cpu } from "lucide-react";

interface DeployModalProps {
  isOpen: boolean;
  serverName: string;
  environment: "production" | "staging" | "edge";
  onClose: () => void;
  onDeployCompleted: () => void;
}

export default function DeployModal({
  isOpen,
  serverName,
  environment,
  onClose,
  onDeployCompleted,
}: DeployModalProps) {
  const [step, setStep] = useState<"confirm" | "building" | "testing" | "migrating" | "done">("confirm");
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setStep("confirm");
      setLogs([]);
      setProgress(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  function runDeployment() {
    setStep("building");
    setLogs(["[CI/CD Engine] Triggering pipeline via GitHub Actions Webhook..."]);
    setProgress(15);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        "[Docker] Pulling base image node:20-alpine (Layer cache: 94% hit)",
        "[Next.js] Running `next build --experimental-build-mode=standalone`",
        "[Bundle] Optimized 42 route chunks · Total size 184kB gzipped",
      ]);
      setStep("testing");
      setProgress(45);
    }, 1200);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        "[Jest & Playwright] Running automated E2E & unit tests...",
        "✔ 48 test suites passed, 0 failures, 100% assertions green",
        "[PostgreSQL] Checking database schema migrations against master branch...",
        "✔ No pending unapplied DDL migrations found",
      ]);
      setStep("migrating");
      setProgress(80);
    }, 2400);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        "[Kubernetes] Performing Zero-Downtime Rolling Update on cluster pods...",
        "[Edge CDN] Purging stale cached static assets on 12 global edge nodes...",
        "✔ Container health probe responded HTTP 200 OK in 12ms",
        "🚀 Deployment v3.4.2 Successfully Released to Production & Staging!",
      ]);
      setStep("done");
      setProgress(100);
      onDeployCompleted();
    }, 3800);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/75 backdrop-blur-xs font-sans animate-fade-in" dir="rtl">
      <div className="relative w-full max-w-xl rounded-3xl bg-ink-950 border border-ink-800 text-white shadow-2xl overflow-hidden animate-scale-up">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-ink-800/80 px-6 py-4 bg-ink-900/60">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-600 text-white shadow-xs">
              <Server className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-white">پایپ‌لاین استقرار و بیلد سرور (CI/CD)</h3>
              <p className="text-[11px] text-ink-400 font-mono dir-ltr text-right">{serverName}</p>
            </div>
          </div>

          {step === "done" || step === "confirm" ? (
            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-xl text-ink-400 hover:bg-ink-800 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5">
          {step === "confirm" ? (
            <div className="space-y-4 text-center sm:text-right">
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-amber-200 text-xs flex items-start gap-3">
                <ShieldAlert className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold">استقرار زنده روی محیط: {environment === "production" ? "پروداکشن نهایی (Production)" : "استیجینگ تستی (Staging)"}</p>
                  <p className="text-[11.5px] leading-relaxed text-amber-200/80">
                    این فرآیند کانتینرهای جدید را کامپایل کرده، تست‌های کیفی و امنیتی را اجرا و به صورت بدون قطعی (Rolling Update) روی کلاستر توزیع می‌نماید.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl border border-ink-800 bg-ink-900/50 p-3">
                  <span className="text-ink-400 block text-[11px]">شاخه گیت هدف:</span>
                  <span className="font-mono text-emerald-400 font-bold">origin/main (SHA: 8fa23d9)</span>
                </div>
                <div className="rounded-xl border border-ink-800 bg-ink-900/50 p-3">
                  <span className="text-ink-400 block text-[11px]">استراتژی استقرار:</span>
                  <span className="text-white font-bold">Zero-Downtime Rollout</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-ink-700 text-ink-300 text-xs font-bold hover:bg-ink-800 transition-colors"
                >
                  انصراف
                </button>
                <button
                  type="button"
                  onClick={runDeployment}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-600 text-white text-xs font-bold hover:bg-accent-700 shadow-glow transition-all active:scale-95"
                >
                  <Play className="h-4 w-4" />
                  <span>شروع استقرار پایپ‌لاین (Deploy Now)</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-ink-300 font-bold flex items-center gap-2">
                    {step !== "done" && <RefreshCw className="h-3.5 w-3.5 animate-spin text-accent-500" />}
                    {step === "building" && "در حال ساخت ایمیج‌های داکر و کامپایل کدهای Next.js..."}
                    {step === "testing" && "در حال اجرای تست‌های خودکار و اعتبارسنجی اسکیما..."}
                    {step === "migrating" && "در حال انتقال ترافیک زنده و رول‌اوت پادهای کوبرنتیز..."}
                    {step === "done" && "عملیات بیلد و استقرار با موفقیت پایان یافت."}
                  </span>
                  <span className="font-mono text-accent-400 font-bold">{progress}٪</span>
                </div>
                <div className="h-2 w-full rounded-full bg-ink-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-accent-600 via-amber-500 to-emerald-500 transition-all duration-300 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Terminal Logs View */}
              <div className="rounded-2xl border border-ink-800 bg-ink-950 p-4 font-mono text-[11px] text-ink-300 space-y-1.5 max-h-56 overflow-y-auto dir-ltr text-left">
                {logs.map((line, idx) => (
                  <p
                    key={idx}
                    className={
                      line.startsWith("✔") || line.startsWith("🚀")
                        ? "text-emerald-400 font-bold"
                        : line.startsWith("[Docker]") || line.startsWith("[Next.js]")
                        ? "text-sky-300"
                        : "text-ink-400"
                    }
                  >
                    {line}
                  </p>
                ))}
              </div>

              {step === "done" && (
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>سرویس در دسترس و پایدار است.</span>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl bg-ink-800 text-white text-xs font-bold hover:bg-ink-700 transition-colors"
                  >
                    بستن پنجره
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
