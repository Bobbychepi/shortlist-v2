type StatCardProps = {
  label: string;
  value: string;
  sub: string;
  color: string;
};

export default function StatCard({
  label,
  value,
  sub,
  color,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#0e0f1d] p-5 shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
      <p className="mb-2 text-xs uppercase tracking-wider text-white/40">
        {label}
      </p>

      <p
        className="mb-1 text-3xl font-bold"
        style={{
          color,
          fontFamily: "'Bricolage Grotesque', sans-serif",
        }}
      >
        {value}
      </p>

      <p className="text-xs text-white/35">{sub}</p>
    </div>
  );
}