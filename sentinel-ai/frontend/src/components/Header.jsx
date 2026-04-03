import { Radar } from "lucide-react";

export default function Header() {
  return (
    <header className="relative mb-12 text-center">
      <div className="pointer-events-none absolute inset-0 -z-10 blur-3xl">
        <div className="mx-auto h-40 w-40 rounded-full bg-violet-600/20" />
      </div>
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 via-violet-500 to-blue-600 shadow-glow ring-2 ring-violet-400/40 transition duration-500 hover:scale-105 hover:ring-violet-300/50">
        <Radar className="h-8 w-8 text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.5)]" strokeWidth={2} />
      </div>
      <h1 className="bg-gradient-to-r from-purple-400 via-cyan-300 to-cyan-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl drop-shadow-[0_0_22px_rgba(167,139,250,0.45)]">
        SentinelAI
      </h1>
      <p className="mt-3 font-mono text-sm font-semibold tracking-wide text-gray-300/90 sm:text-base">
        Real-Time AI Cyber Attack Radar
      </p>
    </header>
  );
}
