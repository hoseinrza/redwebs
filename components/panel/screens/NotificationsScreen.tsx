"use client";

import { useState } from "react";
import {
  Bell,
  CheckCircle2,
  Clock,
  Sparkles,
  Layers,
  FileText,
  MessageSquare,
  ShieldCheck,
  CheckCheck,
  Trash2,
  ArrowUpLeft,
  ChevronLeft,
  Filter,
} from "lucide-react";
import { toPersianDigits } from "@/lib/format";

interface NotificationItem {
  id: string;
  title: string;
  body: string;
  time: string;
  unread: boolean;
  category: "project" | "finance" | "support" | "system";
  actionLabel?: string;
  actionScreen?: string;
  targetId?: string;
}

const initialNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    title: "نسخه تعاملی و استیجینگ صفحه اصلی آماده بازبینی است",
    body: "طرح جدید صفحه اصلی کلینیک آرامش با آخرین اصلاحات فرم نوبت‌دهی توسط تیم فرانت‌اند روی سرور تست دیپلوی شد.",
    time: "۲ ساعت پیش",
    unread: true,
    category: "project",
    actionLabel: "مشاهده استیجینگ و بازبینی",
    actionScreen: "detail",
    targetId: "aramesh",
  },
  {
    id: "notif-2",
    title: "صورتحساب قسط دوم پروژه صادر شد",
    body: "فاکتور مربوط به مرحله دیزاین سیستم و رابط کاربری به مبلغ ۸٬۵۰۰٬۰۰۰ تومان با سررسید ۲۵ مرداد صادر گردید.",
    time: "دیروز ۱۴:۲۰",
    unread: true,
    category: "finance",
    actionLabel: "مشاهده و تسویه آنلاین",
    actionScreen: "invoices",
  },
  {
    id: "notif-3",
    title: "پیام جدید از مدیر پروژه (نگار رستمی)",
    body: "«فرم نوبت‌دهی پزشکان بهینه‌سازی شد و نسخه جدید آماده بررسی است.»",
    time: "دیروز ۱۶:۰۵",
    unread: true,
    category: "support",
    actionLabel: "پاسخ در گفتگو",
    actionScreen: "messages",
  },
  {
    id: "notif-4",
    title: "تست موفقیت‌آمیز درگاه پرداخت بانکی شاپرک",
    body: "تست‌های پذیرندگی و وب‌هوک درگاه پرداخت زرین‌پال و سپهر برای وب‌سایت استودیو رخ با موفقیت تایید شد.",
    time: "۳ روز پیش",
    unread: false,
    category: "project",
    actionLabel: "مشاهده پروژه استودیو رخ",
    actionScreen: "detail",
    targetId: "rokh",
  },
  {
    id: "notif-5",
    title: "مرحله محتوانویسی و نگارش سئو تکمیل شد",
    body: "متون و مقالات اختصاصی صفحات خدمات کلینیک آرامش به تایید سرپرست محتوا رسید.",
    time: "۴ روز پیش",
    unread: false,
    category: "project",
  },
  {
    id: "notif-6",
    title: "پروژه دفتر وکالت پارسا با موفقیت تحویل داده شد",
    body: "تمامی سورس‌کدها، فایل‌های خروجی فیگما و لایسنس مادام‌العمر در بخش تحویلی‌ها بارگذاری شدند.",
    time: "۱۸ خرداد ۱۴۰۴",
    unread: false,
    category: "system",
    actionLabel: "دانلود آرشیو فایل‌ها",
    actionScreen: "files",
  },
];

export default function NotificationsScreen({
  onNavigate,
  onOpenProject,
}: {
  onNavigate?: (screen: string) => void;
  onOpenProject?: (id: string) => void;
}) {
  const [items, setItems] = useState<NotificationItem[]>(initialNotifications);
  const [filter, setFilter] = useState<"all" | "project" | "finance" | "support">("all");

  const unreadCount = items.filter((n) => n.unread).length;

  const filteredItems = items.filter((item) => {
    if (filter === "all") return true;
    return item.category === filter;
  });

  function markAllAsRead() {
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })));
  }

  function markSingleAsRead(id: string) {
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  }

  function handleAction(notif: NotificationItem) {
    markSingleAsRead(notif.id);
    if (notif.actionScreen === "detail" && notif.targetId && onOpenProject) {
      onOpenProject(notif.targetId);
    } else if (notif.actionScreen && onNavigate) {
      onNavigate(notif.actionScreen);
    }
  }

  return (
    <div className="flex flex-col gap-6 px-4 py-6 sm:px-8 sm:py-8">
      {/* 1. Header & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-ink-150 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-50 text-accent-600 shadow-xs border border-accent-200/60">
            <Bell className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display text-base sm:text-lg font-bold text-ink-950">
                مرکز اعلان‌ها و رویدادهای پروژه
              </h2>
              {unreadCount > 0 && (
                <span className="rounded-full bg-accent-600 px-2.5 py-0.5 text-[11px] font-bold text-white shadow-xs">
                  {toPersianDigits(unreadCount)} جدید
                </span>
              )}
            </div>
            <p className="text-xs text-ink-400 mt-0.5">
              اطلاع‌رسانی بلادرنگ از مراحل توسعه، تغییر وضعیت فاکتورها و پیام‌های تیم فنی
            </p>
          </div>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={markAllAsRead}
            className="inline-flex items-center gap-2 rounded-2xl border border-ink-200 bg-white px-4 py-2.5 text-xs font-bold text-ink-700 hover:bg-ink-50 hover:text-ink-950 transition-all shadow-xs w-fit"
          >
            <CheckCheck className="h-4 w-4 text-emerald-600" />
            <span>علامت‌گذاری همه به عنوان خوانده‌شده</span>
          </button>
        )}
      </div>

      {/* 2. Category Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={`rounded-2xl px-4 py-2 text-xs font-bold transition-all ${
            filter === "all"
              ? "bg-ink-950 text-white shadow-xs"
              : "bg-white text-ink-600 border border-ink-200 hover:bg-ink-50"
          }`}
        >
          همه رویدادها ({toPersianDigits(items.length)})
        </button>
        <button
          type="button"
          onClick={() => setFilter("project")}
          className={`rounded-2xl px-4 py-2 text-xs font-bold transition-all ${
            filter === "project"
              ? "bg-accent-600 text-white shadow-xs"
              : "bg-white text-ink-600 border border-ink-200 hover:bg-ink-50"
          }`}
        >
          توسعه و فنی ({toPersianDigits(items.filter((i) => i.category === "project").length)})
        </button>
        <button
          type="button"
          onClick={() => setFilter("finance")}
          className={`rounded-2xl px-4 py-2 text-xs font-bold transition-all ${
            filter === "finance"
              ? "bg-amber-600 text-white shadow-xs"
              : "bg-white text-ink-600 border border-ink-200 hover:bg-ink-50"
          }`}
        >
          مالی و فاکتورها ({toPersianDigits(items.filter((i) => i.category === "finance").length)})
        </button>
        <button
          type="button"
          onClick={() => setFilter("support")}
          className={`rounded-2xl px-4 py-2 text-xs font-bold transition-all ${
            filter === "support"
              ? "bg-sky-600 text-white shadow-xs"
              : "bg-white text-ink-600 border border-ink-200 hover:bg-ink-50"
          }`}
        >
          پیام‌ها و پشتیبانی ({toPersianDigits(items.filter((i) => i.category === "support").length)})
        </button>
      </div>

      {/* 3. Notifications List */}
      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <div className="rounded-3xl border border-ink-200 bg-white p-12 text-center text-ink-400 space-y-3">
            <Bell className="mx-auto h-10 w-10 text-ink-300 stroke-1" />
            <p className="text-sm font-semibold text-ink-700">اعلانی در این دسته‌بندی وجود ندارد.</p>
          </div>
        ) : (
          filteredItems.map((n) => {
            const isUnread = n.unread;
            const categoryMeta = getCategoryMeta(n.category);
            const CategoryIcon = categoryMeta.icon;

            return (
              <div
                key={n.id}
                className={`group relative flex flex-col sm:flex-row sm:items-start justify-between gap-4 rounded-3xl border p-5 sm:p-6 transition-all ${
                  isUnread
                    ? "border-accent-200 bg-white shadow-card ring-1 ring-accent-100"
                    : "border-ink-150 bg-ink-50/60 hover:bg-white hover:border-ink-200"
                }`}
              >
                <div className="flex items-start gap-3.5 min-w-0 flex-1">
                  {/* Category Icon */}
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${categoryMeta.bg} ${categoryMeta.color} shadow-xs`}
                  >
                    <CategoryIcon className="h-5 w-5" />
                  </div>

                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {isUnread && (
                        <span className="flex h-2 w-2 rounded-full bg-accent-600 animate-pulse" />
                      )}
                      <h3
                        className={`text-xs sm:text-sm font-bold ${
                          isUnread ? "text-ink-950" : "text-ink-800"
                        }`}
                      >
                        {n.title}
                      </h3>
                      <span
                        className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${categoryMeta.badgeClass}`}
                      >
                        {categoryMeta.label}
                      </span>
                    </div>

                    <p className="text-xs text-ink-500 leading-relaxed max-w-3xl">
                      {n.body}
                    </p>

                    <div className="flex items-center gap-2 pt-1 text-[11px] text-ink-400 font-mono">
                      <Clock className="h-3 w-3" />
                      <span>{toPersianDigits(n.time)}</span>
                    </div>
                  </div>
                </div>

                {/* Direct CTA Action Button */}
                <div className="flex items-center gap-2 shrink-0 sm:self-center border-t sm:border-t-0 pt-3 sm:pt-0 border-ink-100">
                  {n.actionLabel && (
                    <button
                      type="button"
                      onClick={() => handleAction(n)}
                      className="inline-flex items-center gap-1.5 rounded-2xl bg-accent-50 border border-accent-200 px-4 py-2.5 text-xs font-bold text-accent-700 hover:bg-accent-600 hover:text-white transition-all shadow-xs"
                    >
                      <span>{n.actionLabel}</span>
                      <ArrowUpLeft className="h-3.5 w-3.5" />
                    </button>
                  )}

                  {isUnread && (
                    <button
                      type="button"
                      onClick={() => markSingleAsRead(n.id)}
                      title="علامت به عنوان خوانده‌شده"
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-ink-200 text-ink-400 hover:bg-ink-100 hover:text-ink-800 transition-colors"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function getCategoryMeta(cat: NotificationItem["category"]) {
  switch (cat) {
    case "project":
      return {
        label: "فنی و اسپرینت",
        icon: Layers,
        bg: "bg-accent-50",
        color: "text-accent-600",
        badgeClass: "bg-accent-50 text-accent-700 border border-accent-200/70",
      };
    case "finance":
      return {
        label: "مالی و فاکتور",
        icon: FileText,
        bg: "bg-amber-50",
        color: "text-amber-600",
        badgeClass: "bg-amber-50 text-amber-800 border border-amber-200/70",
      };
    case "support":
      return {
        label: "پیام و گفتگو",
        icon: MessageSquare,
        bg: "bg-sky-50",
        color: "text-sky-600",
        badgeClass: "bg-sky-50 text-sky-800 border border-sky-200/70",
      };
    case "system":
    default:
      return {
        label: "سیستمی",
        icon: ShieldCheck,
        bg: "bg-emerald-50",
        color: "text-emerald-600",
        badgeClass: "bg-emerald-50 text-emerald-700 border border-emerald-200/70",
      };
  }
}
