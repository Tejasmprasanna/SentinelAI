import { jsPDF } from "jspdf";

function buildAiSummary(threats, highCount, mediumCount) {
  const parts = [];
  const typeOf = (t) => String(t?.attack_type ?? "").toLowerCase();

  if (threats.some((t) => typeOf(t).includes("brute"))) {
    parts.push("Repeated brute-force attempts detected.");
  }
  if (threats.some((t) => typeOf(t).includes("sql") || typeOf(t).includes("injection"))) {
    parts.push("Injection-style attacks observed.");
  }
  if (threats.some((t) => typeOf(t).includes("xss"))) {
    parts.push("Cross-site scripting indicators present.");
  }
  if (threats.some((t) => typeOf(t).includes("port") || typeOf(t).includes("scan"))) {
    parts.push("Reconnaissance or scanning activity noted.");
  }

  let risk = "LOW";
  if (highCount >= 2 || (highCount >= 1 && mediumCount >= 4)) {
    risk = "HIGH";
  } else if (highCount >= 1 || mediumCount >= 2 || threats.length >= 4) {
    risk = "MEDIUM";
  }
  parts.push(`Overall system risk: ${risk}.`);

  if (parts.length === 1) {
    return "Scan complete. No major attack categories matched heuristics. " + parts[0];
  }
  return parts.join(" ");
}

/**
 * Downloads SentinelAI_Report.pdf with summary, threats, safe sample, and AI-style summary.
 */
export function generateReport({
  allLogs = [],
  safeLogs = [],
  threatLogs = [],
  threats = [],
  fileName = "SentinelAI_Report.pdf",
}) {
  const totalLogs = allLogs.length;
  const safeCount = safeLogs.length;
  const threatLogCount = threatLogs.length;
  const threatSources = threats.length;
  const mediumCount = threats.filter((t) => t?.severity === "Medium").length;
  const highCount = threats.filter((t) => t?.severity === "High").length;

  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 48;
  const maxW = pageW - 2 * margin;
  let y = margin;

  const newPageIfNeeded = (delta) => {
    if (y + delta > pageH - margin) {
      doc.addPage();
      y = margin;
    }
  };

  const body = (size = 10) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(size);
    doc.setTextColor(40, 40, 40);
  };

  const bold = (size = 11) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(size);
    doc.setTextColor(20, 20, 20);
  };

  const writeParagraph = (text, lineHeight = 13, fontSize = 10) => {
    body(fontSize);
    const lines = doc.splitTextToSize(String(text), maxW);
    lines.forEach((line) => {
      newPageIfNeeded(lineHeight);
      doc.text(line, margin, y);
      y += lineHeight;
    });
  };

  const writeTitle = (text) => {
    bold(18);
    newPageIfNeeded(28);
    doc.text(text, margin, y);
    y += 28;
  };

  const writeSectionTitle = (text) => {
    y += 8;
    bold(13);
    newPageIfNeeded(22);
    doc.text(text, margin, y);
    y += 22;
  };

  writeTitle("SentinelAI Threat Analysis Report");
  body(10);
  doc.setTextColor(80, 80, 80);
  writeParagraph(`Generated: ${new Date().toLocaleString()}`, 14, 10);
  y += 6;

  writeSectionTitle("SECTION 1: Summary");
  body(10);
  writeParagraph(`Total Logs: ${totalLogs}`);
  writeParagraph(`Safe Logs: ${safeCount}`);
  writeParagraph(`Threat Logs: ${threatLogCount}`);
  writeParagraph(`Threat Sources: ${threatSources}`);
  writeParagraph(`Medium Severity: ${mediumCount}`);
  writeParagraph(`High Severity: ${highCount}`);
  y += 4;

  writeSectionTitle("SECTION 2: Threat Details");
  if (!threats.length) {
    writeParagraph("No grouped threat records.");
  } else {
    threats.forEach((t, i) => {
      writeParagraph(
        `Threat ${i + 1}: IP ${t.ip ?? "—"} | ${t.attack_type ?? "Unknown"} | Attempts: ${t.attempts ?? 0} | Severity: ${t.severity ?? "—"}`
      );
      writeParagraph(`Explanation: ${t.explanation ?? "—"}`);
      y += 4;
    });
  }
  y += 4;

  writeSectionTitle("SECTION 3: Safe Activity (first 10 lines)");
  const sample = safeLogs.slice(0, 10);
  if (!sample.length) {
    writeParagraph("No safe lines to display.");
  } else {
    sample.forEach((log, i) => {
      const msg = (log.message || "").replace(/\s+/g, " ").trim();
      const short = msg.length > 140 ? `${msg.slice(0, 137)}…` : msg;
      writeParagraph(`${i + 1}. IP: ${log.ip ?? "—"} — ${short}`);
    });
  }
  y += 4;

  writeSectionTitle("SECTION 4: AI Summary");
  writeParagraph(buildAiSummary(threats, highCount, mediumCount));

  doc.save(fileName);
}
