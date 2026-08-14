"use client";

import { useState } from "react";
import {
  Server,
  Cpu,
  HardDrive,
  Activity,
  Play,
  RefreshCw,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Globe,
  Database,
  Terminal,
  ExternalLink,
  Layers,
} from "lucide-react";
import { cloudServerNodes } from "@/lib/data/admin";
import { toFa } from "@/lib/format";

interface AdminServersScreenProps {
  onOpenDeployModal: (serverName: string, env: "production" | "staging" | "edge") => void;
}

export default function AdminServersScreen({ onOpenDeployModal }: AdminServersScreenProps) {
  const [purgingCache, setPurgingCache] = useState(false);
  const [cacheMessage, setCacheMessage] = useState("");

  function handlePurgeCache() {
    setPurgingCache(true);
    setCacheMessage("");
    setTimeout(() => {
      setPurgingCache(false);
      setCacheMessage("کش CDN تمام سرورهای Edge با موفقیت پاکسازی و ایندکس مجدد شد.");
      setTimeout(() => setCacheMessage(""), 4000);
    }, 1200);
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 animate-fade-in font-sans">
      {/* Header & Quick Action Buttons */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-ink-200 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-xl sm:text-2xl font-black text-ink-950">مدیریت زیرساخت، سرورها و DevOps</h1>
          </div>
          <p className="text-xs sm:text-sm text-ink-500">
            پایش وضعیت زنده کلاسترهای کوبرنتیز، پایگاه داده PostgreSQL، کش Redis و استقرار خودکار
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handlePurgeCache}
            disabled={purgingCache}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-ink-200 bg-white text-xs font-bold text-ink-800 hover:bg-ink-50 transition-colors shadow-xs"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${purgingCache ? "animate-spin text-accent-600" : ""}`} />
            <span>{purgingCache ? "در حال پاکسازی..." : "پاکسازی کش CDN (Purge All)"}</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenDeployModal("redwebs-prod-k8s-cluster-01", "production")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-accent-600 text-white text-xs font-bold hover:bg-accent-700 shadow-glow transition-all active:scale-95"
          >
            <Play className="h-4 w-4" />
            <span>استقرار بیلد جدید (CI/CD Pipeline)</span>
          </button>
        </div>
      </div>

      {cacheMessage && (
        <div className="flex items-center gap-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-xs font-bold text-emerald-800 animate-fade-in">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{cacheMessage}</span>
        </div>
      )}

      {/* Global Infrastructure Health Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="rounded-3xl border border-ink-200 bg-white p-5 shadow-xs space-y-2">
          <span className="text-[11px] font-bold text-ink-500 block">پایداری کل سرورها (SLA)</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-emerald-700 font-mono">۹۹.۹۸٪</span>
            <span className="text-xs text-ink-500">Uptime</span>
          </div>
          <p className="text-[11px] text-emerald-600 font-bold">۱۴۲ روز متوالی بدون قطعی شبکه</p>
        </div>

        <div className="rounded-3xl border border-ink-200 bg-white p-5 shadow-xs space-y-2">
          <span className="text-[11px] font-bold text-ink-500 block">میانگین تاخیر شبکه (Global Latency)</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-ink-950 font-mono">۱۴</span>
            <span className="text-xs text-ink-500">میلی‌ثانیه</span>
          </div>
          <p className="text-[11px] text-ink-500">شبکه ابر آروان + Anycast Edge</p>
        </div>

        <div className="rounded-3xl border border-ink-200 bg-white p-5 shadow-xs space-y-2">
          <span className="text-[11px] font-bold text-ink-500 block">نرخ کشینگ ردیس (Hit Ratio)</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-ink-950 font-mono">۹۹.۴٪</span>
            <span className="text-xs text-ink-500">Hit Rate</span>
          </div>
          <p className="text-[11px] text-ink-500">حجم کش درون حافظه: ۲.۴ گیگابایت</p>
        </div>

        <div className="rounded-3xl border border-ink-200 bg-white p-5 shadow-xs space-y-2">
          <span className="text-[11px] font-bold text-ink-500 block">کانتینرهای فعال داکر</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-accent-700 font-mono">{toFa(44)}</span>
            <span className="text-xs text-ink-500">Pods Running</span>
          </div>
          <p className="text-[11px] text-emerald-600 font-bold">تمام پادها در وضعیت Healthy</p>
        </div>
      </div>

      {/* Cloud Nodes Detailed Cards Grid */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-ink-950">نودها و سرویس‌های فعال کلاستر</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {cloudServerNodes.map((node) => {
            const isProd = node.environment === "production";
            return (
              <div
                key={node.id}
                className="rounded-3xl border border-ink-200 bg-white p-6 shadow-xs space-y-5 hover:border-ink-300 transition-all"
              >
                {/* Top Node Header */}
                <div className="flex items-start justify-between gap-3 border-b border-ink-100 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="flex h-3 w-3 rounded-full bg-emerald-500" />
                      <h3 className="font-mono text-sm font-bold text-ink-950 dir-ltr text-right truncate">
                        {node.name}
                      </h3>
                    </div>
                    <p className="text-xs text-ink-500">{node.role}</p>
                    <p className="text-[11px] text-ink-400 font-mono dir-ltr text-right">
                      IP: {node.ip} · منطقه: {node.region}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span
                      className={`rounded-lg px-2.5 py-1 text-xs font-mono font-bold ${
                        isProd
                          ? "bg-rose-50 text-rose-700 border border-rose-200"
                          : node.environment === "staging"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-sky-50 text-sky-700 border border-sky-200"
                      }`}
                    >
                      {node.environment.toUpperCase()}
                    </span>

                    {node.url && (
                      <a
                        href={node.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-[11px] text-accent-600 hover:underline font-mono"
                      >
                        <span>مشاهده زنده</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Resource Gauges (CPU, Memory, Disk) */}
                <div className="grid grid-cols-3 gap-4">
                  {/* CPU */}
                  <div className="space-y-1.5 rounded-2xl bg-ink-50 p-3">
                    <div className="flex items-center justify-between text-[11px] text-ink-600">
                      <span className="flex items-center gap-1">
                        <Cpu className="h-3.5 w-3.5 text-accent-600" />
                        <span>پردازنده</span>
                      </span>
                      <strong className="font-mono">{toFa(node.cpuUsage)}٪</strong>
                    </div>
                    <div className="h-1.5 w-full bg-ink-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent-600 rounded-full"
                        style={{ width: `${node.cpuUsage}%` }}
                      />
                    </div>
                  </div>

                  {/* Memory */}
                  <div className="space-y-1.5 rounded-2xl bg-ink-50 p-3">
                    <div className="flex items-center justify-between text-[11px] text-ink-600">
                      <span className="flex items-center gap-1">
                        <Activity className="h-3.5 w-3.5 text-sky-600" />
                        <span>حافظه RAM</span>
                      </span>
                      <strong className="font-mono">{toFa(node.memoryUsage)}٪</strong>
                    </div>
                    <div className="h-1.5 w-full bg-ink-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-sky-600 rounded-full"
                        style={{ width: `${node.memoryUsage}%` }}
                      />
                    </div>
                  </div>

                  {/* Disk */}
                  <div className="space-y-1.5 rounded-2xl bg-ink-50 p-3">
                    <div className="flex items-center justify-between text-[11px] text-ink-600">
                      <span className="flex items-center gap-1">
                        <HardDrive className="h-3.5 w-3.5 text-amber-600" />
                        <span>دیسک NVMe</span>
                      </span>
                      <strong className="font-mono">{toFa(node.diskUsage)}٪</strong>
                    </div>
                    <div className="h-1.5 w-full bg-ink-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-600 rounded-full"
                        style={{ width: `${node.diskUsage}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Footer Metrics & Trigger Button */}
                <div className="flex items-center justify-between pt-2 border-t border-ink-100 text-xs">
                  <div className="space-x-3 text-[11px] text-ink-500 font-mono">
                    <span>Uptime: <strong className="text-ink-900">{node.uptime}</strong></span>
                    <span>·</span>
                    <span>Ping: <strong className="text-emerald-700">{toFa(node.latencyMs)}ms</strong></span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenDeployModal(node.name, node.environment)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-ink-200 bg-white hover:bg-ink-100 text-xs font-bold text-ink-800 transition-colors shadow-2xs"
                  >
                    <Play className="h-3.5 w-3.5 text-accent-600" />
                    <span>استقرار روی نود</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
