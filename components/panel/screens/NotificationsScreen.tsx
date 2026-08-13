import { portalNotifications } from "@/lib/data/portal";

export default function NotificationsScreen() {
  return (
    <div className="flex flex-col gap-3 px-5 pb-10 pt-6 sm:px-7">
      {portalNotifications.map((n) => (
        <div
          key={n.title}
          className={`flex items-start gap-3.5 rounded-[14px] border border-ink-150 p-5 ${n.unread ? "bg-white" : "bg-ink-50"}`}
        >
          <span className={`mt-1.5 h-2 w-2 flex-none rounded-full ${n.unread ? "bg-accent-600" : "bg-ink-200"}`} />
          <div className="min-w-0 flex-1">
            <p className={`text-[13px] ${n.unread ? "font-bold" : "font-semibold"} text-ink-900`}>{n.title}</p>
            <p className="mt-1.5 text-[11.5px] leading-relaxed text-ink-400">{n.body}</p>
          </div>
          <span className="flex-none text-[10.5px] text-ink-400">{n.time}</span>
        </div>
      ))}
    </div>
  );
}
