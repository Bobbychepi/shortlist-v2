import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import CustomTooltip from "./CustomToolTip";

type ChartDataPoint = {
  date: string;
  score: number;
};

type ScoreTimelineProps = {
  chartData: ChartDataPoint[];
  thisMonthCount: number;
};

export default function ScoreTimeline({
  chartData,
  thisMonthCount,
}: ScoreTimelineProps) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#0e0f1d] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.3)] lg:col-span-3">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-base font-semibold text-white">Score Timeline</p>
          <p className="mt-0.5 text-xs text-white/35">
            Your resume match score over time
          </p>
        </div>

        <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-400">
          {thisMonthCount} this month
        </span>
      </div>

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 4, right: 4, left: -28, bottom: 0 }}
          >
            <defs>
              <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="date"
              tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              domain={[0, 100]}
              tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="score"
              stroke="#6366f1"
              strokeWidth={2.5}
              fill="url(#scoreGrad)"
              dot={{
                fill: "#6366f1",
                r: 3.5,
                strokeWidth: 0,
              }}
              activeDot={{
                fill: "#818cf8",
                r: 5,
                strokeWidth: 0,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}