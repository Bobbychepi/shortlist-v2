type ScoreStatusBadgeProps = {
  status: string;
};

export default function ScoreStatusBadge({
  status,
}: ScoreStatusBadgeProps) {
  const styles: Record<string, string> = {
    excellent: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    good: "border-indigo-500/20 bg-indigo-500/10 text-indigo-400",
    fair: "border-amber-500/20 bg-amber-500/10 text-amber-400",
    poor: "border-red-500/20 bg-red-500/10 text-red-400",
  };

  return (
    <span
      className={`rounded-full border px-2 py-0.5 text-xs capitalize ${
        styles[status] || styles.fair
      }`}
    >
      {status}
    </span>
  );
}