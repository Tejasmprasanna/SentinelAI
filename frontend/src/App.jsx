import React, { useState } from "react";

const ANALYZE_URL = "https://sentinelai-zuqj.onrender.com/analyze";

export default function App() {
  const [file, setFile] = useState(null);
  const [allLogs, setAllLogs] = useState([]);
  const [threats, setThreats] = useState([]);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [tab, setTab] = useState("threats");

  const handleAnalyze = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(ANALYZE_URL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      console.log("API Response:", data);

      setAllLogs(data.logs || []);
      setThreats(data.threats || []);
      setHasAnalyzed(true);
      setTab("threats");

    } catch (err) {
      console.error("ERROR:", err);
      alert("Backend not reachable");
    }
  };

  return (
    <div>
      <h1>SentinelAI</h1>
    </div>
  );
}