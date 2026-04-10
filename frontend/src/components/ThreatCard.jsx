import { Ban, Crosshair, Globe, Hash, Shield } from "lucide-react";
import { getSeverityTheme, getThreatInsight, getWhyFlaggedText } from "../utils/threatUtils.js";
import AIInsight from "./AIInsight.jsx";

const blockedShell =
  "border border-slate-600/90 border-l-4 border-l-slate-500 bg-slate-950/70 ring-1 ring-red-900/40 shadow-[0_0_28px_-10px_rgba(127,29,29,0.45)] hover:shadow-[0_0_40px_-8px_rgba(127,29,29,0.4)]";

export default function ThreatCard({ threat, index, blocked, onBlockIP }) {
  const theme = getSeverityTheme(threat.severity);
  const generated = getThreatInsight(threat);
  const insight = threat.explanation
    ? { ...generated, what: threat.explanation }
    : generated;
  const whyFlagged = getWhyFlaggedText(threat);

  const attempts = Number(threat.attempts) || 0;
  const confidence = Math.min(100, attempts * 15);

  return (
    <li className="min-w-0">
      <div
        className={`animate-threat-in rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${
          blocked ? blockedShell : theme.card
        }`}
        style={{ animationDelay: `${index * 85}ms` }}
      >
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="mb-1.5 flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              <Globe className="h-3.5 w-3.5 text-cyan-500/80" />
              IP Address
            </p>
            <p className="break-all font-mono text-xl font-bold tracking-tight text-cyan-300 sm:text-2xl">
              {threat.ip}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {blocked ? (
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-slate-500/70 bg-slate-900/90 px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wide text-slate-100 shadow-inner ring-1 ring-red-900/50">
                <Ban className="h-3.5 w-3.5 opacity-90" />
                BLOCKED
              </span>
            ) : null}
            <span
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-wide ${theme.badge}`}
            >
              <Shield className="h-3.5 w-3.5 opacity-90" />
              {threat.severity ?? "—"}
            </span>
          </div>
        </div>

        <p className="mb-1.5 flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
          <Crosshair className="h-3.5 w-3.5 text-violet-400/80" />
          Attack type
        </p>
        <p className="mb-5 text-lg font-bold leading-snug text-slate-50">{threat.attack_type}</p>

        <div className="mb-5 rounded-xl border border-white/5 bg-slate-950/40 p-5">
          <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Why flagged:
          </p>
          <p className="text-sm italic leading-relaxed text-slate-400/95">{whyFlagged}</p>
          <p className="mt-3 font-mono text-[11px] tabular-nums text-slate-500">
            Confidence:{" "}
            <span className="font-semibold text-slate-400/90">{confidence}%</span>
          </p>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Attempts
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-600/60 bg-slate-900/80 px-3 py-1.5 font-mono text-sm font-semibold tabular-nums text-amber-300 shadow-inner ring-1 ring-white/5">
            <Hash className="h-3.5 w-3.5 text-amber-400/90" />
            {threat.attempts}
          </span>
        </div>

        <button
          type="button"
          disabled={blocked}
          onClick={() => onBlockIP?.(threat.ip)}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-rose-500/45 bg-rose-950/45 px-4 py-3 font-mono text-sm font-bold text-rose-50 shadow-sm transition-all duration-300 hover:border-rose-400/70 hover:bg-rose-950/75 hover:shadow-[0_0_28px_-4px_rgba(244,63,94,0.6)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:shadow-none sm:w-auto"
        >
          <Ban className="h-4 w-4 shrink-0" />
          Block IP
        </button>
      </div>

      <div className="mt-6 transition-opacity duration-300">
        <AIInsight insight={insight} />
      </div>
    </li>
  );
}
