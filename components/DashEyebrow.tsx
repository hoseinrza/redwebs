import { ReactNode } from "react";

export default function DashEyebrow({
  children,
  tone = "light",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-bold tracking-wide ${
        tone === "dark" ? "text-accent-400" : "text-accent-600"
      }`}
    >
      <span className={`h-px w-4 ${tone === "dark" ? "bg-accent-400" : "bg-accent-600"}`} />
      {children}
    </span>
  );
}
