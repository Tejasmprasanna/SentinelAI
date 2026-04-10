import { Activity, AlertCircle, AlertTriangle, FileText, Radar, ShieldCheck } from "lucide-react";

function StatCard({ label, value, icon: Icon, accent, glow, border, tooltip }) {
  return (
    <div
      className={`group relative rounded-2xl border bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${border} ${glow}`}
    >
      {tooltip ? (
        <div
          role="tooltip"
          className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 w-max max-w-[240px] -translate-x-1/2 rounded-lg border border-white/15 bg-slate-950/95 px-3 py-2 text-center text-[11px] leading-snug text-slate-200 opacity-0 shadow-2xl backdrop-blur-md transition-opacity duration-200 ease-out group-hover:opacity-100"
        >
          {tooltip}
          <span className="absolute left-1/2 top-full -mt-px -translate-x-1/2 border-[6px] border-transparent border-t-slate-950/95" />
        </div>
      ) : null}
      <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/5 blur-2xl" />
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{label}</p>
          <p
            className={`mt-2 font-mono text-3xl font-bold tabular-nums tracking-tight sm:text-4xl ${accent}`}
          >
            {value}
          </p>
        </div>
        <Icon className={`h-8 w-8 shrink-0 opacity-85 ${accent}`} strokeWidth={1.5} />
      </div>
    </div>
  );
}

export default function SummaryCards({ allLogs, threats, safeLogs, threatLogs }) {
  const totalLogsCount = Array.isArray(allLogs) ? allLogs.length : 0;
  const safeLogsCount = Array.isArray(safeLogs) ? safeLogs.length : 0;
  const threatLogsCount = Array.isArray(threatLogs) ? threatLogs.length : 0;
  const threatSourcesCount = Array.isArray(threats) ? threats.length : 0;
  const mediumSeverityCount = Array.isArray(threats)
    ? threats.filter((t) => t?.severity === "Medium").length
    : 0;
  const highSeverityCount = Array.isArray(threats)
    ? threats.filter((t) => t?.severity === "High").length
    : 0;

  const items = [
    {
      label: "Total Logs",
      value: totalLogsCount,
      icon: FileText,
      glow: "shadow-[0_0_32px_-8px_rgba(34,211,238,0.35)]",
      border: "border-white/10",
      accent: "text-cyan-300",
      tooltip: "All parsed log lines (safe + threat lines).",
    },
    {
      label: "Safe Logs",
      value: safeLogsCount,
      icon: ShieldCheck,
      glow: "shadow-[0_0_32px_-8px_rgba(34,197,94,0.28)]",
      border: "border-white/10",
      accent: "text-emerald-300",
      tooltip: "Lines with isThreat: false (benign activity).",
    },
    {
      label: "Threat Logs",
      value: threatLogsCount,
      icon: AlertTriangle,
      glow: "shadow-[0_0_32px_-8px_rgba(239,68,68,0.30)]",
      border: "border-white/10",
      accent: "text-red-300",
      tooltip: "Individual malicious events (line-level).",
    },
    {
      label: "Threat Sources",
      value: threatSourcesCount,
      icon: Radar,
      glow: "shadow-[0_0_32px_-8px_rgba(167,139,250,0.35)]",
      border: "border-white/10",
      accent: "text-violet-300",
      tooltip: "Unique attacking IPs (grouped attacks).",
    },
    {
      label: "Medium Severity",
      value: mediumSeverityCount,
      icon: AlertCircle,
      glow: "shadow-[0_0_32px_-8px_rgba(234,179,8,0.28)]",
      border: "border-white/10",
      accent: "text-amber-300",
      tooltip: "IPs with medium severity attacks.",
    },
    {
      label: "High Severity",
      value: highSeverityCount,
      icon: Activity,
      glow: "shadow-[0_0_32px_-8px_rgba(249,115,22,0.35)]",
      border: "border-white/10",
      accent: "text-orange-300",
      tooltip: "IPs with high severity attacks.",
    },
  ];

  return (
    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {items.map((item) => (
        <StatCard key={item.label} {...item} />
      ))}
    </section>
  );
}
