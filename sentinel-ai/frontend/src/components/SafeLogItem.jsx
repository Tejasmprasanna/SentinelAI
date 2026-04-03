import { CheckCircle2, Globe } from "lucide-react";

export default function SafeLogItem({ log, index }) {
  return (
    <li
      className="animate-threat-in flex flex-col gap-2 rounded-xl border border-white/10 bg-white/5 border-l-4 border-emerald-500/80 px-4 py-3 backdrop-blur-sm transition hover:border-emerald-400/35 hover:shadow-[0_0_24px_-10px_rgba(34,197,94,0.25)] sm:flex-row sm:items-center sm:justify-between"
      style={{ animationDelay: `${Math.min(index, 20) * 40}ms` }}
    >
      <div className="flex min-w-0 items-center gap-3">
        <Globe className="h-4 w-4 shrink-0 text-emerald-500/90" />
        <span className="font-mono text-sm font-semibold text-emerald-200/95">
          {log.ip ?? "—"}
        </span>
      </div>
      <p className="min-w-0 flex-1 truncate font-mono text-xs text-slate-400 sm:px-4" title={log.message}>
        {log.message}
      </p>
      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/50 bg-emerald-950/70 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wide text-emerald-200">
        <CheckCircle2 className="h-3.5 w-3.5" />
        SAFE
      </span>
    </li>
  );
}
