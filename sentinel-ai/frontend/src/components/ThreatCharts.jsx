import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BarChart3, PieChart as PieIcon } from "lucide-react";

const SEVERITY_COLORS = {
  high: "#f87171",
  medium: "#fbbf24",
};

function severityColor(name) {
  const key = String(name).toLowerCase();
  return SEVERITY_COLORS[key] || "#94a3b8";
}

export default function ThreatCharts({ threats }) {
  const barData = useMemo(
    () =>
      (threats || []).map((t) => ({
        ip: t.ip ?? "Unknown",
        attempts: Number(t.attempts) || 0,
      })),
    [threats]
  );

  const { highCount, mediumCount } = useMemo(() => {
    const high = (threats || []).filter((t) => t?.severity === "High").length;
    const medium = (threats || []).filter((t) => t?.severity === "Medium").length;
    return { highCount: high, mediumCount: medium };
  }, [threats]);

  const pieData = useMemo(
    () =>
      [
        { name: "High", value: highCount },
        { name: "Medium", value: mediumCount },
      ].filter((d) => d.value > 0),
    [highCount, mediumCount]
  );

  if (!threats?.length) return null;

  const tooltipStyle = {
    backgroundColor: "rgba(15, 23, 42, 0.96)",
    border: "1px solid rgba(139, 92, 246, 0.35)",
    borderRadius: "10px",
    fontSize: "12px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
  };

  return (
    <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-stretch">
      <div className="min-w-0 flex-1 rounded-xl border border-white/5 bg-transparent p-4">
        <h3 className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-slate-300">
          <BarChart3 className="h-3.5 w-3.5 text-cyan-400/90" />
          Attempts per IP
        </h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barData}
              margin={{ top: 12, right: 12, left: 4, bottom: 52 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#334155"
                opacity={0.45}
              />
              <XAxis
                dataKey="ip"
                tick={{ fill: "#cbd5e1", fontSize: 11 }}
                angle={-32}
                textAnchor="end"
                height={64}
                interval={0}
              />
              <YAxis
                tick={{ fill: "#cbd5e1", fontSize: 11 }}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                labelStyle={{ color: "#e2e8f0" }}
                formatter={(value) => [value, "Attempts"]}
              />
              <Bar
                dataKey="attempts"
                name="Attempts"
                fill="url(#barGrad)"
                radius={[8, 8, 0, 0]}
                isAnimationActive
                animationDuration={900}
                animationEasing="ease-out"
              />
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity={1} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0.85} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="min-w-0 flex-1 rounded-xl border border-white/5 bg-transparent p-4">
        <h3 className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-slate-300">
          <PieIcon className="h-3.5 w-3.5 text-red-400/90" />
          Severity distribution
        </h3>
        <div className="h-80 w-full">
          {pieData.length === 0 ? (
            <div className="flex h-full items-center justify-center font-mono text-sm text-slate-500">
              No High/Medium severity counts to chart.
            </div>
          ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={108}
                innerRadius={48}
                paddingAngle={3}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                labelLine={{ stroke: "#64748b" }}
                isAnimationActive
                animationDuration={1000}
                animationEasing="ease-out"
              >
                {pieData.map((entry) => (
                  <Cell
                    key={`cell-${entry.name}`}
                    fill={severityColor(entry.name)}
                    stroke="rgba(15,23,42,0.85)"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(value, name) => [value, name === "value" ? "Count" : name]}
              />
            </PieChart>
          </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
