import { portalInvoices } from "@/lib/data/portal";

export default function InvoicesScreen() {
  return (
    <div className="flex flex-col gap-[18px] px-5 pb-10 pt-6 sm:px-7">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-[14px] border border-ink-150 bg-white p-5">
          <p className="text-xs text-ink-500">مانده حساب</p>
          <p className="mt-2.5 text-2xl font-extrabold text-accent-600">۸٬۵۰۰٬۰۰۰ ت</p>
        </div>
        <div className="rounded-[14px] border border-ink-150 bg-white p-5">
          <p className="text-xs text-ink-500">پرداخت‌شده (۱۴۰۴)</p>
          <p className="mt-2.5 text-2xl font-extrabold text-ink-900">۱۰٬۹۰۰٬۰۰۰ ت</p>
        </div>
        <div className="rounded-[14px] border border-ink-150 bg-white p-5">
          <p className="text-xs text-ink-500">فاکتور بعدی</p>
          <p className="mt-2.5 text-2xl font-extrabold text-ink-900">۳ شهریور</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-ink-150 bg-white">
        <div className="hidden grid-cols-[2fr_1fr_1fr_1fr_90px] gap-2 border-b border-ink-150 bg-ink-50 px-5 py-3.5 text-[11.5px] font-semibold text-ink-500 sm:grid">
          <span>شرح فاکتور</span>
          <span>مبلغ</span>
          <span>تاریخ صدور</span>
          <span>وضعیت</span>
          <span />
        </div>
        {portalInvoices.map((inv) => (
          <div
            key={inv.title}
            className="flex flex-col gap-1.5 border-b border-ink-100 px-5 py-4 text-[13px] last:border-b-0 sm:grid sm:grid-cols-[2fr_1fr_1fr_1fr_90px] sm:items-center sm:gap-2"
          >
            <span className="font-semibold text-ink-900">{inv.title}</span>
            <span className="text-ink-700">{inv.amount}</span>
            <span className="text-ink-400">{inv.date}</span>
            <span className={`font-semibold ${inv.paid ? "text-emerald-600" : "text-accent-600"}`}>
              {inv.paid ? "پرداخت‌شده" : "پرداخت‌نشده"}
            </span>
            <button
              type="button"
              className={`w-fit text-[11.5px] font-bold ${inv.paid ? "text-ink-400" : "text-accent-600"} hover:underline`}
            >
              {inv.paid ? "دانلود" : "پرداخت"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
