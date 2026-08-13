"use client";

import { KeyboardEvent, useState, useRef, useEffect } from "react";
import {
  Send,
  Paperclip,
  Image as ImageIcon,
  Smile,
  Search,
  CheckCheck,
  Check,
  Phone,
  Video,
  FileText,
  Sparkles,
  Clock,
  ShieldCheck,
  Plus,
  Download,
  Info,
  X,
  ChevronLeft,
  User,
  MessageSquare,
  Layers,
  ArrowUpLeft,
} from "lucide-react";
import { portalMessages, portalThreads, PortalThread } from "@/lib/data/portal";
import { toPersianDigits } from "@/lib/format";

interface MessageItem {
  id?: string;
  text: string;
  me: boolean;
  time?: string;
  senderName?: string;
  senderRole?: string;
  attachment?: {
    name: string;
    size: string;
    type: "figma" | "pdf" | "image";
  };
}

const initialEnrichedMessages: Record<string, MessageItem[]> = {
  team: [
    {
      id: "m-1",
      text: "سلام آرمان عزیز، نسخه جدید و تعاملی صفحه اصلی وب‌سایت کلینیک آرامش (Staging v3) روی سرور تست بارگذاری شد. لطفاً بررسی اولیه رو انجام بدید.",
      me: false,
      time: "۱۰:۱۵",
      senderName: "نگار رستمی",
      senderRole: "مدیر پروژه",
      attachment: {
        name: "aramesh-homepage-v3.fig",
        size: "۱۴.۲ مگابایت",
        type: "figma",
      },
    },
    {
      id: "m-2",
      text: "سلام و خسته نباشید به تیم ردوبز. طرح رو دیدم، انیمیشن هدر و سرعت لود فوق‌العاده شده! دستتون درد نکنه.",
      me: true,
      time: "۱۰:۴۲",
    },
    {
      id: "m-3",
      text: "فقط در فرم رزرو نوبت، اگر امکان داره فیلد انتخاب پزشک متخصص قبل از تقویم قرار بگیره تا کاربر اول دکتر رو انتخاب کنه.",
      me: true,
      time: "۱۰:۴۴",
    },
    {
      id: "m-4",
      text: "نکته بسیار بجایی بود؛ مهدی کاظمی (طراح UI) همین تغییر رو روی کامپوننت فرم اعمال کرد و تا انتهای امروز نسخه آپدیت‌شده روی استیجینگ دیپلوی میشه.",
      me: false,
      time: "۱۱:۰۵",
      senderName: "نگار رستمی",
      senderRole: "مدیر پروژه",
    },
  ],
  support: [
    {
      id: "s-1",
      text: "کارفرمای گرامی، فاکتور قسط دوم قرارداد طراحی و توسعه پروژه با عنوان «قسط دوم - طراحی رابط کاربری و دیزاین سیستم» صادر شد.",
      me: false,
      time: "دیروز ۱۴:۲۰",
      senderName: "امور مالی ردوبز",
      senderRole: "حسابداری",
      attachment: {
        name: "Invoice-INV-4029.pdf",
        size: "۱.۴ مگابایت",
        type: "pdf",
      },
    },
    {
      id: "s-2",
      text: "ممنون، از طریق درگاه پرداخت آنلاین میز کارفرما تسویه شد.",
      me: true,
      time: "دیروز ۱۵:۱۰",
    },
    {
      id: "s-3",
      text: "پرداخت شما با موفقیت ثبت و تایید گردید. رسید رسمی به همراه فاکتور مهرشده در بخش فاکتورها در دسترس شماست.",
      me: false,
      time: "دیروز ۱۵:۱۲",
      senderName: "امور مالی ردوبز",
      senderRole: "حسابداری",
    },
  ],
  rokh: [
    {
      id: "r-1",
      text: "سلام، تست‌های امنیت درگاه زرین‌پال و سپهر برای وب‌سایت استودیو رخ با موفقیت پاس شد. سیستم آماده لانچ روی دامنه اصلی است.",
      me: false,
      time: "۳ روز پیش",
      senderName: "سینا احمدی",
      senderRole: "توسعه‌دهنده ارشد",
    },
    {
      id: "r-2",
      text: "بسیار عالی! پس لطفاً فرآیند تنظیم DNS و اتصال SSL نهایی رو شروع کنید.",
      me: true,
      time: "۳ روز پیش",
    },
  ],
};

const quickReplies = [
  "طرح استیجینگ تایید است 👍",
  "درخواست جلسه آنلاین هماهنگی 📅",
  "فایل‌های تکمیلی رو ارسال کردم 📎",
  "لطفاً زمان تحویل نهایی رو بفرمایید ⏳",
];

export default function MessagesScreen() {
  const [threadId, setThreadId] = useState(portalThreads[0].id);
  const [draft, setDraft] = useState("");
  const [messagesState, setMessagesState] = useState<Record<string, MessageItem[]>>(initialEnrichedMessages);
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<"all" | "projects" | "support">("all");
  const [showInfoSidebar, setShowInfoSidebar] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const thread = portalThreads.find((t) => t.id === threadId) ?? portalThreads[0];
  const messages = messagesState[threadId] ?? [];
  const messagesCount = messages.length;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesCount, threadId]);

  function selectThread(id: string) {
    setThreadId(id);
    setMobileView("chat");
  }

  function handleSend(customText?: string) {
    const text = (customText || draft).trim();
    if (!text) return;

    const now = new Date();
    const currentTime = `${toPersianDigits(now.getHours())}:${toPersianDigits(
      String(now.getMinutes()).padStart(2, "0")
    )}`;

    const newMsg: MessageItem = {
      id: `msg-${Date.now()}`,
      text,
      me: true,
      time: currentTime,
    };

    setMessagesState((prev) => ({
      ...prev,
      [threadId]: [...(prev[threadId] ?? []), newMsg],
    }));

    if (!customText) setDraft("");

    // Simulate quick intelligent acknowledgment after 1.5s
    if (threadId === "team") {
      setTimeout(() => {
        setIsTyping(true);
      }, 700);

      setTimeout(() => {
        setIsTyping(false);
        const replyMsg: MessageItem = {
          id: `reply-${Date.now()}`,
          text: "پیام شما دریافت شد و به اطلاع تیم فنی رسید. در اسرع وقت اقدام لازم انجام خواهد شد.",
          me: false,
          time: `${toPersianDigits(now.getHours())}:${toPersianDigits(
            String(now.getMinutes() + 1).padStart(2, "0")
          )}`,
          senderName: "نگار رستمی",
          senderRole: "مدیر پروژه",
        };
        setMessagesState((prev) => ({
          ...prev,
          [threadId]: [...(prev[threadId] ?? []), replyMsg],
        }));
      }, 2200);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  }

  const filteredThreads = portalThreads.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.preview.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (filterCategory === "projects") return t.id !== "support";
    if (filterCategory === "support") return t.id === "support";
    return true;
  });

  return (
    <div className="flex h-[calc(100vh-72px)] overflow-hidden bg-ink-50">
      {/* ---------------------------------------------------- */}
      {/* 1. THREADS LIST COLUMN                               */}
      {/* ---------------------------------------------------- */}
      <div
        className={`flex-col border-l border-ink-150 bg-white transition-all duration-200 sm:flex sm:w-[320px] lg:w-[360px] flex-none ${
          mobileView === "chat" ? "hidden" : "flex w-full"
        }`}
      >
        {/* Thread List Header & Search */}
        <div className="p-4 border-b border-ink-150 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-accent-600" />
              <h2 className="font-display font-bold text-sm sm:text-base text-ink-950">
                پیام‌ها و پشتیبانی
              </h2>
            </div>
            <span className="rounded-full bg-accent-50 px-2.5 py-0.5 text-[11px] font-bold text-accent-700 border border-accent-200/60">
              {toPersianDigits(filteredThreads.length)} گفتگو
            </span>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو در نام پروژه یا پیام‌ها..."
              className="w-full h-10 rounded-2xl border border-ink-200 bg-ink-50/70 pr-9 pl-4 text-xs text-ink-950 placeholder:text-ink-400 focus:border-accent-500 focus:bg-white focus:outline-none transition-all"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 pt-1">
            <button
              type="button"
              onClick={() => setFilterCategory("all")}
              className={`rounded-xl px-3 py-1.5 text-[11px] font-bold transition-all ${
                filterCategory === "all"
                  ? "bg-accent-600 text-white shadow-xs"
                  : "bg-ink-100/70 text-ink-600 hover:bg-ink-100 hover:text-ink-950"
              }`}
            >
              همه
            </button>
            <button
              type="button"
              onClick={() => setFilterCategory("projects")}
              className={`rounded-xl px-3 py-1.5 text-[11px] font-bold transition-all ${
                filterCategory === "projects"
                  ? "bg-accent-600 text-white shadow-xs"
                  : "bg-ink-100/70 text-ink-600 hover:bg-ink-100 hover:text-ink-950"
              }`}
            >
              تیم پروژه
            </button>
            <button
              type="button"
              onClick={() => setFilterCategory("support")}
              className={`rounded-xl px-3 py-1.5 text-[11px] font-bold transition-all ${
                filterCategory === "support"
                  ? "bg-accent-600 text-white shadow-xs"
                  : "bg-ink-100/70 text-ink-600 hover:bg-ink-100 hover:text-ink-950"
              }`}
            >
              مالی و پشتیبانی
            </button>
          </div>
        </div>

        {/* Threads List Items */}
        <div className="flex-1 overflow-y-auto divide-y divide-ink-100">
          {filteredThreads.length === 0 ? (
            <div className="p-8 text-center text-xs text-ink-400 space-y-2">
              <Search className="mx-auto h-8 w-8 text-ink-300 stroke-1" />
              <p>گفتگویی با این مشخصات یافت نشد.</p>
            </div>
          ) : (
            filteredThreads.map((t) => {
              const isSelected = t.id === threadId;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => selectThread(t.id)}
                  className={`w-full flex items-start gap-3.5 p-4 text-right transition-all group ${
                    isSelected
                      ? "bg-accent-50/80 border-r-4 border-r-accent-600"
                      : "hover:bg-ink-50/70 bg-white"
                  }`}
                >
                  <div className="relative flex-none">
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-2xl text-xs font-bold text-white shadow-xs"
                      style={{ background: t.avatarBg }}
                    >
                      {t.initials}
                    </span>
                    <span className="absolute -bottom-0.5 -left-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span
                        className={`truncate text-xs sm:text-sm font-bold ${
                          isSelected ? "text-accent-950" : "text-ink-950"
                        }`}
                      >
                        {t.name}
                      </span>
                      <span className="flex-none text-[10.5px] text-ink-400 font-mono">
                        {toPersianDigits(t.time)}
                      </span>
                    </div>

                    <p className="truncate text-xs text-ink-500 leading-relaxed">
                      {t.preview}
                    </p>

                    <div className="mt-2 flex items-center justify-between">
                      <span className="inline-block rounded-md bg-ink-100 px-2 py-0.5 text-[10px] font-semibold text-ink-600">
                        {t.id === "support" ? "پشتیبانی مالی" : "اسپرینت فعال"}
                      </span>

                      {t.unread && (
                        <span className="flex h-2 w-2 rounded-full bg-accent-600 animate-pulse" />
                      )}
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Quick SLA Help Box at bottom of list */}
        <div className="p-3.5 border-t border-ink-150 bg-ink-50/50">
          <div className="flex items-center gap-2.5 rounded-2xl bg-white p-3 border border-ink-150 shadow-xs">
            <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
            <div className="min-w-0 flex-1 text-[11px]">
              <span className="font-bold text-ink-900 block">پشتیبانی اختصاصی کارفرما</span>
              <span className="text-ink-500 block">میانگین زمان پاسخ: کمتر از ۱ ساعت</span>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 2. CHAT CANVAS & CONVERSATION AREA                   */}
      {/* ---------------------------------------------------- */}
      <div
        className={`flex-1 flex-col bg-ink-50/50 min-w-0 overflow-hidden sm:flex ${
          mobileView === "list" ? "hidden" : "flex"
        }`}
      >
        {/* Chat Active Header */}
        <div className="flex h-[72px] flex-none items-center justify-between gap-3 border-b border-ink-150 bg-white/95 backdrop-blur-md px-4 sm:px-6">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileView("list")}
              aria-label="بازگشت به لیست گفتگوها"
              className="flex h-9 w-9 flex-none items-center justify-center rounded-xl border border-ink-200 text-ink-700 hover:bg-ink-50 sm:hidden"
            >
              <ChevronLeft className="h-5 w-5 rotate-180" />
            </button>

            <div className="relative">
              <span
                className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl text-xs font-bold text-white shadow-xs"
                style={{ background: thread.avatarBg }}
              >
                {thread.initials}
              </span>
              <span className="absolute -bottom-0.5 -left-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="truncate text-sm sm:text-base font-bold text-ink-950">
                  {thread.name}
                </h3>
                <span className="hidden sm:inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-[10.5px] font-bold text-emerald-700 border border-emerald-200">
                  آنلاین و فعال
                </span>
              </div>
              <p className="text-[11px] text-ink-400 truncate mt-0.5">
                کانال گفتگوی مستقیم کارفرما با تیم مهندسی و مدیر پروژه
              </p>
            </div>
          </div>

          {/* Header Action Tools */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              title="توضیحات و فایل‌های پیوست"
              onClick={() => setShowInfoSidebar(!showInfoSidebar)}
              className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all ${
                showInfoSidebar
                  ? "bg-accent-600 text-white border-accent-600 shadow-xs"
                  : "border-ink-200 bg-white text-ink-600 hover:bg-ink-50 hover:text-ink-950"
              }`}
            >
              <Info className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* Date separator */}
          <div className="flex items-center justify-center my-2">
            <span className="rounded-full bg-ink-200/60 px-3.5 py-1 text-[11px] font-bold text-ink-600">
              امروز
            </span>
          </div>

          {messages.map((m, idx) => {
            const isMe = m.me;

            return (
              <div
                key={m.id || idx}
                className={`flex flex-col ${isMe ? "items-end" : "items-start"} space-y-1.5`}
              >
                {!isMe && m.senderName && (
                  <div className="flex items-center gap-2 px-1 text-[11px]">
                    <span className="font-bold text-ink-900">{m.senderName}</span>
                    {m.senderRole && (
                      <span className="rounded-md bg-ink-150/80 px-1.5 py-0.5 text-[10px] text-ink-600 font-medium">
                        {m.senderRole}
                      </span>
                    )}
                  </div>
                )}

                <div
                  className={`relative max-w-[88%] sm:max-w-[70%] rounded-3xl p-4 text-xs sm:text-sm leading-relaxed shadow-xs transition-all ${
                    isMe
                      ? "bg-accent-600 text-white rounded-bl-sm"
                      : "bg-white text-ink-950 border border-ink-200/80 rounded-br-sm"
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>

                  {/* Attachment Box if any */}
                  {m.attachment && (
                    <div
                      className={`mt-3 flex items-center justify-between gap-3 rounded-2xl p-3 border transition-colors ${
                        isMe
                          ? "bg-white/10 border-white/20 text-white"
                          : "bg-ink-50 border-ink-200 text-ink-900"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                            isMe ? "bg-white/20 text-white" : "bg-accent-50 text-accent-700"
                          }`}
                        >
                          <FileText className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-xs font-bold font-mono dir-ltr">
                            {m.attachment.name}
                          </p>
                          <span
                            className={`text-[10px] ${
                              isMe ? "text-white/80" : "text-ink-400"
                            }`}
                          >
                            {m.attachment.size}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        aria-label="دانلود فایل"
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-transform hover:scale-105 ${
                          isMe
                            ? "bg-white text-accent-700 shadow-xs"
                            : "bg-accent-600 text-white shadow-xs"
                        }`}
                      >
                        <Download className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}

                  {/* Message Meta (Time & Status) */}
                  <div
                    className={`mt-2 flex items-center justify-end gap-1.5 text-[10.5px] font-mono ${
                      isMe ? "text-accent-100" : "text-ink-400"
                    }`}
                  >
                    <span>{toPersianDigits(m.time || "۱۰:۳۰")}</span>
                    {isMe && <CheckCheck className="h-3.5 w-3.5 text-accent-200" />}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-ink-500 bg-white border border-ink-200 rounded-2xl px-3.5 py-2 w-fit animate-in fade-in">
              <span className="font-semibold text-ink-800">نگار رستمی در حال نوشتن...</span>
              <div className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-600 animate-bounce" />
                <span className="h-1.5 w-1.5 rounded-full bg-accent-600 animate-bounce [animation-delay:0.2s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-accent-600 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Reply Chips */}
        <div className="px-4 py-2 bg-white/60 border-t border-ink-150 overflow-x-auto flex items-center gap-2 no-scrollbar">
          <span className="text-[11px] font-bold text-ink-400 shrink-0 flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-amber-500" />
            <span>پاسخ‌های سریع:</span>
          </span>
          {quickReplies.map((reply, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSend(reply)}
              className="shrink-0 rounded-full border border-ink-200 bg-white px-3 py-1 text-[11px] font-medium text-ink-700 hover:border-accent-400 hover:bg-accent-50 hover:text-accent-800 transition-all shadow-xs"
            >
              {reply}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-ink-150">
          <div className="flex items-center gap-2 rounded-2xl border border-ink-200 bg-ink-50/70 p-1.5 focus-within:border-accent-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-accent-100 transition-all">
            <button
              type="button"
              aria-label="پیوست فایل"
              title="پیوست تصویر یا مستندات"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-ink-500 hover:bg-ink-100 hover:text-ink-950 transition-colors"
            >
              <Paperclip className="h-4 w-4" />
            </button>

            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="پیام، نظر درباره طرح، یا درخواست خود را بنویسید... (Enter برای ارسال)"
              className="w-full bg-transparent px-2 text-xs sm:text-sm text-ink-950 placeholder:text-ink-400 focus:outline-none"
            />

            <button
              type="button"
              onClick={() => handleSend()}
              disabled={!draft.trim()}
              aria-label="ارسال پیام"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-600 text-white shadow-glow hover:bg-accent-700 transition-all active:scale-95 disabled:opacity-40 disabled:hover:bg-accent-600 disabled:shadow-none"
            >
              <Send className="h-4 w-4 rotate-180" />
            </button>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 3. COLLAPSIBLE PROJECT & TEAM INFO PANEL (RIGHT)     */}
      {/* ---------------------------------------------------- */}
      {showInfoSidebar && (
        <div className="hidden lg:flex w-[290px] flex-none flex-col border-r border-ink-150 bg-white p-5 overflow-y-auto space-y-5 animate-in slide-in-from-right duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-ink-150">
            <span className="text-xs font-bold text-ink-950 flex items-center gap-2">
              <Info className="h-4 w-4 text-accent-600" />
              <span>اطلاعات پروژه و تیم</span>
            </span>
            <button
              type="button"
              onClick={() => setShowInfoSidebar(false)}
              className="text-ink-400 hover:text-ink-900"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Project Summary Card */}
          <div className="rounded-2xl border border-ink-150 bg-ink-50/70 p-4 space-y-2">
            <span className="text-[11px] font-bold text-accent-700 block">پروژه متصل:</span>
            <h4 className="text-xs font-bold text-ink-950">کلینیک تخصصی آرامش</h4>
            <p className="text-[11px] text-ink-500">طراحی اختصاصی Next.js + پنل نوبت‌دهی آنلاین</p>
            <div className="pt-2 flex items-center justify-between text-[11px]">
              <span className="text-ink-500">پیشرفت کل:</span>
              <span className="font-bold text-emerald-700">۷۰٪ تکمیل</span>
            </div>
          </div>

          {/* Team Assigned */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-ink-800 block">اعضای فنی پاسخگو:</span>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-ink-900 text-[11px] font-bold text-white">
                  ن.ر
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-bold text-ink-900">نگار رستمی</p>
                  <p className="text-[10.5px] text-ink-400">مدیر ارشد پروژه</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent-600 text-[11px] font-bold text-white">
                  م.ک
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-bold text-ink-900">مهدی کاظمی</p>
                  <p className="text-[10.5px] text-ink-400">طراح ارشد رابط کاربری (UI/UX)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pinned Files in this Chat */}
          <div className="space-y-2.5 pt-2 border-t border-ink-150">
            <span className="text-xs font-bold text-ink-800 block">فایل‌های اشتراک‌گذاری‌شده:</span>
            <div className="rounded-xl border border-ink-150 bg-white p-2.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 min-w-0">
                <FileText className="h-4 w-4 text-accent-600 shrink-0" />
                <span className="truncate text-[11.5px] font-mono">aramesh-homepage-v3.fig</span>
              </div>
              <Download className="h-3.5 w-3.5 text-ink-400 shrink-0 hover:text-accent-600 cursor-pointer" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
