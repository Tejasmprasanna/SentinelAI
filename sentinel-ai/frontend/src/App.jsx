import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import LiveStatus from "./components/LiveStatus.jsx";
import Header from "./components/Header.jsx";
import SummaryCards from "./components/SummaryCards.jsx";
import Tabs from "./components/Tabs.jsx";
import ThreatCharts from "./components/ThreatCharts.jsx";
import ThreatsView from "./components/ThreatsView.jsx";
import SafeLogsView from "./components/SafeLogsView.jsx";
import UploadSection from "./components/UploadSection.jsx";
import ReportActions from "./components/ReportActions.jsx";

const ANALYZE_URL = "http://localhost:8001/analyze";

export default function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allLogs, setAllLogs] = useState([]);
  const [threats, setThreats] = useState([]);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState("threats");
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [blockedIPs, setBlockedIPs] = useState([]);

  const blockIP = (ip) => {
    if (!ip) return;
    setBlockedIPs((prev) => (prev.includes(ip) ? prev : [...prev, ip]));
  };

  const threatLogs = useMemo(
    () => allLogs.filter((log) => log.isThreat === true),
    [allLogs]
  );

  const safeLogs = useMemo(
    () => allLogs.filter((log) => log.isThreat === false),
    [allLogs]
  );

  useEffect(() => {
    setError(null);
  }, [file]);

  const handleFileChange = (e) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    setAllLogs([]);
    setThreats([]);
    setBlockedIPs([]);
    setHasAnalyzed(false);
    setTab("threats");
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError("Select a .txt log file first.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(ANALYZE_URL, formData);
      const data = response?.data ?? {};

      const nextLogs = data.logs ?? [];
      const nextThreats = data.threats ?? [];

      setAllLogs(Array.isArray(nextLogs) ? nextLogs : []);
      setThreats(Array.isArray(nextThreats) ? nextThreats : []);
      setBlockedIPs([]);
      setHasAnalyzed(true);
      setTab("threats");
    } catch (err) {
      console.error(err);
      setThreats([]);
      setAllLogs([]);
      setBlockedIPs([]);
      setHasAnalyzed(false);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Could not reach the API. Is the backend running on port 8001?"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <LiveStatus />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gray-950" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(76,29,149,0.35),transparent_50%),radial-gradient(ellipse_80%_50%_at_100%_0%,rgba(37,99,235,0.18),transparent),radial-gradient(ellipse_60%_40%_at_0%_100%,rgba(6,182,212,0.08),transparent)]" />

      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-10 sm:px-6 lg:px-8">
        <Header />

        <main className="flex flex-1 flex-col gap-8">
          <SummaryCards
            allLogs={allLogs}
            threats={threats}
            safeLogs={safeLogs}
            threatLogs={threatLogs}
          />

          <ReportActions
            disabled={!hasAnalyzed || allLogs.length === 0}
            allLogs={allLogs}
            safeLogs={safeLogs}
            threatLogs={threatLogs}
            threats={threats}
          />

          <UploadSection
            file={file}
            loading={loading}
            error={error}
            onFileChange={handleFileChange}
            onAnalyze={handleAnalyze}
          />

          <section className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl sm:p-6">
            <Tabs active={tab} onChange={setTab}>
              {tab === "threats" && (
                <ThreatsView
                  loading={loading}
                  threats={threats}
                  hasAnalyzed={hasAnalyzed}
                  allLogs={allLogs}
                  safeLogs={safeLogs}
                  blockedIPs={blockedIPs}
                  onBlockIP={blockIP}
                />
              )}
              {tab === "safe" && (
                <SafeLogsView
                  logs={safeLogs}
                  hasAnalyzed={hasAnalyzed}
                  allLogs={allLogs}
                  threats={threats}
                  loading={loading}
                />
              )}
            </Tabs>
            <ThreatCharts threats={threats} />
          </section>
        </main>

        <footer className="mt-16 border-t border-white/5 py-8 text-center font-mono text-xs text-slate-600">
          <span className="text-slate-500">POST</span>{" "}
          <code className="rounded bg-slate-900/80 px-2 py-0.5 text-slate-400">{ANALYZE_URL}</code>
          <span className="mx-2 text-slate-700">·</span>
          Local analysis · no external keys
        </footer>
      </div>
    </div>
  );
}
