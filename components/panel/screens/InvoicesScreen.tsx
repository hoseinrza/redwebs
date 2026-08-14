"use client";

import { useState } from "react";
import {
  FileText,
  CheckCircle2,
  Clock,
  Download,
  CreditCard,
  ArrowUpLeft,
  ShieldCheck,
  Building,
  Printer,
  Calendar,
  DollarSign,
  AlertCircle,
  Sparkles,
  ExternalLink,
  ChevronLeft,
  X,
  Check,
} from "lucide-react";
import { portalInvoices, PortalInvoice } from "@/lib/data/portal";
import { toPersianDigits, formatPrice } from "@/lib/format";

interface DetailedInvoice extends PortalInvoice {
  id: string;
  projectName: string;
  projectSlug: string;
  stage: string;
  dueDate: string;
  vat: string;
  subtotal: string;
  trackingNumber?: string;
  paymentMethod?: string;
}

const initialInvoices: DetailedInvoice[] = [
  {
    id: "INV-4029",
    title: "کلینیک آرامش — قسط دوم طراحی و توسعه",
    projectName: "کلینیک تخصصی آرامش",
    projectSlug: "aramesh",
    stage: "قسط دوم (طراحی رابط کاربری و دیزاین سیستم)",
    amount: "۸٬۵۰۰٬۰۰۰ تومان",
    subtotal: "۸٬۵۰۰٬۰۰۰ تومان",
    vat: "۰ تومان (معاف)",
    date: "۱۰ مرداد ۱۴۰۴",
    dueDate: "۲۵ مرداد ۱۴۰۴",
    paid: false,
    trackingNumber: "TR-98214",
  },
  {
    id: "INV-4028",
    title: "استودیو رخ — بیعانه شروع پروژه",
    projectName: "استودیو عکاسی و فیلمسازی رخ",
    projectSlug: "rokh",
    stage: "قسط اول (بیعانه آغاز طراحی و معماری سایت)",
    amount: "۶٬۰۰۰٬۰۰۰ تومان",
    subtotal: "۶٬۰۰۰٬۰۰۰ تومان",
    vat: "۰ تومان",
    date: "۱۵ تیر ۱۴۰۴",
    dueDate: "۱۵ تیر ۱۴۰۴",
    paid: true,
    trackingNumber: "TR-87612",
    paymentMethod: "درگاه بانکی شاپرک (زرین‌پال)",
  },
  {
    id: "INV-4021",
    title: "دفتر وکالت پارسا — تسویه حساب نهایی",
    projectName: "موسسه حقوقی و دفتر وکالت پارسا",
    projectSlug: "parsa",
    stage: "قسط نهایی (دیپلوی، اتصال دامنه و تحویل سورس کد)",
    amount: "۴٬۹۰۰٬۰۰۰ تومان",
    subtotal: "۴٬۹۰۰٬۰۰۰ تومان",
    vat: "۰ تومان",
    date: "۱ خرداد ۱۴۰۴",
    dueDate: "۱ خرداد ۱۴۰۴",
    paid: true,
    trackingNumber: "TR-76192",
    paymentMethod: "انتقال بین‌بانکی پایا (شبا)",
  },
];

export default function InvoicesScreen() {
  const [invoices, setInvoices] = useState<DetailedInvoice[]>(initialInvoices);
  const [filter, setFilter] = useState<"all" | "unpaid" | "paid">("all");
  const [selectedInvoice, setSelectedInvoice] = useState<DetailedInvoice | null>(null);
  const [payingInvoice, setPayingInvoice] = useState<DetailedInvoice | null>(null);
  const [paymentGateway, setPaymentGateway] = useState<"zarinpal" | "saman" | "sheba">("zarinpal");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const filtered = invoices.filter((inv) => {
    if (filter === "unpaid") return !inv.paid;
    if (filter === "paid") return inv.paid;
    return true;
  });

  const totalUnpaid = invoices
    .filter((i) => !i.paid)
    .reduce((acc, curr) => acc + (parseFloat(curr.amount.replace(/[^0-9]/g, "")) || 0), 0);

  const totalPaid = invoices
    .filter((i) => i.paid)
    .reduce((acc, curr) => acc + (parseFloat(curr.amount.replace(/[^0-9]/g, "")) || 0), 0);

  function handlePayConfirm() {
    if (!payingInvoice) return;
    setIsProcessingPayment(true);

    setTimeout(() => {
      setIsProcessingPayment(false);
      setPaymentSuccess(true);
      setInvoices((prev) =>
        prev.map((item) =>
          item.id === payingInvoice.id
            ? {
                ...item,
                paid: true,
                paymentMethod:
                  paymentGateway === "zarinpal"
                    ? "درگاه زرین‌پال شاپرک"
                    : paymentGateway === "saman"
                    ? "درگاه پرداخت بانک سامان"
                    : "حواله پایا شبا",
                trackingNumber: `TR-${toPersianDigits(Math.floor(10000 + Math.random() * 90000))}`,
              }
            : item
        )
      );
    }, 1200);
  }

  function closePaymentModal() {
    setPayingInvoice(null);
    setPaymentSuccess(false);
  }

  return (
    <div className="flex flex-col gap-6 px-4 py-6 sm:px-8 sm:py-8">
      {/* 1. Header & Summary Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Unpaid Balance */}
        <div className="rounded-3xl border border-amber-200 bg-amber-50/50 p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-amber-600" />
              <span>مبلغ در انتظار پرداخت</span>
            </span>
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10.5px] font-bold text-amber-900">
              ۱ فاکتور جاری
            </span>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-amber-950 font-mono">
            {formatPrice(8500000)}
          </p>
          <p className="text-[11px] text-amber-700">سررسید فاکتور جاری: ۲۵ مرداد ۱۴۰۴</p>
        </div>

        {/* Paid This Year */}
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50/50 p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>کل پرداختی‌های تسویه‌شده</span>
            </span>
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10.5px] font-bold text-emerald-900">
              ۲ فاکتور موفق
            </span>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-emerald-950 font-mono">
            {formatPrice(10900000)}
          </p>
          <p className="text-[11px] text-emerald-700">دارای گواهی تسویه و رسید مالی معتبر</p>
        </div>

        {/* Next Milestone Schedule */}
        <div className="rounded-3xl border border-ink-150 bg-white p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-ink-700 flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-accent-600" />
              <span>موعد قسط بعدی</span>
            </span>
            <span className="rounded-full bg-ink-100 px-2 py-0.5 text-[10.5px] font-bold text-ink-700">
              فاز پایانی
            </span>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-ink-950">
            ۳ شهریور ۱۴۰۴
          </p>
          <p className="text-[11px] text-ink-400">همزمان با تحویل نهایی و دیپلوی دامنه</p>
        </div>
      </div>

      {/* 2. Invoices Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`rounded-2xl px-4 py-2 text-xs font-bold transition-all ${
              filter === "all"
                ? "bg-ink-900 text-white shadow-xs"
                : "bg-white text-ink-600 border border-ink-200 hover:bg-ink-50"
            }`}
          >
            همه فاکتورها ({toPersianDigits(invoices.length)})
          </button>
          <button
            type="button"
            onClick={() => setFilter("unpaid")}
            className={`rounded-2xl px-4 py-2 text-xs font-bold transition-all ${
              filter === "unpaid"
                ? "bg-amber-600 text-white shadow-xs"
                : "bg-white text-ink-600 border border-ink-200 hover:bg-ink-50"
            }`}
          >
            منتظر پرداخت ({toPersianDigits(invoices.filter((i) => !i.paid).length)})
          </button>
          <button
            type="button"
            onClick={() => setFilter("paid")}
            className={`rounded-2xl px-4 py-2 text-xs font-bold transition-all ${
              filter === "paid"
                ? "bg-emerald-600 text-white shadow-xs"
                : "bg-white text-ink-600 border border-ink-200 hover:bg-ink-50"
            }`}
          >
            تسویه‌شده ({toPersianDigits(invoices.filter((i) => i.paid).length)})
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-ink-500">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>تضمین رسمی بازگشت وجه طبق بند ۴ قرارداد و گارانتی SLA</span>
        </div>
      </div>

      {/* 3. Invoices List Cards */}
      <div className="space-y-3">
        {filtered.map((inv) => (
          <div
            key={inv.id}
            className={`rounded-3xl border bg-white p-5 sm:p-6 shadow-card transition-all hover:border-ink-300 ${
              !inv.paid ? "border-amber-200/90 ring-1 ring-amber-100" : "border-ink-150"
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
              {/* Left Details */}
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-mono text-xs font-bold text-accent-700 bg-accent-50 px-2.5 py-0.5 rounded-lg border border-accent-200">
                    {inv.id}
                  </span>
                  <h3 className="font-bold text-sm sm:text-base text-ink-950">
                    {inv.title}
                  </h3>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold border ${
                      inv.paid
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-amber-50 text-amber-800 border-amber-200"
                    }`}
                  >
                    {inv.paid ? "پرداخت و تسویه شده" : "در انتظار تسویه حساب"}
                  </span>
                </div>

                <p className="text-xs text-ink-500 leading-relaxed">
                  مربوط به پروژه <span className="font-semibold text-ink-800">{inv.projectName}</span> · {inv.stage}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-[11.5px] text-ink-400 pt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-ink-400" />
                    <span>تاریخ صدور: {toPersianDigits(inv.date)}</span>
                  </span>
                  {!inv.paid && (
                    <span className="flex items-center gap-1 text-amber-700 font-medium">
                      <Clock className="h-3.5 w-3.5" />
                      <span>مهلت پرداخت: {toPersianDigits(inv.dueDate)}</span>
                    </span>
                  )}
                  {inv.trackingNumber && (
                    <span className="font-mono text-ink-500">
                      کد رهگیری: {inv.trackingNumber}
                    </span>
                  )}
                </div>
              </div>

              {/* Price and Actions */}
              <div className="flex flex-wrap items-center justify-between lg:justify-end gap-4 shrink-0 border-t lg:border-t-0 pt-4 lg:pt-0 border-ink-100">
                <div className="text-right lg:text-left">
                  <span className="text-xs text-ink-400 block">مبلغ کل فاکتور:</span>
                  <span className="text-lg sm:text-xl font-black text-ink-950 font-mono">
                    {toPersianDigits(inv.amount)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedInvoice(inv)}
                    className="inline-flex items-center gap-1.5 rounded-2xl border border-ink-200 bg-ink-50/70 px-4 py-2.5 text-xs font-bold text-ink-700 hover:bg-ink-100 hover:text-ink-950 transition-all"
                  >
                    <FileText className="h-4 w-4 text-ink-500" />
                    <span>مشاهده جزئیات و چاپ</span>
                  </button>

                  {!inv.paid ? (
                    <button
                      type="button"
                      onClick={() => setPayingInvoice(inv)}
                      className="inline-flex items-center gap-2 rounded-2xl bg-accent-600 px-5 py-2.5 text-xs font-bold text-white shadow-glow hover:bg-accent-700 transition-all active:scale-[0.98]"
                    >
                      <CreditCard className="h-4 w-4" />
                      <span>پرداخت آنلاین</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSelectedInvoice(inv)}
                      className="inline-flex items-center gap-1.5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs font-bold text-emerald-700 hover:bg-emerald-100 transition-all"
                    >
                      <Download className="h-4 w-4" />
                      <span>دانلود رسید معتبر</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Bank Information & Financial FAQ Box */}
      <div className="rounded-3xl border border-ink-150 bg-white p-6 shadow-card space-y-4">
        <div className="flex items-center gap-2 border-b border-ink-100 pb-3">
          <Building className="h-5 w-5 text-accent-600" />
          <h4 className="font-bold text-sm text-ink-950">اطلاعات حساب رسمی آژانس ردوبز جهت پرداخت شبا / پایا</h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="rounded-2xl bg-ink-50 p-3.5 space-y-1">
            <span className="text-ink-400 block text-[11px]">شماره شبا (بانک سامان):</span>
            <span className="font-mono font-bold text-ink-900 dir-ltr block text-left">
              IR92 0560 0842 8000 1234 5678 01
            </span>
          </div>

          <div className="rounded-2xl bg-ink-50 p-3.5 space-y-1">
            <span className="text-ink-400 block text-[11px]">صاحب حساب:</span>
            <span className="font-bold text-ink-900 block">
              شرکت توسعه فناوری ردوبز (سهامی خاص)
            </span>
          </div>

          <div className="rounded-2xl bg-ink-50 p-3.5 space-y-1">
            <span className="text-ink-400 block text-[11px]">شناسه ملی شرکت:</span>
            <span className="font-mono font-bold text-ink-900 block">
              {toPersianDigits("14009823412")}
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL: INVOICE DETAILS & OFFICIAL PRINT VIEW                              */}
      {/* ========================================================================= */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            onClick={() => setSelectedInvoice(null)}
            className="fixed inset-0 bg-ink-950/60 backdrop-blur-sm"
          />

          <div className="relative z-10 w-full max-w-2xl rounded-3xl border border-ink-150 bg-white p-6 sm:p-8 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-ink-150 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent-50 text-accent-600">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-ink-950">
                    صورتحساب رسمی خدمات دیجیتال
                  </h3>
                  <span className="font-mono text-xs text-ink-400">شماره: {selectedInvoice.id}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedInvoice(null)}
                aria-label="بستن پنجره"
                className="text-ink-400 hover:text-ink-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Official Invoice Body Preview */}
            <div className="rounded-2xl border border-ink-200 p-5 bg-ink-50/40 space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-ink-200 pb-3">
                <div>
                  <span className="font-display text-lg font-black text-ink-950 block">
                    رد<span className="text-accent-600">وبز</span>
                  </span>
                  <span className="text-[11px] text-ink-500">طراحی و توسعه تخصصی وب و نرم‌افزار</span>
                </div>
                <div className="text-left font-mono text-[11px] text-ink-500 space-y-0.5">
                  <p>تاریخ صدور: {toPersianDigits(selectedInvoice.date)}</p>
                  <p>مهلت پرداخت: {toPersianDigits(selectedInvoice.dueDate)}</p>
                </div>
              </div>

              {/* Buyer / Seller Details */}
              <div className="grid grid-cols-2 gap-4 py-2">
                <div className="space-y-1">
                  <span className="text-ink-400 block">مشخصات خریدار / کارفرما:</span>
                  <span className="font-bold text-ink-900 block">آرمان محمدی</span>
                  <span className="text-ink-500 block">{selectedInvoice.projectName}</span>
                </div>
                <div className="space-y-1 text-left">
                  <span className="text-ink-400 block">وضعیت پرداخت:</span>
                  <span
                    className={`font-bold inline-block px-2.5 py-0.5 rounded-full ${
                      selectedInvoice.paid
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-900"
                    }`}
                  >
                    {selectedInvoice.paid ? "تسویه شده" : "در انتظار پرداخت"}
                  </span>
                </div>
              </div>

              {/* Line Items Table */}
              <div className="rounded-xl border border-ink-200 overflow-hidden bg-white">
                <div className="grid grid-cols-12 bg-ink-100/70 p-2.5 font-bold text-ink-700 text-[11px]">
                  <span className="col-span-8">شرح خدمات و اقساط قرارداد</span>
                  <span className="col-span-4 text-left">مبلغ (تومان)</span>
                </div>
                <div className="grid grid-cols-12 p-3 text-ink-900 items-center border-t border-ink-100">
                  <span className="col-span-8 leading-relaxed">{selectedInvoice.stage}</span>
                  <span className="col-span-4 text-left font-mono font-bold">
                    {toPersianDigits(selectedInvoice.subtotal)}
                  </span>
                </div>
              </div>

              {/* Total & Stamp */}
              <div className="flex items-center justify-between pt-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-700">
                    <ShieldCheck className="h-4 w-4" />
                    <span className="font-semibold text-[11px]">ممهور به مهر دیجیتال شرکت توسعه ردوبز</span>
                  </div>
                  {selectedInvoice.trackingNumber && (
                    <span className="text-[10.5px] text-ink-400 font-mono block">
                      کد رهگیری بانکی: {selectedInvoice.trackingNumber}
                    </span>
                  )}
                </div>

                <div className="text-left">
                  <span className="text-ink-500 block text-[11px]">مبلغ نهایی قابل پرداخت:</span>
                  <span className="text-base font-black text-ink-950 font-mono">
                    {toPersianDigits(selectedInvoice.amount)}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 rounded-2xl border border-ink-200 bg-white px-4 py-2.5 text-xs font-bold text-ink-700 hover:bg-ink-50"
              >
                <Printer className="h-4 w-4" />
                <span>چاپ یا ذخیره PDF</span>
              </button>

              {!selectedInvoice.paid && (
                <button
                  type="button"
                  onClick={() => {
                    setPayingInvoice(selectedInvoice);
                    setSelectedInvoice(null);
                  }}
                  className="inline-flex items-center gap-2 rounded-2xl bg-accent-600 px-6 py-2.5 text-xs font-bold text-white shadow-glow hover:bg-accent-700 transition-all"
                >
                  <CreditCard className="h-4 w-4" />
                  <span>انتقال به درگاه پرداخت آنلاین</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: INTERACTIVE PAYMENT GATEWAY SIMULATOR                              */}
      {/* ========================================================================= */}
      {payingInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div onClick={closePaymentModal} className="fixed inset-0 bg-ink-950/60 backdrop-blur-sm" />

          <div className="relative z-10 w-full max-w-md rounded-3xl border border-ink-150 bg-white p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            {paymentSuccess ? (
              <div className="py-6 text-center space-y-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="font-display text-lg font-bold text-ink-950">پرداخت با موفقیت انجام شد!</h3>
                <p className="text-xs text-ink-600 leading-relaxed">
                  فاکتور <span className="font-bold">{payingInvoice.id}</span> تسویه شد و رسید رسمی در سیستم صادر گردید.
                </p>
                <button
                  type="button"
                  onClick={closePaymentModal}
                  className="w-full rounded-2xl bg-accent-600 px-5 py-3 text-xs font-bold text-white shadow-glow hover:bg-accent-700 transition-all"
                >
                  بازگشت به لیست فاکتورها
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between border-b border-ink-150 pb-3">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-accent-600" />
                    <h3 className="font-bold text-sm text-ink-950">درگاه پرداخت امن شاپرک</h3>
                  </div>
                  <button type="button" onClick={closePaymentModal} className="text-ink-400 hover:text-ink-900">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="rounded-2xl bg-ink-50 p-4 space-y-1.5">
                  <div className="flex justify-between text-xs text-ink-600">
                    <span>فاکتور:</span>
                    <span className="font-bold text-ink-900">{payingInvoice.title}</span>
                  </div>
                  <div className="flex justify-between text-xs text-ink-600">
                    <span>مبلغ قابل پرداخت:</span>
                    <span className="font-mono text-base font-black text-accent-600">
                      {toPersianDigits(payingInvoice.amount)}
                    </span>
                  </div>
                </div>

                {/* Gateway Options */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-ink-900 block">انتخاب روش پرداخت:</label>
                  <label
                    className={`flex cursor-pointer items-center justify-between rounded-2xl border p-3 text-xs font-bold transition-all ${
                      paymentGateway === "zarinpal"
                        ? "border-accent-600 bg-accent-50 text-accent-950"
                        : "border-ink-200 bg-white text-ink-800"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="gateway"
                        checked={paymentGateway === "zarinpal"}
                        onChange={() => setPaymentGateway("zarinpal")}
                        className="accent-accent-600"
                      />
                      <span>درگاه پرداخت زرین‌پال (تمام کارت‌های شتاب)</span>
                    </div>
                    <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                      آنی
                    </span>
                  </label>

                  <label
                    className={`flex cursor-pointer items-center justify-between rounded-2xl border p-3 text-xs font-bold transition-all ${
                      paymentGateway === "saman"
                        ? "border-accent-600 bg-accent-50 text-accent-950"
                        : "border-ink-200 bg-white text-ink-800"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="gateway"
                        checked={paymentGateway === "saman"}
                        onChange={() => setPaymentGateway("saman")}
                        className="accent-accent-600"
                      />
                      <span>درگاه بانک سامان (سپهر شاپرک)</span>
                    </div>
                  </label>
                </div>

                <button
                  type="button"
                  onClick={handlePayConfirm}
                  disabled={isProcessingPayment}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-accent-600 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-glow hover:bg-accent-700 transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  {isProcessingPayment ? (
                    <span>در حال اتصال به شاپرک و تایید...</span>
                  ) : (
                    <>
                      <span>تایید و پرداخت {toPersianDigits(payingInvoice.amount)}</span>
                      <ArrowUpLeft className="h-4 w-4" />
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
