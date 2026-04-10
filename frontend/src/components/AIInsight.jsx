import { Brain, ShieldAlert, Wrench } from "lucide-react";

export default function AIInsight({ insight }) {
  if (!insight) return null;

  const rows = [
    { icon: Brain, label: "What this attack means", text: insight.what },
    { icon: ShieldAlert, label: "Why it is dangerous", text: insight.why },
    { icon: Wrench, label: "Suggested mitigation", text: insight.mitigation },
  ];

  return (
    <div className="mt-4 rounded-2xl border border-violet-500/20 bg-slate-950/50 p-5 text-slate-300 shadow-inner backdrop-blur-md transition hover:border-violet-400/30">
      <div className="mb-4 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-violet-300">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-violet-500/20 text-violet-300">
          ✦
        </span>
        AI Insight
      </div>
      <dl className="space-y-4 text-sm leading-relaxed">
        {rows.map(({ icon: Icon, label, text }) => (
          <div key={label}>
            <dt className="mb-1.5 flex items-center gap-2 font-medium text-slate-400">
              <Icon className="h-4 w-4 shrink-0 text-violet-400/80" strokeWidth={2} />
              {label}
            </dt>
            <dd className="pl-6 text-slate-300">{text}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
