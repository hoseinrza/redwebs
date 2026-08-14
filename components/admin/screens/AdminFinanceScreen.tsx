"use client";

import { useState } from "react";
import {
  DollarSign,
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  Download,
  Plus,
  ArrowUpRight,
  ShieldCheck,
  CreditCard,
} from "lucide-react";
import { adminInvoices, adminOverviewStats } from "@/lib/data/admin";
import { formatPrice, toFa } from "@/lib/format";

export default function AdminFinanceScreen() {
  const [invoices, setInvoices] = useState(adminInvoices);
  const [filter, setFilter] = useState<"all" | "paid" | "pending_approval" | "overdue">("all");
  const [successMsg, setSuccessMsg] = useState("");

  const filteredInvoices = invoices.filter((inv) => {
    if (filter === "all") return true;
    return inv.status === filter;
  });

  const totalCollected = invoices
    .filter((i) => i.status === "paid")
    .reduce((sum, i) => sum + i.amountToman, 0);

  const pendingCollection = invoices
    .filter((i) => i.status === "pending_approval" || i.status === "overdue")
    .reduce((sum, i) => sum + i.amountToman, 0);

  function markAsPaid(invoiceId: string) {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === invoiceId
          ? {
              ...inv,
              status: "paid",
              paidDate: "هم‌اکنون",
              gateway: "زرین‌پال اختصاصی",
            }
          : inv
      )
    );
    setSuccessMsg(`وضعیت فاکتور با موفقیت به "پرداخت شده" تغییر یافت.`);
    setTimeout(() => setSuccessMsg(""), 4000);
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 animate-fade-in font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-ink-200 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-accent-600" />
            <h1 className="text-xl sm:text-2xl font-black text-ink-950">امور مالی، صورتحساب‌ها و قراردادها</h1>
          </div>
          <p className="text-xs sm:text-sm text-ink-500">
            تایید واریزی‌های بانکی، نظارت بر درگاه‌های پرداخت زرین‌پال و صدور پیش‌فاکتور رسمی
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            const newInv = {
              id: `inv-${Date.now()}`,
              invoiceNumber: `INV-۱۴۰۴-${Math.floor(100 + Math.random() * 900)}`,
              clientId: "cli-1",
              clientName: "کلینیک آرامش",
              projectTitle: "قسط مرحله سوم تست و استقرار نهایی",
              amountToman: 20000000,
              status: "pending_approval" as const,
              issuedDate: "امروز",
              dueDate: "۷ روز دیگر",
              gateway: "زرین‌پال اختصاصی" as const,
              items: [{ title: "توسعه نهایی و تحویل اسپرینت", qty: 1, unitPriceToman: 20000000 }],
            };
            setInvoices([newInv, ...invoices]);
            setSuccessMsg("فاکتور جدید صادر شد و به پنل کارفرما ارسال گردید.");
            setTimeout(() => setSuccessMsg(""), 4000);
          }}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-accent-600 text-white text-xs sm:text-sm font-bold hover:bg-accent-700 shadow-glow transition-all active:scale-95 shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>صدور فاکتور جدید</span>
        </button>
      </div>

      {successMsg && (
        <div className="flex items-center gap-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-xs font-bold text-emerald-800 animate-fade-in">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Financial Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="rounded-3xl border border-ink-200 bg-white p-5 shadow-xs space-y-1.5">
          <span className="text-xs font-bold text-ink-500">کل دریافتی‌های تاییدشده</span>
          <p className="text-xl sm:text-2xl font-black text-emerald-700 font-mono">
            {formatPrice(totalCollected)} <span className="text-xs font-sans text-ink-500">تومان</span>
          </p>
          <p className="text-[11px] text-emerald-600 font-bold">واریز مستقیم به حساب شبا و درگاه زرین‌پال</p>
        </div>

        <div className="rounded-3xl border border-ink-200 bg-white p-5 shadow-xs space-y-1.5">
          <span className="text-xs font-bold text-ink-500">مبالغ در انتظار وصول / سررسید</span>
          <p className="text-xl sm:text-2xl font-black text-amber-700 font-mono">
            {formatPrice(pendingCollection)} <span className="text-xs font-sans text-ink-500">تومان</span>
          </p>
          <p className="text-[11px] text-amber-600 font-bold">شامل اقساط سررسید نشده پروژه‌های جاری</p>
        </div>

        <div className="rounded-3xl border border-ink-200 bg-white p-5 shadow-xs space-y-1.5">
          <span className="text-xs font-bold text-ink-500">درگاه‌های پرداخت فعال</span>
          <p className="text-xl sm:text-2xl font-black text-ink-950 font-mono">
            ۳ <span className="text-xs font-sans text-ink-500">گیت‌وی فعال</span>
          </p>
          <p className="text-[11px] text-ink-500">زرین‌پال اختصاصی + سپهر صادرات + تتر USDT</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-ink-200 pb-3">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            filter === "all" ? "bg-ink-950 text-white" : "text-ink-600 hover:bg-ink-100"
          }`}
        >
          همه فاکتورها ({toFa(invoices.length)})
        </button>
        <button
          type="button"
          onClick={() => setFilter("pending_approval")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            filter === "pending_approval"
              ? "bg-amber-600 text-white"
              : "text-ink-600 hover:bg-ink-100"
          }`}
        >
          در انتظار پرداخت ({toFa(invoices.filter((i) => i.status === "pending_approval").length)})
        </button>
        <button
          type="button"
          onClick={() => setFilter("paid")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            filter === "paid" ? "bg-emerald-600 text-white" : "text-ink-600 hover:bg-ink-100"
          }`}
        >
          تسویه و پرداخت شده ({toFa(invoices.filter((i) => i.status === "paid").length)})
        </button>
      </div>

      {/* Invoice Table */}
      <div className="rounded-3xl border border-ink-200 bg-white overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-ink-50/80 border-b border-ink-150 text-ink-600 font-bold">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">شماره فاکتور</th>
                <th className="py-3.5 px-4">کارفرما / سازمان</th>
                <th className="py-3.5 px-4">شرح مرحله و خدمات</th>
                <th className="py-3.5 px-4">مبلغ صورتحساب</th>
                <th className="py-3.5 px-4">تاریخ صدور / سررسید</th>
                <th className="py-3.5 px-4">درگاه / شیوه</th>
                <th className="py-3.5 px-4">وضعیت</th>
                <th className="py-3.5 px-4 sm:px-6 text-center">اقدام</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100 text-ink-900">
              {filteredInvoices.map((invoice) => {
                const isPaid = invoice.status === "paid";
                return (
                  <tr key={invoice.id} className="hover:bg-ink-50/50 transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-mono font-bold text-ink-900">
                      {invoice.invoiceNumber}
                    </td>

                    <td className="py-4 px-4 font-bold text-ink-950">
                      {invoice.clientName}
                    </td>

                    <td className="py-4 px-4 text-ink-700">
                      {invoice.projectTitle}
                    </td>

                    <td className="py-4 px-4 font-mono font-bold text-ink-950">
                      {formatPrice(invoice.amountToman)} <span className="text-[10px] text-ink-400 font-sans">تومان</span>
                    </td>

                    <td className="py-4 px-4 text-ink-500 font-mono text-[11px]">
                      <div>صدور: {invoice.issuedDate}</div>
                      <div>سررسید: {invoice.dueDate}</div>
                    </td>

                    <td className="py-4 px-4 text-[11px] text-ink-600">
                      {invoice.gateway || "درگاه اینترنتی"}
                    </td>

                    <td className="py-4 px-4">
                      {isPaid ? (
                        <span className="rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 text-[10.5px] font-bold">
                          پرداخت شده
                        </span>
                      ) : (
                        <span className="rounded-full bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 text-[10.5px] font-bold">
                          در انتظار تایید
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-4 sm:px-6 text-center">
                      {!isPaid ? (
                        <button
                          type="button"
                          onClick={() => markAsPaid(invoice.id)}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition-colors shadow-2xs"
                        >
                          تایید وصول فیش
                        </button>
                      ) : (
                        <span className="text-xs text-ink-400 font-mono">تسویه شد</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
