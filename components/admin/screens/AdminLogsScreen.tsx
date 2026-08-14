"use client";

import { useState, useEffect } from "react";
import {
  Terminal,
  Play,
  Pause,
  Trash2,
  Download,
  Filter,
  Search,
  CheckCircle2,
  AlertTriangle,
  Info,
  XCircle,
  Copy,
} from "lucide-react";
import { SystemLogEntry, systemLogEntries as initialLogs } from "@/lib/data/admin";
import { toFa } from "@/lib/format";

export default function AdminLogsScreen() {
  const [logs, setLogs] = useState<SystemLogEntry[]>(initialLogs);
  const [isStreaming, setIsStreaming] = useState(true);
  const [filterLevel, setFilterLevel] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);

  // Simulate real-time logs incoming if streaming is true
  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(() => {
      const services: SystemLogEntry["service"][] = [
        "auth-engine",
        "k8s-cluster",
        "billing-api",
        "deploy-bot",
        "db-pg",
        "redis-cache",
      ];
      const levels: SystemLogEntry["level"][] = ["info", "success", "info", "success", "warn"];
      const messages = [
        "درخواست API GET /v1/projects با تاخیر ۱۸ میلی‌ثانیه پاسخ داده شد",
        "بررسی سلامت پادها توسط کوبرنتیز (Health Probe Liveness OK)",
        "کوئری بهینه‌شده به جدول فاکتورها در ۲ میلی‌ثانیه از حافظه ردیس کش شد",
        "همگام‌سازی وب‌هوک وضعیت دامنه‌های استیجینگ کلینیک آرامش",
        "دریافت لاگ تراکنش موفق از سوئیچ بانکی شاپرک",
        "پایش اتصال استریم WebRTC برای اتاق جلسات آنلاین — پایداری ۹۹.۹٪",
      ];

      const randomService = services[Math.floor(Math.random() * services.length)];
      const randomLevel = levels[Math.floor(Math.random() * levels.length)];
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(
        now.getMinutes()
      ).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

      const newLog: SystemLogEntry = {
        id: `log-${Date.now()}`,
        timestamp: timeStr,
        level: randomLevel,
        service: randomService,
        message: randomMsg,
        statusCode: randomLevel === "warn" ? 429 : 200,
      };

      setLogs((prev) => [newLog, ...prev.slice(0, 50)]);
    }, 4500);

    return () => clearInterval(interval);
  }, [isStreaming]);

  const filteredLogs = logs.filter((log) => {
    const matchesLevel = filterLevel === "all" || log.level === filterLevel;
    const matchesSearch =
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.service.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  function handleCopyAll() {
    const text = filteredLogs
      .map((l) => `[${l.timestamp}] [${l.level.toUpperCase()}] [${l.service}] ${l.message}`)
      .join("\n");
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 animate-fade-in font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-ink-200 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-xl sm:text-2xl font-black text-ink-950">کنسول لاگ‌های زنده و دیباگ سیستم</h1>
          </div>
          <p className="text-xs sm:text-sm text-ink-500">
            ردیابی رویدادهای سرور، احراز هویت، پیام‌های گیت‌وی پرداخت و خطاهای کلاستر به صورت Real-time
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsStreaming(!isStreaming)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              isStreaming
                ? "bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100"
                : "bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100"
            }`}
          >
            {isStreaming ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            <span>{isStreaming ? "توقف استریم" : "ادامه استریم زنده"}</span>
          </button>

          <button
            type="button"
            onClick={handleCopyAll}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-ink-200 bg-white text-xs font-bold text-ink-700 hover:bg-ink-50 transition-colors"
          >
            <Copy className="h-3.5 w-3.5" />
            <span>{copied ? "کپی شد!" : "کپی همه لاگ‌ها"}</span>
          </button>

          <button
            type="button"
            onClick={() => setLogs([])}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-ink-200 bg-white text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>پاکسازی</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-3xl border border-ink-200 shadow-xs">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="فیلتر بر اساس متن پیام، سرویس، یا کد خطا..."
            className="w-full h-10 pr-10 pl-4 rounded-xl border border-ink-200 text-xs sm:text-sm focus:border-accent-600 focus:ring-2 focus:ring-accent-100 outline-none"
          />
        </div>

        <select
          value={filterLevel}
          onChange={(e) => setFilterLevel(e.target.value)}
          className="h-10 px-3 rounded-xl border border-ink-200 text-xs bg-white focus:border-accent-600 outline-none"
        >
          <option value="all">همه سطوح (All Levels)</option>
          <option value="success">فقط موفق (Success)</option>
          <option value="info">فقط اطلاعاتی (Info)</option>
          <option value="warn">فقط هشدارها (Warnings)</option>
          <option value="error">فقط خطاها (Errors)</option>
        </select>
      </div>

      {/* Terminal View Container */}
      <div className="rounded-3xl border border-ink-800 bg-ink-950 text-white p-6 shadow-2xl space-y-3 font-mono">
        <div className="flex items-center justify-between border-b border-ink-800/80 pb-3 text-xs text-ink-400">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-accent-500" />
            <span>system-cluster-event-stream [Active: {toFa(filteredLogs.length)} events]</span>
          </div>
          <span className="text-[11px]">Buffer: 50 max in-memory</span>
        </div>

        <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
          {filteredLogs.length === 0 ? (
            <div className="py-12 text-center text-xs text-ink-500">
              موردی مطابق با فیلترها یافت نشد.
            </div>
          ) : (
            filteredLogs.map((log) => {
              const isSuccess = log.level === "success";
              const isWarn = log.level === "warn";
              const isError = log.level === "error";

              return (
                <div
                  key={log.id}
                  className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 p-3 rounded-xl bg-ink-900/60 border border-ink-800/60 text-xs hover:bg-ink-900 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-ink-500 shrink-0 font-bold">[{toFa(log.timestamp)}]</span>
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase shrink-0 ${
                        isSuccess
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : isWarn
                          ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          : isError
                          ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                          : "bg-sky-500/20 text-sky-400 border border-sky-500/30"
                      }`}
                    >
                      {log.service}
                    </span>
                    <p
                      className={`leading-relaxed dir-rtl text-right font-sans sm:font-mono text-xs ${
                        isSuccess
                          ? "text-emerald-300"
                          : isWarn
                          ? "text-amber-300"
                          : isError
                          ? "text-rose-300 font-bold"
                          : "text-ink-200"
                      }`}
                    >
                      {log.message}
                    </p>
                  </div>

                  {log.statusCode && (
                    <span
                      className={`font-mono text-[11px] font-bold shrink-0 self-end sm:self-auto ${
                        log.statusCode >= 400 ? "text-rose-400" : "text-emerald-400"
                      }`}
                    >
                      HTTP {toFa(log.statusCode)}
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
