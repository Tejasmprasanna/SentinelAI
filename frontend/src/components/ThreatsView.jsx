import { LayoutList, Loader2, ShieldCheck, ShieldOff } from "lucide-react";
import ThreatCard from "./ThreatCard.jsx";

export default function ThreatsView({
  loading,
  threats,
  hasAnalyzed,
  allLogs: _allLogs,
  safeLogs: _safeLogs,
  blockedIPs = [],
  onBlockIP,
}) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8">
      <div className="pointer-events-none absolute -left-24 top-0 h-48 w-48 rounded-full bg-blue-600/5 blur-3xl" />
      <h2 className="mb-2 flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-[0.2em] text-blue-200/95">
        <LayoutList className="h-4 w-4 shrink-0 text-blue-400/90" />
        Detected threats
      </h2>
      <p className="mb-6 text-xs font-medium leading-relaxed text-slate-500">
        Grouped by source IP. Severity reflects aggregated rules from your analyzer.
      </p>

      <div className="max-h-96 overflow-y-auto pr-1">
        {loading && (
          <div className="flex flex-col items-center justify-center gap-4 py-14 text-center">
            <Loader2 className="h-10 w-10 animate-spin text-violet-400/90 drop-shadow-[0_0_12px_rgba(139,92,246,0.45)]" />
            <div className="space-y-1">
              <p className="animate-pulse font-mono text-sm font-semibold text-violet-200/90">
                Analyzing…
              </p>
              <p className="max-w-xs font-mono text-[11px] text-slate-500">
                Parsing log lines and correlating threat signals.
              </p>
            </div>
          </div>
        )}

        {!loading && !hasAnalyzed && (
          <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/50 shadow-inner">
              <ShieldCheck className="h-7 w-7 text-slate-500" strokeWidth={1.5} />
            </div>
            <p className="max-w-md rounded-2xl border border-dashed border-white/15 bg-slate-950/50 px-6 py-8 font-mono text-sm leading-relaxed text-slate-400">
              Select a log file and click{" "}
              <span className="font-semibold text-slate-200">Analyze</span> to scan for threats.
            </p>
          </div>
        )}

        {!loading && hasAnalyzed && threats.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-950/20">
              <ShieldOff className="h-7 w-7 text-emerald-500/70" strokeWidth={1.5} />
            </div>
            <p className="max-w-md rounded-2xl border border-white/10 bg-slate-950/40 px-6 py-8 font-mono text-sm leading-relaxed text-slate-400">
              No threats detected — your log may contain only benign activity.
            </p>
          </div>
        )}

        {!loading && hasAnalyzed && threats.length > 0 && (
          <ul className="m-0 list-none space-y-6 p-0">
            {threats.map((t, i) => (
              <ThreatCard
                key={`${t.ip ?? "ip"}-${i}-${t.attack_type ?? "attack"}`}
                threat={t}
                index={i}
                blocked={Boolean(t.ip && blockedIPs.includes(t.ip))}
                onBlockIP={onBlockIP}
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
