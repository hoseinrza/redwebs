export default function Stat({
  value,
  label,
  center = false,
}: {
  value: string;
  label: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center" : undefined}>
      <p className="text-[38px] font-extrabold leading-none text-white">{value}</p>
      <p className="mt-2 text-[13px] text-ink-400">{label}</p>
    </div>
  );
}
