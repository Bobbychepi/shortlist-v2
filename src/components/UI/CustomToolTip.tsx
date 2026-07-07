type TooltipPayload = {
  value: number;
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
};

export default function CustomTooltip({
  active,
  payload,
  label,
}: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-white/10 bg-[#13142a] px-3 py-2 text-xs shadow-xl">
      <p className="mb-1 text-white/40">{label}</p>
      <p className="font-semibold text-white">{payload[0].value}% match</p>
    </div>
  );
}