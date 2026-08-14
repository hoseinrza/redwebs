"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Activity,
  Server,
  Code2,
  Users,
  DollarSign,
  TrendingUp,
  GitPullRequest,
  CheckCircle2,
  AlertTriangle,
  Play,
  ArrowUpRight,
  Sparkles,
  Terminal,
  ShieldCheck,
  Zap,
  RefreshCw,
  Cpu,
  Layers,
} from "lucide-react";
import {
  adminOverviewStats,
  cloudServerNodes,
  devTasks,
  devTeamMembers,
  clientAccounts,
  systemLogEntries,
  incidentTickets,
} from "@/lib/data/admin";
import { formatPrice, toFa } from "@/lib/format";

interface AdminDashboardScreenProps {
  onNavigate: (tab: string) => void;
  onOpenDeployModal: (serverName: string, env: "production" | "staging" | "edge") => void;
  onOpenNewTaskModal: () => void;
}

export default function AdminDashboardScreen({
  onNavigate,
  onOpenDeployModal,
  onOpenNewTaskModal,
}: AdminDashboardScreenProps) {
  const [refreshing, setRefreshing] = useState(false);

  function handleRefresh() {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 600);
  }

  const activeSprints = devTasks.filter((t) => t.status === "in_progress" || t.status === "code_review");
  const criticalTasks = devTasks.filter((t) => t.priority === "critical");

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 animate-fade-in font-sans">
      {/* Top Banner / Live Operations Status */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 rounded-3xl bg-ink-950 p-6 text-white border border-ink-800 shadow-2xl relative overflow-hidden">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-emerald-600/15 blur-3xl" />

        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span>تمام کلاسترهای پروداکشن و سرویس‌ها پایدار هستند (Uptime: {toFa(adminOverviewStats.serverUptime)}٪)</span>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">
            میز عملیات و فرماندهی فنی استودیو <span className="text-accent-500">ردوبز</span>
          </h1>
          <p className="text-xs sm:text-sm text-ink-300 max-w-2xl leading-relaxed">
            مدیریت بلادرنگ اسپرینت‌ها، پایش سلامت سرورهای ابری، بررسی لاگ‌های CI/CD، کنترل تراکنش‌های مالی و نظارت بر تیم توسعه.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <button
            type="button"
            onClick={handleRefresh}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-ink-700 bg-ink-900/80 text-xs font-bold text-ink-200 hover:bg-ink-800 transition-colors"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin text-accent-400" : ""}`} />
            <span>بروزرسانی وضعیت</span>
          </button>

          <button
            type="button"
            onClick={onOpenNewTaskModal}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-accent-600 text-white text-xs font-bold hover:bg-accent-700 shadow-glow transition-all active:scale-95"
          >
            <Code2 className="h-4 w-4" />
            <span>تسک فنی جدید</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenDeployModal("redwebs-prod-k8s-cluster-01", "production")}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 shadow-xs transition-all active:scale-95"
          >
            <Play className="h-4 w-4" />
            <span>استقرار سریع (CI/CD)</span>
          </button>
        </div>
      </div>

      {/* KPI 4-Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Metric 1: Monthly Revenue */}
        <div className="rounded-3xl border border-ink-200 bg-white p-5 sm:p-6 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-ink-500">درآمد محقق‌شده ماه جاری</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-accent-50 text-accent-600">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black text-ink-950 font-mono">
              {formatPrice(adminOverviewStats.totalRevenueMonthlyToman)}
            </span>
            <span className="text-xs text-ink-500 mr-1">تومان</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>+{toFa(adminOverviewStats.growthPercentage)}٪ نسبت به ماه گذشته</span>
          </div>
        </div>

        {/* Metric 2: Active Sprints & Tasks */}
        <div className="rounded-3xl border border-ink-200 bg-white p-5 sm:p-6 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-ink-500">اسپرینت‌های فعال مهندسی</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
              <Code2 className="h-4 w-4" />
            </div>
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black text-ink-950 font-mono">
              {toFa(activeSprints.length)}
            </span>
            <span className="text-xs text-ink-500 mr-1">تسک در حال کدنویسی و بازبینی</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-ink-600">
            <GitPullRequest className="h-3.5 w-3.5 text-accent-600" />
            <span>{toFa(adminOverviewStats.openPullRequests)} درخواست Pull Request فعال</span>
          </div>
        </div>

        {/* Metric 3: Servers & Performance */}
        <div className="rounded-3xl border border-ink-200 bg-white p-5 sm:p-6 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-ink-500">میانگین Latency سرورها</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <Zap className="h-4 w-4" />
            </div>
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black text-emerald-700 font-mono">
              {toFa(adminOverviewStats.averageResponseTimeMs)}
            </span>
            <span className="text-xs text-ink-500 mr-1">میلی‌ثانیه (TTFB)</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>{toFa(cloudServerNodes.length)} نود و کانتینر فعال و نرمال</span>
          </div>
        </div>

        {/* Metric 4: Dev Team Activity */}
        <div className="rounded-3xl border border-ink-200 bg-white p-5 sm:p-6 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-ink-500">تیم مهندسی و توسعه</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black text-ink-950 font-mono">
              {toFa(adminOverviewStats.activeDevsOnline)}
            </span>
            <span className="text-xs text-ink-500 mr-1">نفر حاضر و در حال توسعه</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-ink-600">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>{toFa(adminOverviewStats.completedTasksThisWeek)} تسک تکمیل‌شده در ۷ روز اخیر</span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Left 7 Cols: Active Sprints & High Priority Tasks */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-ink-150 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-ink-950 text-white text-xs font-bold">
                  <Code2 className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-ink-950">تسک‌های اولویت‌دار اسپرینت جاری</h2>
                  <p className="text-[11px] text-ink-500">وضعیت کدهای در حال توسعه و آماده استقرار</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNavigate("sprints")}
                className="flex items-center gap-1 text-xs font-bold text-accent-700 hover:text-accent-800 transition-colors"
              >
                <span>مشاهده بورد کامل کانبان</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Task List */}
            <div className="space-y-3">
              {devTasks.slice(0, 4).map((task) => {
                const isCritical = task.priority === "critical";
                return (
                  <div
                    key={task.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-ink-150 bg-ink-50/50 hover:bg-white hover:border-ink-300 p-4 transition-all"
                  >
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold text-ink-500">{task.id}</span>
                        <span className="rounded-md bg-ink-200/70 px-2 py-0.5 text-[10.5px] font-bold text-ink-800">
                          {task.projectName}
                        </span>
                        {isCritical && (
                          <span className="rounded-md bg-rose-50 px-2 py-0.5 text-[10.5px] font-bold text-rose-700 border border-rose-200">
                            Critical P0
                          </span>
                        )}
                        <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10.5px] font-bold text-emerald-700 border border-emerald-200">
                          {task.status === "in_progress"
                            ? "در حال توسعه"
                            : task.status === "code_review"
                            ? "کد ریویو"
                            : task.status === "qa_testing"
                            ? "تست QA"
                            : "مستقر شده"}
                        </span>
                      </div>
                      <p className="text-xs sm:text-[13px] font-bold text-ink-900 leading-snug">{task.title}</p>
                      <div className="flex items-center gap-3 text-[11px] text-ink-500 font-mono">
                        <span className="dir-ltr text-left">git: {task.branch}</span>
                        <span>·</span>
                        <span>مسئول: {task.assigneeName}</span>
                      </div>
                    </div>

                    <div className="flex items-center sm:flex-col items-end justify-between sm:justify-center gap-1.5 shrink-0">
                      <span className="rounded-full bg-accent-50 text-accent-700 px-2.5 py-1 text-xs font-bold font-mono">
                        {toFa(task.storyPoints)} SP
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cloud Infrastructure Nodes Quick Status */}
          <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-ink-150 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-ink-950 text-white text-xs font-bold">
                  <Server className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-ink-950">سرورها و کلاسترهای ابری</h2>
                  <p className="text-[11px] text-ink-500">پایش بی‌وقفه حافظه، پردازنده و ترافیک دیتاسنترها</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNavigate("servers")}
                className="flex items-center gap-1 text-xs font-bold text-accent-700 hover:text-accent-800 transition-colors"
              >
                <span>مدیریت DevOps</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {cloudServerNodes.slice(0, 4).map((node) => (
                <div
                  key={node.id}
                  className="rounded-2xl border border-ink-150 bg-ink-50/40 p-4 space-y-3 hover:border-ink-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                      <span className="font-mono text-xs font-bold text-ink-900 truncate max-w-[170px]">
                        {node.name.replace("redwebs-", "")}
                      </span>
                    </div>
                    <span className="text-[10px] rounded-md bg-ink-200/80 px-2 py-0.5 font-mono text-ink-700 font-bold">
                      {node.environment.toUpperCase()}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-[11px] text-ink-500">
                      <span>مصرف CPU:</span>
                      <span className="font-mono font-bold text-ink-900">{toFa(node.cpuUsage)}٪</span>
                    </div>
                    <div className="h-1.5 w-full bg-ink-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent-600 rounded-full"
                        style={{ width: `${node.cpuUsage}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-ink-500 pt-1 border-t border-ink-200/60">
                    <span>تاخیر (Ping): <strong className="font-mono text-emerald-700">{toFa(node.latencyMs)}ms</strong></span>
                    <span>کانتینرها: <strong className="font-mono text-ink-900">{toFa(node.activeContainers)}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Live Terminal Logs & Team Activity */}
        <div className="lg:col-span-5 space-y-6">
          {/* Live Terminal Streaming Box */}
          <div className="rounded-3xl border border-ink-800 bg-ink-950 text-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-ink-800/80 pb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-3 w-3 rounded-full bg-rose-500" />
                <div className="flex h-3 w-3 rounded-full bg-amber-500" />
                <div className="flex h-3 w-3 rounded-full bg-emerald-500" />
                <span className="text-xs font-mono text-ink-400 mr-2">live-system-stream.log</span>
              </div>

              <button
                type="button"
                onClick={() => onNavigate("logs")}
                className="text-[11px] font-bold text-accent-400 hover:underline flex items-center gap-1"
              >
                <span>کنسول کامل</span>
                <ArrowUpRight className="h-3 w-3" />
              </button>
            </div>

            <div className="space-y-2.5 max-h-72 overflow-y-auto font-mono text-[11px] text-ink-300 dir-ltr text-left">
              {systemLogEntries.map((log) => {
                const color =
                  log.level === "success"
                    ? "text-emerald-400"
                    : log.level === "warn"
                    ? "text-amber-400"
                    : log.level === "error"
                    ? "text-rose-400"
                    : "text-sky-300";
                return (
                  <div key={log.id} className="p-2 rounded-xl bg-ink-900/60 border border-ink-800/60 space-y-0.5">
                    <div className="flex items-center justify-between text-[10px] text-ink-500">
                      <span>[{toFa(log.timestamp)}]</span>
                      <span className="uppercase font-bold tracking-wider">{log.service}</span>
                    </div>
                    <p className={`leading-relaxed ${color} dir-rtl text-right`}>{log.message}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dev Team Online Roster */}
          <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-ink-150 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent-50 text-accent-600 text-xs font-bold">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-ink-950">تیم مهندسی و وضعیت اعضا</h2>
                  <p className="text-[11px] text-ink-500">تسک‌های جاری و دسترس‌پذیری دولوپرها</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNavigate("team")}
                className="text-xs font-bold text-accent-700 hover:underline"
              >
                مدیریت تیم
              </button>
            </div>

            <div className="space-y-3">
              {devTeamMembers.slice(0, 4).map((member) => (
                <div key={member.id} className="flex items-center justify-between gap-3 p-2.5 rounded-2xl hover:bg-ink-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-2xl text-xs font-bold text-white shadow-xs"
                        style={{ backgroundColor: member.avatarBg }}
                      >
                        {member.avatar}
                      </div>
                      <span
                        className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white ${
                          member.status === "online"
                            ? "bg-emerald-500"
                            : member.status === "busy"
                            ? "bg-amber-500"
                            : "bg-ink-400"
                        }`}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-ink-950">{member.name}</span>
                        <span className="text-[10px] text-ink-500">({member.accessLevel.split(" ")[0]})</span>
                      </div>
                      <p className="text-[11px] text-ink-600 line-clamp-1 max-w-[200px]">{member.currentTask}</p>
                    </div>
                  </div>

                  <span className="rounded-lg bg-ink-100 px-2 py-1 text-[10.5px] font-mono font-bold text-ink-800">
                    {toFa(member.activePRs)} PR
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
