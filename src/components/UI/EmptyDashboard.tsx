type EmptyDashboardProps = {
  onStartAnalysis: () => void;
};

export default function EmptyDashboard({
  onStartAnalysis,
}: EmptyDashboardProps) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#0e0f1d] p-10 text-center">
      <p className="text-sm text-white/40">No saved analyses yet.</p>

      <h2 className="mt-4 text-2xl font-semibold">
        Analyze your first resume
      </h2>

      <p className="mt-2 text-sm text-white/35">
        Upload a resume and job description to see your match scores here.
      </p>

      <button
        type="button"
        onClick={onStartAnalysis}
        className="mt-6 rounded-xl bg-indigo-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-indigo-400"
      >
        Start analysis
      </button>
    </div>
  );
}