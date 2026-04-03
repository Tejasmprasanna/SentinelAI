import { Leaf, Loader2, ShieldCheck } from "lucide-react";
import SafeLogItem from "./SafeLogItem.jsx";

export default function SafeLogsView({
  logs,
  hasAnalyzed,
  allLogs: _allLogs,
  threats: _threats,
  loading,
}) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8">
      <div className="pointer-events-none absolute -right-16 bottom-0 h-40 w-40 rounded-full bg-emerald-600/10 blur-3xl" />
      <h2 className="mb-2 flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-[0.2em] text-emerald-300/95">
        <Leaf className="h-4 w-4 shrink-0 text-emerald-400/90" />
        Benign activity
      </h2>
      <p className="mb-6 text-xs font-medium leading-relaxed text-slate-500">
        Lines with <span className="font-mono text-slate-400">isThreat: false</span> from the analyzer.
      </p>

      <div className="max-h-96 overflow-y-auto pr-1">
        {loading && (
          <div className="flex flex-col items-center justify-center gap-4 py-14 text-center">
            <Loader2 className="h-9 w-9 animate-spin text-emerald-400/90" />
            <p className="animate-pulse font-mono text-sm font-semibold text-emerald-200/90">
              Analyzing…
            </p>
            <p className="max-w-xs font-mono text-[11px] text-slate-500">
              Classifying safe vs threat lines.
            </p>
          </div>
        )}

        {!loading && !hasAnalyzed && (
          <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-950/25">
              <ShieldCheck className="h-7 w-7 text-emerald-500/80" strokeWidth={1.5} />
            </div>
            <p className="max-w-md rounded-2xl border border-dashed border-white/15 bg-slate-950/50 px-6 py-8 font-mono text-sm leading-relaxed text-slate-400">
              Run <span className="font-semibold text-slate-200">Analyze</span> first — safe activity
              appears after the scan completes.
            </p>
          </div>
        )}

        {!loading && hasAnalyzed && logs.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/60">
              <Leaf className="h-7 w-7 text-slate-500" strokeWidth={1.5} />
            </div>
            <p className="max-w-md rounded-2xl border border-white/10 bg-slate-950/40 px-6 py-8 font-mono text-sm leading-relaxed text-slate-400">
              No safe activity detected for this log.
            </p>
          </div>
        )}

        {!loading && hasAnalyzed && logs.length > 0 && (
          <ul className="m-0 list-none space-y-2 p-0">
            {logs.map((log, i) => (
              <SafeLogItem key={`${log?.ip ?? "no-ip"}-${i}`} log={log} index={i} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
