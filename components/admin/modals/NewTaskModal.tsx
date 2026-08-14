"use client";

import { useState } from "react";
import { X, Plus, Sparkles, CheckCircle2, Code2, AlertCircle } from "lucide-react";
import { DevTask, devTeamMembers } from "@/lib/data/admin";

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: DevTask) => void;
}

export default function NewTaskModal({ isOpen, onClose, onAddTask }: NewTaskModalProps) {
  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState("aramesh");
  const [priority, setPriority] = useState<DevTask["priority"]>("high");
  const [assigneeId, setAssigneeId] = useState("dev-2");
  const [storyPoints, setStoryPoints] = useState(5);
  const [tagsInput, setTagsInput] = useState("Backend, API, NestJS");
  const [branch, setBranch] = useState("feat/new-endpoint");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const projectMap: Record<string, string> = {
    aramesh: "کلینیک آرامش",
    rokh: "استودیو رخ",
    parsa: "دفتر وکالت پارسا",
    mehr: "مرکز مهر",
    infra: "زیرساخت کلاد ردوبز",
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError("عنوان تسک الزامی است.");
      return;
    }

    const assignee = devTeamMembers.find((m) => m.id === assigneeId) || devTeamMembers[0];
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const newTask: DevTask = {
      id: `TASK-${Math.floor(100 + Math.random() * 900)}`,
      title: title.trim(),
      projectId,
      projectName: projectMap[projectId] || "پروژه عمومی",
      status: "in_progress",
      priority,
      assigneeId: assignee.id,
      assigneeName: assignee.name,
      storyPoints: Number(storyPoints) || 3,
      tags: tags.length > 0 ? tags : ["Feature"],
      branch: branch.trim() || `feat/${title.slice(0, 15).replace(/\s+/g, "-")}`,
      dueDate: "اسپرینت جاری",
      description: description.trim() || "توضیحات فنی و معیارهای پذیرش ثبت خواهد شد.",
    };

    onAddTask(newTask);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/70 backdrop-blur-xs font-sans animate-fade-in" dir="rtl">
      <div className="relative w-full max-w-lg rounded-3xl bg-white border border-ink-200 shadow-2xl overflow-hidden animate-scale-up">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-ink-150 px-6 py-4 bg-ink-50/70">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-600 text-white shadow-xs">
              <Code2 className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-bold text-ink-950 text-sm sm:text-base">ایجاد تسک فنی و اسپرینت جدید</h3>
              <p className="text-[11px] text-ink-500">افزودن به بورد کانبان مهندسی ردوبز</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-xl text-ink-500 hover:bg-ink-200/70 hover:text-ink-900 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {error && (
            <div className="flex items-center gap-2 rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs text-rose-700">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-ink-800 mb-1.5">عنوان وظیفه / قابلیت فنی *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError("");
              }}
              placeholder="مثال: پیاده‌سازی کش توزیع‌شده ردیس برای سبد خرید"
              className="w-full h-11 px-3.5 rounded-xl border border-ink-200 text-xs sm:text-sm focus:border-accent-600 focus:ring-2 focus:ring-accent-100 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-ink-800 mb-1.5">پروژه مرتبط</label>
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-ink-200 text-xs sm:text-sm bg-white focus:border-accent-600 focus:ring-2 focus:ring-accent-100 outline-none"
              >
                <option value="aramesh">کلینیک آرامش</option>
                <option value="rokh">استودیو رخ</option>
                <option value="parsa">دفتر وکالت پارسا</option>
                <option value="mehr">مرکز مهر</option>
                <option value="infra">زیرساخت کلاد ردوبز</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-ink-800 mb-1.5">اولویت فنی</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as DevTask["priority"])}
                className="w-full h-11 px-3 rounded-xl border border-ink-200 text-xs sm:text-sm bg-white focus:border-accent-600 focus:ring-2 focus:ring-accent-100 outline-none"
              >
                <option value="critical">بحرانی (Critical P0)</option>
                <option value="high">بالا (High P1)</option>
                <option value="medium">متوسط (Medium P2)</option>
                <option value="low">پایین (Low P3)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-ink-800 mb-1.5">مسئول اجرا (Assignee)</label>
              <select
                value={assigneeId}
                onChange={(e) => setAssigneeId(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-ink-200 text-xs sm:text-sm bg-white focus:border-accent-600 focus:ring-2 focus:ring-accent-100 outline-none"
              >
                {devTeamMembers.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.role.split("و")[0]})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-ink-800 mb-1.5">تخمین استوری‌پوینت (Story Points)</label>
              <select
                value={storyPoints}
                onChange={(e) => setStoryPoints(Number(e.target.value))}
                className="w-full h-11 px-3 rounded-xl border border-ink-200 text-xs sm:text-sm bg-white focus:border-accent-600 focus:ring-2 focus:ring-accent-100 outline-none"
              >
                <option value={1}>۱ پوینت (خیلی ساده / زیر ۲ ساعت)</option>
                <option value={2}>۲ پوینت (ساده / نصف روز)</option>
                <option value={3}>۳ پوینت (متوسط / ۱ روز)</option>
                <option value={5}>۵ پوینت (پیچیده / ۲-۳ روز)</option>
                <option value={8}>۸ پوینت (بزرگ / ۱ هفته)</option>
                <option value={13}>۱۳ پوینت (Epic / نیازمند شکستن)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-ink-800 mb-1.5">شاخه گیت (Git Branch)</label>
            <input
              type="text"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              placeholder="feat/payment-gateway-refactor"
              className="w-full h-11 px-3.5 rounded-xl border border-ink-200 text-xs sm:text-sm font-mono dir-ltr text-left focus:border-accent-600 focus:ring-2 focus:ring-accent-100 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-ink-800 mb-1.5">تگ‌های فناوری (با کاما جدا کنید)</label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="Backend, Redis, Docker, Performance"
              className="w-full h-11 px-3.5 rounded-xl border border-ink-200 text-xs sm:text-sm focus:border-accent-600 focus:ring-2 focus:ring-accent-100 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-ink-800 mb-1.5">شرح جزییات و معیارهای پذیرش (Acceptance Criteria)</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="الزامات فنی، اندپوینت‌های ورودی و خروجی مورد انتظار و سناریوی تست..."
              className="w-full p-3 rounded-xl border border-ink-200 text-xs sm:text-sm focus:border-accent-600 focus:ring-2 focus:ring-accent-100 outline-none resize-none"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-ink-150">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-ink-200 text-ink-700 text-xs font-bold hover:bg-ink-100 transition-colors"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-accent-600 text-white text-xs font-bold hover:bg-accent-700 shadow-glow transition-all active:scale-95"
            >
              <Plus className="h-4 w-4" />
              <span>ثبت و ارسال به اسپرینت</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
