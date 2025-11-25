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
  color: string;
};

interface ChartFinanceiroProps {
  data: PieDataItem[];
}

const ChartFinanceiro: React.FC<ChartFinanceiroProps> = ({ data }) => {
  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius="80%"
            label={({ name, value, percent }) =>
              `${name} - R$ ${value.toFixed(2)} (${(percent * 100).toFixed(
                0
              )}%)`
            }
          >
            {data.map((item, i) => (
              <Cell key={i} fill={item.color} />
            ))}
          </Pie>

          <Tooltip
            formatter={(value: number, name: string) => [
              `R$ ${value.toFixed(2)}`,
              name,
            ]}
            contentStyle={{
              backgroundColor: "#0b0b0b",
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.06)",
            }}
            itemStyle={{ color: "#fff" }}
          />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartFinanceiro;
