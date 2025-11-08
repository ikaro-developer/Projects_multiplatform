import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

export type PieDataItem = {
  name: string;
  value: number;
};

interface ChartFinanceiroProps {
  data: PieDataItem[];
  colors?: string[]; // cores das fatias
  height?: number | string; // altura do container (px ou %)
  showLegend?: boolean;
  showLabels?: boolean;
}

const ChartFinanceiro: React.FC<ChartFinanceiroProps> = ({
  data,
  colors = ["#32A2AA", "#0EA5E9", "#A855F7", "#F59E0B", "#EF4444"],
  height = 300,
  showLegend = true,
  showLabels = true,
}) => {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius="80%"
            label={
              showLabels
                ? ({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                : undefined
            }
          >
            {data.map((_, i) => (
              <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#0b0b0b",
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.06)",
            }}
            itemStyle={{ color: "#fff" }}
          />
          {showLegend && <Legend />}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartFinanceiro;
