import { AlertCircle, FileUp } from "lucide-react";

export default function UploadSection({
  file,
  loading,
  error,
  onFileChange,
  onAnalyze,
}) {
  return (
    <section className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition duration-300 hover:border-violet-400/35 hover:shadow-[0_0_40px_-12px_rgba(139,92,246,0.25)] sm:p-8">
      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-600/10 blur-2xl transition group-hover:bg-violet-600/15" />
      <div className="mb-1 flex items-center gap-2 font-mono text-sm font-semibold uppercase tracking-widest text-violet-300/90">
        <FileUp className="h-4 w-4" />
        Ingest
      </div>
      <p className="mb-6 text-sm leading-relaxed text-slate-400">
        Drop a <span className="font-mono text-cyan-400/90">.txt</span> log file. We parse failed
        authentication events and surface brute-force patterns.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
        <label className="inline-flex cursor-pointer items-center gap-3 transition hover:opacity-95">
          <input
            type="file"
            accept=".txt,text/plain"
            className="sr-only"
            onChange={onFileChange}
          />
          <span className="inline-flex items-center gap-2 rounded-xl border border-violet-500/40 bg-violet-950/40 px-4 py-2.5 font-mono text-sm text-violet-200 shadow-sm transition hover:border-violet-400/60 hover:bg-violet-900/50">
            Choose file
          </span>
          {file ? (
            <span className="max-w-[200px] truncate font-mono text-sm text-cyan-300/95" title={file.name}>
              {file.name}
            </span>
          ) : (
            <span className="text-sm text-slate-500">No file selected</span>
          )}
        </label>

        <button
          type="button"
          disabled={loading || !file}
          aria-busy={loading}
          className="inline-flex min-w-[10rem] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition duration-200 enabled:hover:scale-[1.02] enabled:hover:shadow-violet-500/40 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={onAnalyze}
        >
          {loading ? (
            <>
              <span
                className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-white/25 border-t-white"
                aria-hidden
              />
              Analyzing...
            </>
          ) : (
            "Analyze"
          )}
        </button>
      </div>

      {error && (
        <div
          className="mt-5 flex items-start gap-3 rounded-xl border border-rose-500/40 bg-rose-950/40 p-4 text-sm text-rose-200 backdrop-blur-sm"
          role="alert"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
          <div>
            <p className="font-semibold text-rose-100">Analysis failed</p>
            <p className="mt-1 text-rose-200/90">{error}</p>
          </div>
        </div>
      )}
    </section>
  );
}
