const IPV4 = /\b(?:\d{1,3}\.){3}\d{1,3}\b/;

/**
 * Parse raw log text into entries with optional IP + short message (for Safe / summary).
 */
export function parseLogFileText(text) {
  if (!text) return [];
  const lines = text.split(/\r?\n/);
  const entries = [];
  lines.forEach((line, i) => {
    const trimmed = line.trim();
    if (!trimmed) return;
    const m = trimmed.match(IPV4);
    const msg =
      trimmed.length > 140 ? `${trimmed.slice(0, 137)}…` : trimmed;
    entries.push({
      id: `log-${i}`,
      ip: m ? m[0] : null,
      message: msg,
    });
  });
  return entries;
}

export function countNonEmptyLines(text) {
  if (!text) return 0;
  return text.split(/\r?\n/).filter((l) => l.trim()).length;
}
