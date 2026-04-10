export default function Tabs({ active, onChange, children }) {
  return (
    <div className="w-full">
      <div
        className="mb-6 flex gap-2 rounded-2xl border border-white/10 bg-slate-900/50 p-1.5 backdrop-blur-md"
        role="tablist"
      >
        <button
          type="button"
          role="tab"
          aria-selected={active === "threats"}
          className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition duration-200 ${
            active === "threats"
              ? "bg-gradient-to-r from-violet-600/90 to-rose-600/80 text-white shadow-lg shadow-violet-500/20"
              : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
          }`}
          onClick={() => onChange("threats")}
        >
          <span aria-hidden>🚨</span>
          Threats
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={active === "safe"}
          className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition duration-200 ${
            active === "safe"
              ? "bg-gradient-to-r from-emerald-600/90 to-cyan-700/80 text-white shadow-lg shadow-emerald-500/20"
              : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
          }`}
          onClick={() => onChange("safe")}
        >
          <span aria-hidden>✅</span>
          Safe Activity
        </button>
      </div>
      {children}
    </div>
  );
}
