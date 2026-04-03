from collections import defaultdict

BRUTE_FORCE_THRESHOLD = 5


def detect_attacks(parsed_logs: list[dict]) -> list[dict]:
    """
    Aggregate parsed logs by IP and emit threat summaries.
    """
    # Per-IP counts by type
    by_ip_type: dict[str, dict[str, int]] = defaultdict(lambda: defaultdict(int))
    for p in parsed_logs:
        t = p.get("type")
        ip = p.get("ip")
        if not t or not ip:
            continue
        if t == "Normal":
            continue
        by_ip_type[ip][t] += 1

    threats: list[dict] = []

    for ip, counts in by_ip_type.items():
        # 1) Brute force — >= 5 failed attempts => High severity
        brute_force_attempts = counts.get("Brute Force", 0)
        if brute_force_attempts >= BRUTE_FORCE_THRESHOLD:
            threats.append(
                {
                    "attack_type": "Brute Force Attempt",
                    "ip": ip,
                    "attempts": brute_force_attempts,
                    "severity": "High",
                    "explanation": (
                        "Repeated failed authentication attempts from this host suggest password guessing "
                        "or credential stuffing. If weak credentials exist, accounts may be compromised."
                    ),
                }
            )

        # 2) SQL injection, XSS, Port scan => Medium severity (any occurrence)
        sql_attempts = counts.get("SQL Injection", 0)
        if sql_attempts >= 1:
            threats.append(
                {
                    "attack_type": "SQL Injection Attempt",
                    "ip": ip,
                    "attempts": sql_attempts,
                    "severity": "Medium",
                    "explanation": (
                        "Indicators of SQL injection (e.g., SQL keywords or tautologies) suggest an attempt to "
                        "manipulate database queries. Validate inputs and use parameterized queries."
                    ),
                }
            )

        xss_attempts = counts.get("XSS", 0)
        if xss_attempts >= 1:
            threats.append(
                {
                    "attack_type": "XSS Attack Detected",
                    "ip": ip,
                    "attempts": xss_attempts,
                    "severity": "Medium",
                    "explanation": (
                        "Indicators of XSS (e.g., script payloads or onerror handlers) suggest a request that "
                        "may execute in a user's browser. Apply output encoding and CSP."
                    ),
                }
            )

        port_scan_attempts = counts.get("Port Scan", 0)
        if port_scan_attempts >= 1:
            threats.append(
                {
                    "attack_type": "Port Scanning Detected",
                    "ip": ip,
                    "attempts": port_scan_attempts,
                    "severity": "Medium",
                    "explanation": (
                        "Port scan indicators suggest reconnaissance to identify open services prior to "
                        "further exploitation. Use network segmentation and monitor scanning patterns."
                    ),
                }
            )

    # Sort: High first, then Medium by attempts desc for a stable, readable UI.
    sev_rank = {"High": 0, "Medium": 1}

    def sort_key(th: dict):
        return (sev_rank.get(th.get("severity", "Medium"), 9), -int(th.get("attempts", 0)))

    threats.sort(key=sort_key)
    return threats
