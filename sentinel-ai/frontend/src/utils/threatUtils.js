/** Tailwind classes for card glow + severity badge */
export function getSeverityTheme(severity) {
  const s = String(severity ?? "").toLowerCase();
  if (s === "high") {
    return {
      card: "bg-white/5 border-l-4 border-red-500/80 shadow-[0_0_38px_-10px_rgba(239,68,68,0.65)] ring-1 ring-red-500/20 hover:shadow-[0_0_54px_-14px_rgba(239,68,68,0.65)]",
      badge:
        "border-red-500/60 bg-red-950/80 text-red-200 shadow-[0_0_16px_-4px_rgba(239,68,68,0.45)]",
    };
  }
  if (s === "medium") {
    return {
      card: "bg-white/5 border-l-4 border-amber-500/80 shadow-[0_0_38px_-10px_rgba(234,179,8,0.55)] ring-1 ring-amber-500/20 hover:shadow-[0_0_54px_-14px_rgba(234,179,8,0.55)]",
      badge:
        "border-amber-500/60 bg-amber-950/80 text-amber-200 shadow-[0_0_16px_-4px_rgba(234,179,8,0.42)]",
    };
  }
  if (s === "low") {
    return {
      card: "bg-white/5 border-l-4 border-emerald-500/70 shadow-[0_0_38px_-10px_rgba(34,197,94,0.45)] ring-1 ring-emerald-500/20 hover:shadow-[0_0_54px_-14px_rgba(34,197,94,0.45)]",
      badge:
        "border-emerald-500/50 bg-emerald-950/90 text-emerald-200 shadow-[0_0_16px_-4px_rgba(34,197,94,0.45)]",
    };
  }
  return {
    card: "bg-white/5 border-l-4 border-slate-500/60 shadow-[0_0_28px_-8px_rgba(148,163,184,0.25)] ring-1 ring-slate-500/20 hover:shadow-[0_0_40px_-8px_rgba(148,163,184,0.35)]",
    badge: "border-slate-500/50 bg-slate-800/90 text-slate-200 shadow-[0_0_12px_rgba(148,163,184,0.2)]",
  };
}

/** Rule-based insight (no external API) */
export function getThreatInsight(t) {
  const attack = String(t.attack_type ?? "").toLowerCase();
  const sev = String(t.severity ?? "").toLowerCase();
  const attempts = Number(t.attempts) || 0;
  const ip = t.ip || "this address";

  if (attack.includes("brute")) {
    return {
      what: `Many failed logins (${attempts} recorded) from ${ip} match password guessing or credential stuffing against your authentication.`,
      why:
        sev === "high"
          ? "A determined attacker could eventually guess weak or reused passwords and take over accounts or move deeper into your network."
          : "Repeated failures wear down defenses over time and may hide follow-on attempts if not contained.",
      mitigation:
        "Use account lockouts or progressive delays, require MFA, enforce strong passwords, and block or rate-limit the source IP (e.g. fail2ban, firewall, WAF). Review for any successful logins after the burst.",
    };
  }

  return {
    what: `This event is labeled "${t.attack_type || "Unknown"}" from ${ip} with ${attempts} supporting observations in the analyzed logs.`,
    why: "Unexpected or repeated access attempts can signal reconnaissance, misuse, or an early-stage attack.",
    mitigation: "Tighten monitoring on this source, verify patches and exposed services, and align response with your incident playbook.",
  };
}

/** One-line “why flagged” copy for the card (prefers backend explanation). */
export function getWhyFlaggedText(t) {
  if (t?.explanation && String(t.explanation).trim()) {
    return String(t.explanation).trim();
  }
  return getThreatInsight(t).what;
}
