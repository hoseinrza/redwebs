"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Plus,
  Building,
  Phone,
  Mail,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Eye,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { ClientAccount, clientAccounts as initialClientAccounts } from "@/lib/data/admin";
import { formatPrice, toFa } from "@/lib/format";

interface AdminClientsScreenProps {
  onOpenNewClientModal: () => void;
  clients: ClientAccount[];
}

export default function AdminClientsScreen({
  onOpenNewClientModal,
  clients,
}: AdminClientsScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [tierFilter, setTierFilter] = useState("all");

  const filteredClients = clients.filter((c) => {
    const matchesSearch =
      c.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTier = tierFilter === "all" || c.tier === tierFilter;
    return matchesSearch && matchesTier;
  });

  const totalContractVolume = clients.reduce((acc, c) => acc + c.totalPaidToman, 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 animate-fade-in font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-ink-200 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-accent-600" />
            <h1 className="text-xl sm:text-2xl font-black text-ink-950">مدیریت مشتریان، کارفرمایان و CRM</h1>
          </div>
          <p className="text-xs sm:text-sm text-ink-500">
            مشاهده وضعیت قراردادها، صورتحساب‌ها، سلامت ارتباط و ورود به پنل شبیه‌سازی‌شده هر کارفرما
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenNewClientModal}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-accent-600 text-white text-xs sm:text-sm font-bold hover:bg-accent-700 shadow-glow transition-all active:scale-95 shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>افزودن کارفرمای جدید</span>
        </button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="rounded-3xl border border-ink-200 bg-white p-5 shadow-xs space-y-1.5">
          <span className="text-xs font-bold text-ink-500">مجموع ارزش قراردادهای مشتریان</span>
          <p className="text-xl sm:text-2xl font-black text-ink-950 font-mono">
            {formatPrice(totalContractVolume)} <span className="text-xs font-sans text-ink-500">تومان</span>
          </p>
          <p className="text-[11px] text-emerald-600 font-bold">۹۸٪ وصول به موقع در سررسیدها</p>
        </div>

        <div className="rounded-3xl border border-ink-200 bg-white p-5 shadow-xs space-y-1.5">
          <span className="text-xs font-bold text-ink-500">تعداد کل کارفرمایان فعال</span>
          <p className="text-xl sm:text-2xl font-black text-ink-950 font-mono">
            {toFa(clients.length)} <span className="text-xs font-sans text-ink-500">سازمان و کسب‌وکار</span>
          </p>
          <p className="text-[11px] text-ink-500">۸۰٪ مشتریان سازمانی VIP Enterprise</p>
        </div>

        <div className="rounded-3xl border border-ink-200 bg-white p-5 shadow-xs space-y-1.5">
          <span className="text-xs font-bold text-ink-500">میانگین شاخص رضایت (Health Score)</span>
          <p className="text-xl sm:text-2xl font-black text-emerald-700 font-mono">
            {toFa(96.5)}٪
          </p>
          <p className="text-[11px] text-emerald-600 font-bold">بر اساس نظرسنجی و تحویل اسپرینت‌ها</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-3xl border border-ink-200 shadow-xs">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجو در نام شرکت، نماینده، شماره تماس یا ایمیل..."
            className="w-full h-10 pr-10 pl-4 rounded-xl border border-ink-200 text-xs sm:text-sm focus:border-accent-600 focus:ring-2 focus:ring-accent-100 outline-none"
          />
        </div>

        <select
          value={tierFilter}
          onChange={(e) => setTierFilter(e.target.value)}
          className="h-10 px-3 rounded-xl border border-ink-200 text-xs bg-white focus:border-accent-600 outline-none"
        >
          <option value="all">همه رده‌های اشتراک</option>
          <option value="VIP Enterprise">مشتریان VIP Enterprise</option>
          <option value="Standard Pro">حساب Standard Pro</option>
          <option value="Startup Tier">حساب استارتاپی</option>
        </select>
      </div>

      {/* Client Table / Cards */}
      <div className="rounded-3xl border border-ink-200 bg-white overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-ink-50/80 border-b border-ink-150 text-ink-600 font-bold">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">نام سازمان / مشتری</th>
                <th className="py-3.5 px-4">نماینده و اطلاعات تماس</th>
                <th className="py-3.5 px-4">رده سازمانی</th>
                <th className="py-3.5 px-4">پروژه‌های فعال</th>
                <th className="py-3.5 px-4">کل قرارداد پرداختی</th>
                <th className="py-3.5 px-4">شاخص رضایت</th>
                <th className="py-3.5 px-4">وضعیت قرارداد</th>
                <th className="py-3.5 px-4 sm:px-6 text-center">اقدام</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100 text-ink-900">
              {filteredClients.map((client) => {
                const isVip = client.tier === "VIP Enterprise";
                return (
                  <tr key={client.id} className="hover:bg-ink-50/50 transition-colors">
                    <td className="py-4 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-2xl font-bold text-white text-xs shadow-xs shrink-0"
                          style={{ backgroundColor: client.avatarBg }}
                        >
                          {client.companyName.slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-bold text-ink-950 text-xs sm:text-[13px]">{client.companyName}</p>
                          <span className="text-[11px] text-ink-400 font-mono">عضویت: {client.joinedDate}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <p className="font-bold text-ink-900">{client.contactPerson}</p>
                      <p className="text-[11px] text-ink-500 font-mono dir-ltr text-right">{client.phone}</p>
                    </td>

                    <td className="py-4 px-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10.5px] font-bold ${
                          isVip
                            ? "bg-rose-50 text-rose-700 border border-rose-200"
                            : "bg-ink-100 text-ink-700"
                        }`}
                      >
                        {client.tier}
                      </span>
                    </td>

                    <td className="py-4 px-4 font-mono font-bold text-ink-900">
                      {toFa(client.activeProjects)} پروژه
                    </td>

                    <td className="py-4 px-4">
                      <span className="font-mono font-bold text-ink-950 block">
                        {formatPrice(client.totalPaidToman)}
                      </span>
                      <span className="text-[10px] text-ink-400">تومان</span>
                    </td>

                    <td className="py-4 px-4">
                      <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 text-[11px]">
                        {toFa(client.healthScore)}٪
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <span className="flex items-center gap-1.5 text-xs text-ink-700">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span>{client.contractStatus}</span>
                      </span>
                    </td>

                    <td className="py-4 px-4 sm:px-6 text-center">
                      <Link
                        href="/panel"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-ink-900 text-white hover:bg-accent-600 transition-colors text-[11px] font-bold shadow-2xs"
                      >
                        <Eye className="h-3 w-3" />
                        <span>ورود به پنل کارفرما</span>
                      </Link>
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
