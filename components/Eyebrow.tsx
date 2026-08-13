import { ReactNode } from "react";

export default function Eyebrow({
  children,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const tones = {
    light: "border-ink-200 bg-white text-accent-600",
    dark: "border-white/10 bg-white/5 text-accent-400",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold tracking-wide ${tones[tone]} ${className}`}
    >
      <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brass-400" />
      {children}
      <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brass-400" />
    </span>
  );
}
