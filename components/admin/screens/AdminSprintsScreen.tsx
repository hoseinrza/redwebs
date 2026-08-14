"use client";

import { useState, useRef, useEffect } from "react";
import {
  Code2,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  GitBranch,
  GitPullRequest,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  User,
  LayoutGrid,
  List,
  Flame,
  ChevronLeft,
  ChevronRight,
  Layers,
  Check,
  AlertTriangle,
  SlidersHorizontal,
  GripVertical,
  Move,
} from "lucide-react";
import { DevTask, devTeamMembers } from "@/lib/data/admin";
import { toFa } from "@/lib/format";

interface AdminSprintsScreenProps {
  onOpenNewTaskModal: () => void;
  tasks: DevTask[];
  onUpdateTaskStatus: (taskId: string, newStatus: DevTask["status"]) => void;
}

const KANBAN_COLUMNS: {
  id: DevTask["status"];
  title: string;
  shortTitle: string;
  desc: string;
  badgeBg: string;
  badgeText: string;
  headerAccent: string;
}[] = [
  {
    id: "backlog",
    title: "بک‌لاگ (Backlog)",
    shortTitle: "بک‌لاگ",
    desc: "برنامه‌ریزی شده برای اسپرینت‌های آینده",
    badgeBg: "bg-ink-100",
    badgeText: "text-ink-700",
    headerAccent: "border-ink-300",
  },
  {
    id: "in_progress",
    title: "در حال توسعه (In Progress)",
    shortTitle: "در حال توسعه",
    desc: "توسعه‌دهنده در حال پیاده‌سازی روی شاخه گیت",
    badgeBg: "bg-sky-50 border border-sky-200",
    badgeText: "text-sky-700",
    headerAccent: "border-sky-500",
  },
  {
    id: "code_review",
    title: "کد ریویو (Code Review)",
    shortTitle: "کد ریویو",
    desc: "ارسال Pull Request و بازبینی توسط Tech Lead",
    badgeBg: "bg-amber-50 border border-amber-200",
    badgeText: "text-amber-700",
    headerAccent: "border-amber-500",
  },
  {
    id: "qa_testing",
    title: "تست استیجینگ (QA / Staging)",
    shortTitle: "تست استیجینگ",
    desc: "آزمون‌های E2E، پرفورمنس و کنترل کیفی",
    badgeBg: "bg-purple-50 border border-purple-200",
    badgeText: "text-purple-700",
    headerAccent: "border-purple-500",
  },
  {
    id: "deployed",
    title: "مستقر در پروداکشن (Done)",
    shortTitle: "مستقر شده",
    desc: "مرج نهایی، استقرار اتوماتیک و تایید شده",
    badgeBg: "bg-emerald-50 border border-emerald-200",
    badgeText: "text-emerald-700",
    headerAccent: "border-emerald-500",
  },
];

const ORDERED_STATUSES: DevTask["status"][] = [
  "backlog",
  "in_progress",
  "code_review",
  "qa_testing",
  "deployed",
];

export default function AdminSprintsScreen({
  onOpenNewTaskModal,
  tasks,
  onUpdateTaskStatus,
}: AdminSprintsScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState("all");
  const [selectedAssignee, setSelectedAssignee] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [activeMobileColumn, setActiveMobileColumn] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban");

  // Drag and Drop state
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<DevTask["status"] | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const boardScrollRef = useRef<HTMLDivElement>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  function showToast(message: string) {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToastMessage(message);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesProject = selectedProject === "all" || task.projectId === selectedProject;
    const matchesAssignee = selectedAssignee === "all" || task.assigneeId === selectedAssignee;
    const matchesPriority = selectedPriority === "all" || task.priority === selectedPriority;

    return matchesSearch && matchesProject && matchesAssignee && matchesPriority;
  });

  // Calculate Sprint Stats
  const totalTasks = tasks.length;
  const doneTasks = tasks.filter((t) => t.status === "deployed").length;
  const inProgressTasks = tasks.filter((t) => t.status === "in_progress" || t.status === "code_review").length;
  const criticalTasks = tasks.filter((t) => t.priority === "critical" && t.status !== "deployed").length;
  const totalPoints = tasks.reduce((sum, t) => sum + (t.storyPoints || 0), 0);
  const donePoints = tasks
    .filter((t) => t.status === "deployed")
    .reduce((sum, t) => sum + (t.storyPoints || 0), 0);
  const sprintProgressPct = totalPoints > 0 ? Math.round((donePoints / totalPoints) * 100) : 0;

  // Progression helper
  function moveTaskNext(task: DevTask) {
    const currIdx = ORDERED_STATUSES.indexOf(task.status);
    if (currIdx < ORDERED_STATUSES.length - 1) {
      const nextStatus = ORDERED_STATUSES[currIdx + 1];
      onUpdateTaskStatus(task.id, nextStatus);
      const col = KANBAN_COLUMNS.find((c) => c.id === nextStatus);
      showToast(`تسک ${task.id} به «${col?.shortTitle}» منتقل شد.`);
    }
  }

  function moveTaskPrev(task: DevTask) {
    const currIdx = ORDERED_STATUSES.indexOf(task.status);
    if (currIdx > 0) {
      const prevStatus = ORDERED_STATUSES[currIdx - 1];
      onUpdateTaskStatus(task.id, prevStatus);
      const col = KANBAN_COLUMNS.find((c) => c.id === prevStatus);
      showToast(`تسک ${task.id} به «${col?.shortTitle}» برگشت داده شد.`);
    }
  }

  // Drag and Drop Event Handlers
  function handleDragStart(e: React.DragEvent<HTMLDivElement>, taskId: string) {
    e.dataTransfer.setData("text/plain", taskId);
    e.dataTransfer.effectAllowed = "move";
    setDraggedTaskId(taskId);
  }

  function handleDragEnd() {
    setDraggedTaskId(null);
    setDragOverColumn(null);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>, colId: DevTask["status"]) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverColumn !== colId) {
      setDragOverColumn(colId);
    }
  }

  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragOverColumn(null);
    }
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>, colId: DevTask["status"]) {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain") || draggedTaskId;
    if (taskId) {
      const task = tasks.find((t) => t.id === taskId);
      if (task && task.status !== colId) {
        onUpdateTaskStatus(taskId, colId);
        const col = KANBAN_COLUMNS.find((c) => c.id === colId);
        showToast(`تسک ${task.id} با موفقیت به ستون «${col?.shortTitle || colId}» منتقل شد.`);
      }
    }
    setDraggedTaskId(null);
    setDragOverColumn(null);
  }

  function scrollBoard(direction: "left" | "right") {
    if (boardScrollRef.current) {
      const scrollAmount = 340;
      boardScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  }

  // Display columns based on mobile column filter
  const visibleColumns =
    activeMobileColumn === "all"
      ? KANBAN_COLUMNS
      : KANBAN_COLUMNS.filter((c) => c.id === activeMobileColumn);

  return (
    <div className="p-3.5 sm:p-6 lg:p-8 space-y-5 sm:space-y-6 animate-fade-in font-sans max-w-[1700px] mx-auto min-w-0">
      {/* Header & Quick Action Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-ink-200 pb-5">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-accent-600 animate-pulse" />
            <h1 className="text-lg sm:text-2xl font-black text-ink-950">
              بورد اسپرینت و تسک‌های چابک (Kanban)
            </h1>
            <span className="rounded-full bg-ink-900 text-white px-2.5 py-0.5 text-[11px] font-mono font-bold">
              اسپرینت ۴ · هفته دوم
            </span>
          </div>
          <p className="text-xs sm:text-sm text-ink-500">
            مدیریت چابک فیچرهای فرانت‌اند، بک‌اند، استیجینگ و استقرار پروداکشن
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* View mode toggle */}
          <div className="flex items-center bg-white rounded-2xl border border-ink-200 p-1 shadow-2xs">
            <button
              type="button"
              onClick={() => setViewMode("kanban")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === "kanban"
                  ? "bg-accent-600 text-white shadow-xs"
                  : "text-ink-600 hover:text-ink-950"
              }`}
              title="نمای بورد کانبان"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">بورد کانبان</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === "list"
                  ? "bg-accent-600 text-white shadow-xs"
                  : "text-ink-600 hover:text-ink-950"
              }`}
              title="نمای لیستی و جدولی"
            >
              <List className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">نمای لیستی</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onOpenNewTaskModal}
            className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-2xl bg-accent-600 text-white text-xs sm:text-sm font-bold hover:bg-accent-700 shadow-glow transition-all active:scale-95 shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span>تعریف تسک جدید</span>
          </button>
        </div>
      </div>

      {/* Sprint Health & Progress Bar Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* Progress % */}
        <div className="rounded-2xl sm:rounded-3xl border border-ink-200 bg-white p-3.5 sm:p-5 shadow-xs space-y-1.5">
          <span className="text-[11px] sm:text-xs font-bold text-ink-500 block truncate">
            پیشرفت اسپرینت جاری
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-black text-emerald-700 font-mono">
              {toFa(sprintProgressPct)}٪
            </span>
            <span className="text-[11px] text-ink-400 font-mono">
              ({toFa(donePoints)}/{toFa(totalPoints)} SP)
            </span>
          </div>
          <div className="h-1.5 w-full bg-ink-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${sprintProgressPct}%` }}
            />
          </div>
        </div>

        {/* In flight tasks */}
        <div className="rounded-2xl sm:rounded-3xl border border-ink-200 bg-white p-3.5 sm:p-5 shadow-xs space-y-1.5">
          <span className="text-[11px] sm:text-xs font-bold text-ink-500 block truncate">
            در حال توسعه و ریویو
          </span>
          <p className="text-xl sm:text-2xl font-black text-sky-700 font-mono">
            {toFa(inProgressTasks)}{" "}
            <span className="text-[11px] font-sans text-ink-500 font-normal">تسک فعال</span>
          </p>
          <span className="text-[10.5px] text-sky-600 font-bold block truncate">
            روی شاخه‌های فیچر گیت
          </span>
        </div>

        {/* Deployed */}
        <div className="rounded-2xl sm:rounded-3xl border border-ink-200 bg-white p-3.5 sm:p-5 shadow-xs space-y-1.5">
          <span className="text-[11px] sm:text-xs font-bold text-ink-500 block truncate">
            تکمیل و مستقر شده
          </span>
          <p className="text-xl sm:text-2xl font-black text-ink-950 font-mono">
            {toFa(doneTasks)}{" "}
            <span className="text-[11px] font-sans text-ink-500 font-normal">از {toFa(totalTasks)}</span>
          </p>
          <span className="text-[10.5px] text-emerald-600 font-bold block truncate">
            تست‌های Staging تایید شده
          </span>
        </div>

        {/* Critical issues */}
        <div className="rounded-2xl sm:rounded-3xl border border-ink-200 bg-white p-3.5 sm:p-5 shadow-xs space-y-1.5">
          <span className="text-[11px] sm:text-xs font-bold text-ink-500 block truncate">
            باگ‌های فوری (P0 / Critical)
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-black text-rose-700 font-mono">
              {toFa(criticalTasks)}
            </span>
            {criticalTasks === 0 ? (
              <span className="text-[10.5px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                بلاک کننده وجود ندارد
              </span>
            ) : (
              <span className="text-[10.5px] text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                نیازمند اولویت‌دهی
              </span>
            )}
          </div>
          <span className="text-[10.5px] text-ink-400 block truncate">SLA حل خطا: حداکثر ۲ ساعت</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3 bg-white p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl border border-ink-200 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {/* Search input */}
          <div className="relative">
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو در عنوان، شناسه (TASK-101) یا تگ..."
              className="w-full h-10 pr-10 pl-3 rounded-xl border border-ink-200 text-xs focus:border-accent-600 focus:ring-2 focus:ring-accent-100 outline-none transition-all"
            />
          </div>

          {/* Project Filter */}
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="h-10 px-3 rounded-xl border border-ink-200 text-xs bg-white focus:border-accent-600 outline-none cursor-pointer"
          >
            <option value="all">همه پروژه‌ها</option>
            <option value="aramesh">کلینیک آرامش</option>
            <option value="rokh">استودیو رخ</option>
            <option value="parsa">دفتر وکالت پارسا</option>
            <option value="mehr">مرکز مهر</option>
            <option value="infra">زیرساخت مرکزی کلاد</option>
          </select>

          {/* Assignee Filter */}
          <select
            value={selectedAssignee}
            onChange={(e) => setSelectedAssignee(e.target.value)}
            className="h-10 px-3 rounded-xl border border-ink-200 text-xs bg-white focus:border-accent-600 outline-none cursor-pointer"
          >
            <option value="all">همه توسعه‌دهندگان</option>
            {devTeamMembers.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.role.split(" ")[0]})
              </option>
            ))}
          </select>

          {/* Priority Filter */}
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="h-10 px-3 rounded-xl border border-ink-200 text-xs bg-white focus:border-accent-600 outline-none cursor-pointer"
          >
            <option value="all">همه اولویت‌ها</option>
            <option value="critical">فوری و حیاتی (P0 Critical)</option>
            <option value="high">اولویت بالا (P1 High)</option>
            <option value="medium">اولویت متوسط (P2 Medium)</option>
            <option value="low">اولویت عادی (P3 Low)</option>
          </select>
        </div>

        {/* Mobile Column Quick Switcher Pills & Drag Tip */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-ink-100">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none text-xs">
            <span className="text-[11px] font-bold text-ink-500 shrink-0 ml-1">نمایش ستون:</span>
            <button
              type="button"
              onClick={() => setActiveMobileColumn("all")}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 text-xs ${
                activeMobileColumn === "all"
                  ? "bg-ink-950 text-white shadow-xs"
                  : "bg-ink-100 text-ink-700 hover:bg-ink-200"
              }`}
            >
              همه ستون‌ها ({toFa(filteredTasks.length)})
            </button>
            {KANBAN_COLUMNS.map((col) => {
              const count = filteredTasks.filter((t) => t.status === col.id).length;
              const isSelected = activeMobileColumn === col.id;
              return (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => setActiveMobileColumn(col.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 text-xs flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-accent-600 text-white shadow-xs"
                      : "bg-ink-100 text-ink-700 hover:bg-ink-200"
                  }`}
                >
                  <span>{col.shortTitle}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                      isSelected ? "bg-white/25 text-white" : "bg-white text-ink-800"
                    }`}
                  >
                    {toFa(count)}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Drag & drop helper pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-accent-50 border border-accent-200/70 text-accent-800 text-[11px] font-bold">
            <Move className="h-3.5 w-3.5 text-accent-600" />
            <span>امکان جابجایی کارت‌ها با Drag & Drop فعال است</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. KANBAN BOARD VIEW (Fully Responsive Flex Scroller with Drag & Drop)     */}
      {/* ========================================================================= */}
      {viewMode === "kanban" && (
        <div className="relative min-w-0">
          {/* Desktop/Tablet Horizontal Scroll Nav Buttons */}
          <div className="hidden sm:flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-xs text-ink-500 font-medium">
              <Layers className="h-3.5 w-3.5 text-accent-600" />
              <span>
                {activeMobileColumn === "all"
                  ? "نمایش کامل ۵ مرحله پایپ‌لاین اسپرینت — کارت‌ها را بکشید و در ستون مورد نظر رها کنید"
                  : `فیلتر شده بر روی ستون ${KANBAN_COLUMNS.find((c) => c.id === activeMobileColumn)?.shortTitle}`}
              </span>
            </div>

            {activeMobileColumn === "all" && (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => scrollBoard("right")}
                  className="flex h-8 w-8 items-center justify-center rounded-xl border border-ink-200 bg-white text-ink-700 hover:bg-ink-100 transition-colors shadow-2xs"
                  title="اسکرول به راست"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollBoard("left")}
                  className="flex h-8 w-8 items-center justify-center rounded-xl border border-ink-200 bg-white text-ink-700 hover:bg-ink-100 transition-colors shadow-2xs"
                  title="اسکرول به چپ"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {/* Kanban Columns Flex Track */}
          <div
            ref={boardScrollRef}
            className="flex overflow-x-auto gap-4 pb-6 pt-1 px-0.5 min-w-0 snap-x snap-mandatory overscroll-x-contain"
            style={{ scrollbarWidth: "thin" }}
          >
            {visibleColumns.map((col) => {
              const colTasks = filteredTasks.filter((t) => t.status === col.id);
              const totalColPoints = colTasks.reduce((acc, t) => acc + (t.storyPoints || 0), 0);
              const isColumnDraggedOver = dragOverColumn === col.id;

              return (
                <div
                  key={col.id}
                  onDragOver={(e) => handleDragOver(e, col.id)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, col.id)}
                  className={`flex flex-col rounded-3xl border p-3.5 sm:p-4 shrink-0 snap-center transition-all duration-200 ${
                    isColumnDraggedOver
                      ? "bg-accent-50/90 border-accent-500 ring-2 ring-accent-400 ring-offset-2 ring-offset-ink-50 shadow-md scale-[1.01]"
                      : "bg-ink-100/70 border-ink-200"
                  } ${
                    activeMobileColumn === "all"
                      ? "w-[86vw] sm:w-[320px] md:w-[320px] lg:w-[310px] xl:w-[310px] 2xl:flex-1 min-w-[270px] max-w-[380px]"
                      : "w-full min-w-0"
                  }`}
                >
                  {/* Column Header */}
                  <div
                    className={`flex items-center justify-between border-b-2 ${col.headerAccent} bg-white rounded-2xl p-3 shadow-2xs mb-3.5`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-[13px] font-black text-ink-950 truncate">
                          {col.title.split("(")[0]}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[11px] font-bold font-mono ${col.badgeBg} ${col.badgeText}`}
                        >
                          {toFa(colTasks.length)}
                        </span>
                      </div>
                      <p className="text-[10px] text-ink-500 line-clamp-1">{col.desc}</p>
                    </div>

                    <div className="text-left shrink-0">
                      <span className="text-[11px] font-bold font-mono text-ink-700 bg-ink-50 px-2 py-0.5 rounded-md border border-ink-200">
                        {toFa(totalColPoints)} SP
                      </span>
                    </div>
                  </div>

                  {/* Drop Placeholder Indicator when hovering column */}
                  {isColumnDraggedOver && (
                    <div className="mb-3 rounded-2xl border-2 border-dashed border-accent-500 bg-accent-100/60 p-3 text-center text-xs font-bold text-accent-800 animate-pulse flex items-center justify-center gap-2 shadow-inner">
                      <Move className="h-4 w-4 text-accent-600 animate-bounce" />
                      <span>کارت را اینجا رها کنید تا به «{col.shortTitle}» منتقل شود</span>
                    </div>
                  )}

                  {/* Column Tasks Container */}
                  <div className="space-y-3 flex-1 min-h-[320px]">
                    {colTasks.length === 0 && !isColumnDraggedOver ? (
                      <div className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-ink-200/80 bg-white/40 text-center text-xs text-ink-400 space-y-1">
                        <span>تسکی در این ستون نیست</span>
                        <span className="text-[10.5px] text-ink-400">کارت‌ها را بکشید و اینجا رها کنید</span>
                      </div>
                    ) : (
                      colTasks.map((task) => {
                        const isCritical = task.priority === "critical";
                        const isHigh = task.priority === "high";
                        const canMovePrev = ORDERED_STATUSES.indexOf(task.status) > 0;
                        const canMoveNext =
                          ORDERED_STATUSES.indexOf(task.status) < ORDERED_STATUSES.length - 1;
                        const isBeingDragged = draggedTaskId === task.id;

                        return (
                          <div
                            key={task.id}
                            draggable={true}
                            onDragStart={(e) => handleDragStart(e, task.id)}
                            onDragEnd={handleDragEnd}
                            className={`group relative rounded-2xl border bg-white p-3.5 sm:p-4 shadow-xs transition-all space-y-2.5 cursor-grab active:cursor-grabbing select-none ${
                              isBeingDragged
                                ? "opacity-35 scale-[0.97] border-dashed border-accent-500 ring-2 ring-accent-300 ring-offset-1 shadow-inner bg-accent-50/50"
                                : "border-ink-200 hover:border-ink-400 hover:shadow-card hover:-translate-y-0.5"
                            }`}
                          >
                            {/* Top Meta Line: Drag Handle, ID, Project, Priority, SP */}
                            <div className="flex items-center justify-between text-xs gap-1.5">
                              <div className="flex items-center gap-1.5 truncate">
                                {/* Visual Drag Handle Icon */}
                                <div
                                  className="text-ink-400 group-hover:text-accent-600 transition-colors -mr-1"
                                  title="برای جابجایی بکشید و رها کنید (Drag & Drop)"
                                >
                                  <GripVertical className="h-4 w-4" />
                                </div>
                                <span className="font-mono text-[10.5px] font-bold text-ink-500">
                                  {task.id}
                                </span>
                                <span className="rounded-md bg-ink-100 px-2 py-0.5 text-[10px] font-bold text-ink-800 truncate max-w-[100px]">
                                  {task.projectName}
                                </span>
                              </div>

                              <div className="flex items-center gap-1 shrink-0">
                                {isCritical && (
                                  <span className="rounded-md bg-rose-50 px-1.5 py-0.5 text-[10px] font-bold text-rose-700 border border-rose-200 flex items-center gap-0.5">
                                    <Flame className="h-3 w-3 text-rose-600" />
                                    <span>P0</span>
                                  </span>
                                )}
                                {isHigh && (
                                  <span className="rounded-md bg-amber-50 px-1.5 py-0.5 text-[10px] font-bold text-amber-700 border border-amber-200">
                                    P1
                                  </span>
                                )}
                                <span className="rounded-md bg-accent-50 text-accent-700 px-1.5 py-0.5 text-[10.5px] font-bold font-mono">
                                  {toFa(task.storyPoints)} SP
                                </span>
                              </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-xs sm:text-[13px] font-bold text-ink-950 leading-snug">
                              {task.title}
                            </h3>

                            {/* Description snippet */}
                            <p className="text-[11px] text-ink-600 line-clamp-2 leading-relaxed">
                              {task.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1">
                              {task.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-md bg-ink-50 border border-ink-200/70 px-1.5 py-0.5 text-[9.5px] text-ink-600 font-mono"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>

                            {/* Git Branch & Assignee Info */}
                            <div className="flex items-center justify-between border-t border-ink-100 pt-2 text-[11px] text-ink-500">
                              <div className="flex items-center gap-1 font-mono dir-ltr text-left text-ink-600 truncate max-w-[130px]">
                                <GitBranch className="h-3 w-3 shrink-0 text-accent-600" />
                                <span className="truncate">{task.branch.replace("feat/", "")}</span>
                              </div>

                              <div className="flex items-center gap-1.5 text-[11px] text-ink-800 font-bold">
                                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-ink-900 text-[9px] font-bold text-white">
                                  {task.assigneeName.slice(0, 1)}
                                </div>
                                <span className="truncate max-w-[80px]">{task.assigneeName.split(" ")[0]}</span>
                              </div>
                            </div>

                            {/* Bottom Move Controls (1-tap arrows + Dropdown fallback) */}
                            <div className="pt-2 border-t border-ink-100 flex items-center justify-between gap-1">
                              {/* 1-tap Prev Button (in RTL, Right Arrow moves back) */}
                              <button
                                type="button"
                                disabled={!canMovePrev}
                                onClick={() => moveTaskPrev(task)}
                                className={`flex items-center justify-center h-7 w-7 rounded-lg border transition-all ${
                                  canMovePrev
                                    ? "border-ink-200 bg-ink-50 hover:bg-ink-100 text-ink-700"
                                    : "border-transparent text-ink-300 opacity-40 cursor-not-allowed"
                                }`}
                                title="مرحله قبل"
                              >
                                <ArrowRight className="h-3.5 w-3.5" />
                              </button>

                              {/* Direct Column Dropdown */}
                              <select
                                value={task.status}
                                onChange={(e) => {
                                  const newStatus = e.target.value as DevTask["status"];
                                  onUpdateTaskStatus(task.id, newStatus);
                                  const col = KANBAN_COLUMNS.find((c) => c.id === newStatus);
                                  showToast(`وضعیت تسک ${task.id} به «${col?.shortTitle}» تغییر یافت.`);
                                }}
                                className="flex-1 max-w-[150px] px-2 py-1 rounded-lg border border-ink-200 bg-ink-50 text-ink-800 text-[10.5px] font-bold outline-none cursor-pointer hover:bg-white text-center transition-colors"
                              >
                                <option value="backlog">بک‌لاگ</option>
                                <option value="in_progress">در حال توسعه</option>
                                <option value="code_review">کد ریویو</option>
                                <option value="qa_testing">تست QA</option>
                                <option value="deployed">مستقر شده (Done)</option>
                              </select>

                              {/* 1-tap Next Button (in RTL, Left Arrow moves forward) */}
                              <button
                                type="button"
                                disabled={!canMoveNext}
                                onClick={() => moveTaskNext(task)}
                                className={`flex items-center justify-center h-7 w-7 rounded-lg border transition-all ${
                                  canMoveNext
                                    ? "border-accent-200 bg-accent-50 hover:bg-accent-100 text-accent-700 font-bold"
                                    : "border-transparent text-ink-300 opacity-40 cursor-not-allowed"
                                }`}
                                title="مرحله بعد"
                              >
                                <ArrowLeft className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. LIST / TABLE VIEW (Clean Mobile & Desktop Structured List)              */}
      {/* ========================================================================= */}
      {viewMode === "list" && (
        <div className="rounded-2xl sm:rounded-3xl border border-ink-200 bg-white overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-ink-50/90 border-b border-ink-150 text-ink-600 font-bold">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">شناسه و عنوان تسک</th>
                  <th className="py-3.5 px-4">پروژه</th>
                  <th className="py-3.5 px-4">ستون وضعیت</th>
                  <th className="py-3.5 px-4">اولویت</th>
                  <th className="py-3.5 px-4">استوری‌پوینت</th>
                  <th className="py-3.5 px-4">توسعه‌دهنده</th>
                  <th className="py-3.5 px-4">شاخه گیت</th>
                  <th className="py-3.5 px-4 sm:px-6 text-center">تغییر وضعیت</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100 text-ink-900">
                {filteredTasks.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-xs text-ink-400">
                      تسکی با فیلترهای مشخص شده یافت نشد.
                    </td>
                  </tr>
                ) : (
                  filteredTasks.map((task) => {
                    const colConfig = KANBAN_COLUMNS.find((c) => c.id === task.status);
                    const isCritical = task.priority === "critical";
                    const isHigh = task.priority === "high";

                    return (
                      <tr key={task.id} className="hover:bg-ink-50/60 transition-colors">
                        <td className="py-3.5 px-4 sm:px-6">
                          <div className="space-y-0.5">
                            <span className="font-mono text-[11px] font-bold text-accent-700 block">
                              {task.id}
                            </span>
                            <span className="font-bold text-ink-950 text-xs sm:text-[13px] block">
                              {task.title}
                            </span>
                            <p className="text-[11px] text-ink-500 line-clamp-1">
                              {task.description}
                            </p>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="rounded-md bg-ink-100 px-2 py-1 text-[11px] font-bold text-ink-800 whitespace-nowrap">
                            {task.projectName}
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          <span
                            className={`rounded-full px-2.5 py-1 text-[10.5px] font-bold whitespace-nowrap ${
                              colConfig?.badgeBg || "bg-ink-100"
                            } ${colConfig?.badgeText || "text-ink-700"}`}
                          >
                            {colConfig?.shortTitle || task.status}
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          {isCritical ? (
                            <span className="rounded-md bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 text-[10px] font-bold">
                              P0 Critical
                            </span>
                          ) : isHigh ? (
                            <span className="rounded-md bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 text-[10px] font-bold">
                              P1 High
                            </span>
                          ) : (
                            <span className="rounded-md bg-ink-100 text-ink-600 px-2 py-0.5 text-[10px] font-bold">
                              {task.priority.toUpperCase()}
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 font-mono font-bold text-ink-900">
                          {toFa(task.storyPoints)} SP
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1.5">
                            <User className="h-3.5 w-3.5 text-ink-400" />
                            <span className="font-bold text-ink-900">{task.assigneeName}</span>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1 font-mono text-[11px] text-ink-600 dir-ltr text-left">
                            <GitBranch className="h-3 w-3 text-accent-600 shrink-0" />
                            <span className="truncate max-w-[120px]">{task.branch}</span>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 sm:px-6 text-center">
                          <select
                            value={task.status}
                            onChange={(e) =>
                              onUpdateTaskStatus(task.id, e.target.value as DevTask["status"])
                            }
                            className="px-2.5 py-1 rounded-xl border border-ink-200 bg-white text-ink-900 text-xs font-bold outline-none cursor-pointer hover:border-accent-500 transition-colors"
                          >
                            <option value="backlog">بک‌لاگ</option>
                            <option value="in_progress">در حال توسعه</option>
                            <option value="code_review">کد ریویو</option>
                            <option value="qa_testing">تست QA</option>
                            <option value="deployed">مستقر شده (Done)</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Floating Status Update Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-bounce-in max-w-[90vw] sm:max-w-md">
          <div className="flex items-center gap-3 bg-ink-950 text-white px-4 sm:px-5 py-3 rounded-2xl shadow-2xl border border-ink-800 backdrop-blur-md">
            <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-accent-600 text-white shrink-0 shadow-xs">
              <Check className="h-4 w-4" />
            </div>
            <p className="text-xs sm:text-[13px] font-bold leading-snug flex-1">
              {toastMessage}
            </p>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-ink-400 hover:text-white transition-colors p-1 -mr-1"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
