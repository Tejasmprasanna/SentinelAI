import re

# Spec: extract IP using a regex like \d{1,3}(\.\d{1,3}){3}
IPV4 = re.compile(r"\b\d{1,3}(?:\.\d{1,3}){3}\b")

# Threat indicators (case-insensitive)
FAILED_PASSWORD = re.compile(r"failed\s+password", re.IGNORECASE)
STATUS_FAILED = re.compile(r"status\s*=\s*FAILED", re.IGNORECASE)

# SQL injection: SELECT|DROP|OR '1'='1'
SQL_KEYWORDS = re.compile(r"\b(?:SELECT|DROP)\b", re.IGNORECASE)
SQL_TAUTOLOGY = re.compile(
    r"OR\s*['\"]?1['\"]?\s*=\s*['\"]?1['\"]?",
    re.IGNORECASE,
)

# XSS: <script> | onerror
XSS_SCRIPT_TAG = re.compile(r"<\s*script\b", re.IGNORECASE)
XSS_ONERROR = re.compile(r"onerror\s*=", re.IGNORECASE)

# Port scan
PORT_SCAN = re.compile(r"port\s*scan\s*detected", re.IGNORECASE)


def _extract_ip(line: str) -> str | None:
    m = IPV4.search(line)
    return m.group(0) if m else None


def _detect_type_and_threat(line: str) -> tuple[str, bool]:
    """
    Return (type, isThreat) for a single line.

    Type one of: Brute Force|SQL Injection|XSS|Port Scan|Normal
    """
    # 1) Brute force / failed authentication
    if FAILED_PASSWORD.search(line) or STATUS_FAILED.search(line):
        return "Brute Force", True

    # 2) SQL injection
    if SQL_KEYWORDS.search(line) or "OR '1'='1'" in line or SQL_TAUTOLOGY.search(line):
        return "SQL Injection", True

    # 3) XSS
    if XSS_SCRIPT_TAG.search(line) or XSS_ONERROR.search(line):
        return "XSS", True

    # 4) Port scan
    if PORT_SCAN.search(line) or re.search(r"Port scan detected\.", line, re.IGNORECASE):
        return "Port Scan", True

    return "Normal", False


def parse_logs(log_lines: list[str]) -> list[dict]:
    """
    Parse raw log lines into structured objects.

    Output shape per line:
    { "ip": "...", "message": "...", "type": "Brute Force|SQL Injection|XSS|Port Scan|Normal", "isThreat": true/false }
    """
    entries: list[dict] = []
    for line in log_lines:
        message = line.rstrip("\r\n")
        if not message.strip():
            continue

        ip = _extract_ip(message)
        event_type, is_threat = _detect_type_and_threat(message)
        entries.append(
            {
                "ip": ip,
                "message": message,
                "type": event_type,
                "isThreat": bool(is_threat),
            }
        )

    return entries
