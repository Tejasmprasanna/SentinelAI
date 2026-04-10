/**
 * Fixed top-left — green pulsing indicator + System Active (demo-ready).
 */
export default function LiveStatus() {
  return (
    <div
      className="fixed left-4 top-4 z-[100] flex items-center gap-2.5 rounded-full border border-white/10 bg-slate-950/85 px-3.5 py-2 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:left-6 sm:top-6"
      role="status"
      aria-label="System active"
    >
      <span className="relative flex h-3 w-3 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/40" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_14px_rgba(34,197,94,0.85)] ring-2 ring-emerald-400/35" />
      </span>
      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-100/95">
        System Active
      </span>
    </div>
  );
}
