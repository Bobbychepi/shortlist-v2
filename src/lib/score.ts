export function getScoreColor(score: number) {
  if (score >= 85) return "#34d399";
  if (score >= 70) return "#6366f1";
  if (score >= 55) return "#facc15";

  return "#f87171";
}