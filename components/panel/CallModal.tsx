"use client";

import { useState, useEffect, useRef } from "react";
import {
  Phone,
  PhoneOff,
  Video,
  VideoOff,
  Mic,
  MicOff,
  Monitor,
  Volume2,
  VolumeX,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  X,
  Maximize2,
  Minimize2,
  Sparkles,
  Users,
  MessageSquare,
  ShieldCheck,
  Headphones,
  ExternalLink,
  ChevronLeft,
} from "lucide-react";
import { toPersianDigits } from "@/lib/format";

export type CallType = "audio" | "video" | "schedule" | "phone";

export interface CallModalProps {
  isOpen: boolean;
  type?: CallType;
  initialType?: CallType;
  threadName?: string;
  recipientName?: string;
  recipientRole?: string;
  recipientAvatar?: string;
  onClose: () => void;
  onCallEnded?: (summary: { type: "audio" | "video"; duration: string }) => void;
  onMeetingScheduled?: (meeting: { title: string; date: string; time: string; platform: string }) => void;
}

export default function CallModal({
  isOpen,
  type,
  initialType,
  threadName = "پروژه کلینیک تخصصی آرامش",
  recipientName = "نگار رستمی",
  recipientRole = "مدیر ارشد پروژه و تیم مهندسی",
  recipientAvatar = "ن.ر",
  onClose,
  onCallEnded,
  onMeetingScheduled,
}: CallModalProps) {
  const currentInitialType = type || initialType || "audio";
  const [callType, setCallType] = useState<CallType>(currentInitialType);
  const [callStatus, setCallStatus] = useState<"ringing" | "connected" | "ended">("ringing");
  const [callSeconds, setCallSeconds] = useState(0);

  // Audio / Video control states
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isSpeakerMuted, setIsSpeakerMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Schedule Meeting State
  const [scheduleTopic, setScheduleTopic] = useState("بازبینی طرح استیجینگ و هماهنگی اسپرینت");
  const [scheduleDate, setScheduleDate] = useState("فردا (شنبه ۲۵ مرداد)");
  const [scheduleTime, setScheduleTime] = useState("۱۱:۰۰ الی ۱۱:۴۵");
  const [schedulePlatform, setSchedulePlatform] = useState<"skyroom" | "meet" | "phone">("skyroom");
  const [schedulePhoneNumber, setSchedulePhoneNumber] = useState("۰۹۱۲ ۳۴۵ ۶۷۸۹");
  const [scheduleNotes, setScheduleNotes] = useState("");
  const [scheduleSuccess, setScheduleSuccess] = useState(false);

  // Instant Callback Request State
  const [callbackRequested, setCallbackRequested] = useState(false);

  // Sync callType when opened with a different type
  useEffect(() => {
    if (isOpen) {
      setCallType(currentInitialType);
      setCallStatus(currentInitialType === "schedule" || currentInitialType === "phone" ? "connected" : "ringing");
      setCallSeconds(0);
      setIsMuted(false);
      setIsVideoOff(false);
      setIsScreenSharing(false);
      setScheduleSuccess(false);
      setCallbackRequested(false);
    }
  }, [isOpen, currentInitialType]);

  // Simulate ringing answering after 2.5 seconds
  useEffect(() => {
    if (isOpen && (callType === "audio" || callType === "video") && callStatus === "ringing") {
      const timer = setTimeout(() => {
        setCallStatus("connected");
      }, 2400);
      return () => clearTimeout(timer);
    }
  }, [isOpen, callType, callStatus]);

  // Call timer increment
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOpen && callStatus === "connected" && (callType === "audio" || callType === "video")) {
      interval = setInterval(() => {
        setCallSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen, callStatus, callType]);

  if (!isOpen) return null;

  function formatTime(totalSeconds: number) {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${toPersianDigits(String(mins).padStart(2, "0"))}:${toPersianDigits(
      String(secs).padStart(2, "0")
    )}`;
  }

  function handleEndCall() {
    setCallStatus("ended");
    const duration = formatTime(callSeconds);
    onCallEnded?.({
      type: callType === "video" ? "video" : "audio",
      duration,
    });
    setTimeout(() => {
      onClose();
    }, 400);
  }

  function handleScheduleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setScheduleSuccess(true);
    const platformLabel =
      schedulePlatform === "skyroom"
        ? "اتاق اختصاصی اسکای‌روم (بدون فیلتر)"
        : schedulePlatform === "meet"
        ? "Google Meet"
        : "تماس تلفنی مستقیم";

    onMeetingScheduled?.({
      title: scheduleTopic,
      date: scheduleDate,
      time: scheduleTime,
      platform: platformLabel,
    });

    setTimeout(() => {
      onClose();
    }, 1600);
  }

  function handleRequestCallback() {
    setCallbackRequested(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-ink-950/75 backdrop-blur-md transition-opacity"
      />

      {/* Main Container */}
      <div
        className={`relative z-10 w-full overflow-hidden rounded-3xl border border-ink-150 bg-white shadow-2xl transition-all duration-300 ${
          callType === "video"
            ? isFullscreen
              ? "fixed inset-4 max-w-none h-[calc(100vh-32px)]"
              : "max-w-4xl"
            : "max-w-xl"
        }`}
      >
        {/* ========================================================================= */}
        {/* VIEW 1 & 2: LIVE AUDIO OR VIDEO CALL                                      */}
        {/* ========================================================================= */}
        {(callType === "audio" || callType === "video") && (
          <div className="relative flex flex-col min-h-[480px] sm:min-h-[520px] bg-ink-950 text-white select-none">
            {/* Top Bar of Call */}
            <div className="relative z-20 flex items-center justify-between p-4 sm:p-5 bg-gradient-to-b from-black/80 to-transparent">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md">
                  {callType === "video" ? (
                    <Video className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Phone className="h-4 w-4 text-emerald-400" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-white">{recipientName}</h3>
                    <span className="rounded-md bg-white/15 px-2 py-0.5 text-[10px] text-white/90">
                      {recipientRole}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-white/70">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>
                      {callStatus === "ringing"
                        ? "در حال برقراری ارتباط امن..."
                        : `مدت مکالمه: ${formatTime(callSeconds)}`}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {callType === "video" && (
                  <button
                    type="button"
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    title={isFullscreen ? "خروج از تمام‌صفحه" : "تمام‌صفحه"}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white/80 hover:bg-white/20 transition-colors"
                  >
                    {isFullscreen ? (
                      <Minimize2 className="h-4 w-4" />
                    ) : (
                      <Maximize2 className="h-4 w-4" />
                    )}
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleEndCall}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white/80 hover:bg-white/20 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Middle Stage: Video or Audio Visualizer */}
            <div className="relative flex-1 flex flex-col items-center justify-center p-6 text-center">
              {callType === "video" ? (
                /* VIDEO STAGE */
                <div className="relative w-full h-full min-h-[320px] rounded-2xl bg-ink-900 border border-white/10 overflow-hidden flex items-center justify-center">
                  {/* Mock Remote Video Stream */}
                  <div className="absolute inset-0 bg-radial from-ink-800 to-ink-950 flex flex-col items-center justify-center p-6">
                    <div className="relative mb-4">
                      <div className="flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-3xl bg-accent-600/90 text-2xl sm:text-3xl font-black text-white shadow-2xl ring-4 ring-white/10">
                        {recipientAvatar}
                      </div>
                      <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-ink-950 text-[10px]">
                        <Video className="h-3 w-3 text-white" />
                      </span>
                    </div>

                    <p className="font-bold text-base text-white">{recipientName}</p>
                    <p className="text-xs text-white/60 mt-0.5">
                      دوربین و میکروفون متصل · کیفیت HD (1080p WebRTC)
                    </p>

                    {/* Audio reactive wave in video */}
                    {callStatus === "connected" && (
                      <div className="mt-4 flex items-center gap-1">
                        {[0.4, 0.8, 1, 0.6, 0.9, 0.5, 0.7, 0.3].map((height, i) => (
                          <span
                            key={i}
                            className="w-1 rounded-full bg-emerald-400 animate-pulse"
                            style={{
                              height: `${height * 24}px`,
                              animationDuration: `${0.6 + (i % 3) * 0.2}s`,
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Picture in Picture (Self Camera preview) */}
                  <div className="absolute bottom-4 right-4 z-10 w-28 sm:w-36 h-20 sm:h-24 rounded-2xl bg-ink-950/90 border border-white/20 shadow-xl overflow-hidden flex flex-col items-center justify-center text-center p-2">
                    {isVideoOff ? (
                      <div className="flex flex-col items-center justify-center text-[10px] text-white/60">
                        <VideoOff className="h-4 w-4 mb-1 text-red-400" />
                        <span>دوربین خاموش</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-[10px] text-emerald-400">
                        <div className="h-7 w-7 rounded-xl bg-ink-800 flex items-center justify-center text-xs font-bold text-white mb-1">
                          شما
                        </div>
                        <span className="text-[9.5px] text-white/70">تصویر شما (HD)</span>
                      </div>
                    )}
                  </div>

                  {/* Screen Sharing Watermark/Banner */}
                  {isScreenSharing && (
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-xl bg-amber-500/90 text-ink-950 px-3 py-1.5 text-xs font-bold shadow-lg">
                      <Monitor className="h-4 w-4" />
                      <span>اشتراک‌گذاری صفحه نمایش فعال است</span>
                    </div>
                  )}
                </div>
              ) : (
                /* AUDIO STAGE */
                <div className="flex flex-col items-center justify-center space-y-6 my-auto">
                  <div className="relative">
                    {/* Animated Pulsing Rings */}
                    {callStatus === "connected" && (
                      <>
                        <div className="absolute inset-0 -m-4 rounded-full bg-accent-500/20 animate-ping" />
                        <div className="absolute inset-0 -m-8 rounded-full bg-accent-500/10 animate-pulse" />
                      </>
                    )}
                    <div className="relative flex h-28 w-28 sm:h-32 sm:w-32 items-center justify-center rounded-3xl bg-accent-600 text-3xl sm:text-4xl font-black text-white shadow-2xl ring-4 ring-white/20">
                      {recipientAvatar}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-white">{recipientName}</h3>
                    <p className="text-xs text-white/70">
                      تماس صوتی آنلاین · پروژه {threadName}
                    </p>
                  </div>

                  {/* Audio Wave Visualizer */}
                  {callStatus === "connected" ? (
                    <div className="flex items-center gap-1.5 h-10 px-6 py-2 rounded-2xl bg-white/5 border border-white/10">
                      {[12, 24, 32, 18, 28, 36, 22, 30, 16, 26, 34, 20, 28, 14].map((h, i) => (
                        <span
                          key={i}
                          className="w-1.5 rounded-full bg-emerald-400 transition-all duration-300"
                          style={{
                            height: isMuted ? "4px" : `${h}px`,
                            animation: isMuted ? "none" : `pulse ${0.8 + (i % 4) * 0.2}s infinite`,
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-xs text-amber-300 animate-pulse">
                      <Clock className="h-4 w-4" />
                      <span>در حال زنگ زدن و اتصال مستقیم...</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Controls Bar */}
            <div className="relative z-20 flex flex-wrap items-center justify-center gap-3 sm:gap-4 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
              {/* Mute Mic Button */}
              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                title={isMuted ? "روشن کردن میکروفون" : "قطع میکروفون"}
                className={`flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-2xl transition-all ${
                  isMuted
                    ? "bg-red-500 text-white shadow-lg ring-2 ring-red-400"
                    : "bg-white/15 text-white hover:bg-white/25"
                }`}
              >
                {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </button>

              {/* Toggle Video Button */}
              <button
                type="button"
                onClick={() => {
                  if (callType === "audio") {
                    setCallType("video");
                    setIsVideoOff(false);
                  } else {
                    setIsVideoOff(!isVideoOff);
                  }
                }}
                title={isVideoOff ? "روشن کردن دوربین" : "خاموش کردن دوربین"}
                className={`flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-2xl transition-all ${
                  isVideoOff && callType === "video"
                    ? "bg-red-500 text-white ring-2 ring-red-400"
                    : callType === "video"
                    ? "bg-emerald-600 text-white"
                    : "bg-white/15 text-white hover:bg-white/25"
                }`}
              >
                {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
              </button>

              {/* Screen Sharing (in video call) */}
              {callType === "video" && (
                <button
                  type="button"
                  onClick={() => setIsScreenSharing(!isScreenSharing)}
                  title={isScreenSharing ? "توقف اشتراک تصویر" : "اشتراک‌گذاری صفحه نمایش (Screen Share)"}
                  className={`flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-2xl transition-all ${
                    isScreenSharing
                      ? "bg-amber-500 text-ink-950 font-bold"
                      : "bg-white/15 text-white hover:bg-white/25"
                  }`}
                >
                  <Monitor className="h-5 w-5" />
                </button>
              )}

              {/* Speaker Toggle */}
              <button
                type="button"
                onClick={() => setIsSpeakerMuted(!isSpeakerMuted)}
                title={isSpeakerMuted ? "روشن کردن صدا" : "قطع خروجی صدا"}
                className={`flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-2xl transition-all ${
                  isSpeakerMuted
                    ? "bg-red-500 text-white ring-2 ring-red-400"
                    : "bg-white/15 text-white hover:bg-white/25"
                }`}
              >
                {isSpeakerMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>

              {/* End Call Button */}
              <button
                type="button"
                onClick={handleEndCall}
                title="قطع تماس"
                className="flex h-12 w-16 sm:h-13 sm:w-20 items-center justify-center rounded-2xl bg-red-600 text-white shadow-xl hover:bg-red-700 active:scale-95 transition-all"
              >
                <PhoneOff className="h-6 w-6" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: SCHEDULE A MEETING / ONLINE REVIEW SESSION                         */}
        {/* ========================================================================= */}
        {callType === "schedule" && (
          <div className="p-6 sm:p-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-ink-150 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-50 text-accent-600 border border-accent-200">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-ink-950">
                    رزرو جلسه آنلاین و بازبینی پروژه
                  </h3>
                  <p className="text-xs text-ink-400">
                    جلسه ویدیویی با مدیر پروژه ({recipientName}) و لید دیزاینر
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="text-ink-400 hover:text-ink-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {scheduleSuccess ? (
              <div className="py-8 text-center space-y-4 animate-in zoom-in-95">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h4 className="font-display text-lg font-bold text-ink-950">
                  جلسه با موفقیت در تقویم ثبت شد!
                </h4>
                <p className="text-xs text-ink-600 leading-relaxed max-w-md mx-auto">
                  لینک جلسه اختصاصی و پیامک تایید به همراه دعوت‌نامه تقویم برای شما ارسال شد.
                </p>
                <div className="rounded-2xl bg-ink-50 p-4 max-w-sm mx-auto text-xs text-ink-700 space-y-1 font-mono">
                  <p>موضوع: {scheduleTopic}</p>
                  <p>زمان: {scheduleDate} · {scheduleTime}</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleScheduleSubmit} className="space-y-4">
                {/* Topic */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-ink-900 block">
                    موضوع جلسه / دستور کار:
                  </label>
                  <input
                    type="text"
                    required
                    value={scheduleTopic}
                    onChange={(e) => setScheduleTopic(e.target.value)}
                    className="w-full h-10 rounded-2xl border border-ink-200 bg-white px-3.5 text-xs text-ink-950 focus:border-accent-500 focus:outline-none transition-all"
                  />
                </div>

                {/* Date & Time Selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-ink-900 block">روز پیشنهادی:</label>
                    <select
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      className="w-full h-10 rounded-2xl border border-ink-200 bg-white px-3 text-xs text-ink-950 focus:border-accent-500 focus:outline-none"
                    >
                      <option value="فردا (شنبه ۲۵ مرداد)">فردا (شنبه ۲۵ مرداد)</option>
                      <option value="یکشنبه ۲۶ مرداد">یکشنبه ۲۶ مرداد</option>
                      <option value="دوشنبه ۲۷ مرداد">دوشنبه ۲۷ مرداد</option>
                      <option value="سه‌شنبه ۲۸ مرداد">سه‌شنبه ۲۸ مرداد</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-ink-900 block">بازه زمانی ساعت:</label>
                    <select
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      className="w-full h-10 rounded-2xl border border-ink-200 bg-white px-3 text-xs text-ink-950 focus:border-accent-500 focus:outline-none"
                    >
                      <option value="۱۰:۰۰ الی ۱۰:۴۵">۱۰:۰۰ الی ۱۰:۴۵ صبح</option>
                      <option value="۱۱:۰۰ الی ۱۱:۴۵">۱۱:۰۰ الی ۱۱:۴۵ صبح</option>
                      <option value="۱۴:۰۰ الی ۱۴:۴۵">۱۴:۰۰ الی ۱۴:۴۵ بعدازظهر</option>
                      <option value="۱۶:۰۰ الی ۱۶:۴۵">۱۶:۰۰ الی ۱۶:۴۵ عصر</option>
                    </select>
                  </div>
                </div>

                {/* Platform Options */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-ink-900 block">
                    بستر برگزاری جلسه آنلاین:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setSchedulePlatform("skyroom")}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                        schedulePlatform === "skyroom"
                          ? "border-accent-600 bg-accent-50 text-accent-950 ring-1 ring-accent-600"
                          : "border-ink-200 bg-white text-ink-700 hover:bg-ink-50"
                      }`}
                    >
                      <Video className="h-4 w-4 mb-1 text-accent-600" />
                      <span className="text-[11px] font-bold">اسکای‌روم</span>
                      <span className="text-[9.5px] text-ink-400">بدون فیلتر و سریع</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSchedulePlatform("meet")}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                        schedulePlatform === "meet"
                          ? "border-accent-600 bg-accent-50 text-accent-950 ring-1 ring-accent-600"
                          : "border-ink-200 bg-white text-ink-700 hover:bg-ink-50"
                      }`}
                    >
                      <Users className="h-4 w-4 mb-1 text-sky-600" />
                      <span className="text-[11px] font-bold">Google Meet</span>
                      <span className="text-[9.5px] text-ink-400">لینک تقویم گوگل</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSchedulePlatform("phone")}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                        schedulePlatform === "phone"
                          ? "border-accent-600 bg-accent-50 text-accent-950 ring-1 ring-accent-600"
                          : "border-ink-200 bg-white text-ink-700 hover:bg-ink-50"
                      }`}
                    >
                      <Phone className="h-4 w-4 mb-1 text-emerald-600" />
                      <span className="text-[11px] font-bold">تماس تلفنی</span>
                      <span className="text-[9.5px] text-ink-400">تماس مستقیم موبایل</span>
                    </button>
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-ink-900 block">
                    نکات یا فایل‌های مدنظر جهت بررسی (اختیاری):
                  </label>
                  <textarea
                    rows={2}
                    value={scheduleNotes}
                    onChange={(e) => setScheduleNotes(e.target.value)}
                    placeholder="مثال: بررسی ساختار فرم ثبت‌نام و تست درگاه پرداخت"
                    className="w-full rounded-2xl border border-ink-200 bg-white p-3 text-xs text-ink-950 focus:border-accent-500 focus:outline-none resize-none"
                  />
                </div>

                {/* Submit Action */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-2xl border border-ink-200 bg-white px-5 py-2.5 text-xs font-bold text-ink-700 hover:bg-ink-50"
                  >
                    انصراف
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-2xl bg-accent-600 px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-glow hover:bg-accent-700 transition-all active:scale-[0.98]"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>تایید و ثبت زمان جلسه</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 4: DIRECT PHONE CONTACT & INSTANT CALLBACK REQUEST                   */}
        {/* ========================================================================= */}
        {callType === "phone" && (
          <div className="p-6 sm:p-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-ink-150 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200">
                  <Headphones className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-ink-950">
                    اطلاعات تماس مستقیم و خطوط اختصاصی
                  </h3>
                  <p className="text-xs text-ink-400">
                    پاسخگویی شنبه تا چهارشنبه ۹ الی ۱۸ و پنج‌شنبه‌ها ۹ الی ۱۴
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="text-ink-400 hover:text-ink-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Direct Phone Numbers Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-2xl border border-ink-200 bg-ink-50/60 p-4 space-y-2">
                <span className="text-[11px] font-bold text-ink-500 block">
                  خط مستقیم دفتر مرکزی و پذیرش:
                </span>
                <a
                  href="tel:02188223344"
                  className="font-mono text-base font-black text-accent-700 dir-ltr block text-left hover:underline"
                >
                  ۰۲۱ - ۸۸۲۲ ۳۳۴۴
                </a>
                <span className="text-[10.5px] text-ink-400 block">داخلی ۲۰۴ (پشتیبانی فنی)</span>
              </div>

              <div className="rounded-2xl border border-accent-200 bg-accent-50/40 p-4 space-y-2">
                <span className="text-[11px] font-bold text-accent-800 block">
                  شماره مستقیم مدیر پروژه ({recipientName}):
                </span>
                <a
                  href="tel:09121112233"
                  className="font-mono text-base font-black text-ink-950 dir-ltr block text-left hover:underline"
                >
                  ۰۹۱۲ ۱۱۱ ۲۲۳۳
                </a>
                <span className="text-[10.5px] text-emerald-700 block">همراه اختصاصی کارفرمایان VIP</span>
              </div>
            </div>

            {/* Instant Callback Request Box */}
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-800">
                <Sparkles className="h-4 w-4 text-emerald-600" />
                <h4 className="text-xs font-bold">درخواست تماس فوری کارشناس با شما (کمتر از ۱۵ دقیقه)</h4>
              </div>
              <p className="text-xs text-emerald-950/80 leading-relaxed">
                اگر در لحظه نیاز به مشاوره تلفنی دارید، روی دکمه زیر کلیک کنید تا مدیر پروژه بلافاصله با شماره ثبت‌شده شما تماس بگیرد.
              </p>

              {callbackRequested ? (
                <div className="flex items-center gap-2 rounded-xl bg-emerald-600 text-white p-3 text-xs font-bold animate-in fade-in">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>درخواست تماس فوری ثبت شد. کارشناس تا حداکثر ۱۰ دقیقه آینده تماس خواهد گرفت.</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleRequestCallback}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 transition-all active:scale-[0.98]"
                >
                  <Phone className="h-4 w-4" />
                  <span>درخواست تماس فوری به شماره ۰۹۱۲ ۳۴۵ ۶۷۸۹</span>
                </button>
              )}
            </div>

            {/* Modal Bottom Switchers */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-ink-150">
              <button
                type="button"
                onClick={() => setCallType("audio")}
                className="inline-flex items-center gap-1.5 rounded-2xl border border-ink-200 bg-white px-4 py-2.5 text-xs font-bold text-ink-700 hover:bg-ink-50"
              >
                <Phone className="h-4 w-4 text-accent-600" />
                <span>برقراری تماس صوتی آنلاین</span>
              </button>

              <button
                type="button"
                onClick={() => setCallType("schedule")}
                className="inline-flex items-center gap-1.5 rounded-2xl bg-accent-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-accent-700 shadow-glow"
              >
                <Calendar className="h-4 w-4" />
                <span>رزرو جلسه آنلاین ویدیویی</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
