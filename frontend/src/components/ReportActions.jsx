import { FileDown } from "lucide-react";
import { generateReport } from "../utils/generateReport.js";

export default function ReportActions({
  disabled,
  allLogs,
  safeLogs,
  threatLogs,
  threats,
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
      <button
        type="button"
        disabled={disabled}
        onClick={() =>
          generateReport({
            allLogs,
            safeLogs,
            threatLogs,
            threats,
          })
        }
        className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-violet-500/35 bg-white/5 px-5 py-3 font-mono text-sm font-bold text-violet-100 shadow-sm backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-violet-400/55 hover:bg-violet-950/40 hover:shadow-[0_0_28px_-6px_rgba(139,92,246,0.55)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 disabled:hover:shadow-none"
      >
        <FileDown className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5" />
        Generate Report
      </button>
      <p className="text-center font-mono text-[10px] uppercase tracking-wider text-slate-600 sm:text-right">
        Exports SentinelAI_Report.pdf
      </p>
    </div>
  );
}
