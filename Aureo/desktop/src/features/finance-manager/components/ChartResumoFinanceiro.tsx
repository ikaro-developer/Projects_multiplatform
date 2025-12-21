import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface ChartResumoFinanceiroProps {
  totalIncome: number;
  totalExpense: number;
}

const ChartResumoFinanceiro = ({
  totalIncome,
  totalExpense,
}: ChartResumoFinanceiroProps) => {
  const balance = totalIncome - totalExpense;

  const summaryData = [
    { name: "Receitas", value: totalIncome, color: "#10b981" },
    { name: "Despesas", value: totalExpense, color: "#ef4444" },
  ].filter((item) => item.value > 0);

  return (
    <>
      {summaryData.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-zinc-400">
          Nenhuma transação registrada neste mês
        </div>
      ) : (
        <>
          {/* Gráfico */}
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={summaryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={60}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {summaryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>

              <Tooltip
                formatter={(value: number, name: string, props: any) => {
                  const percent = props.payload.percent * 100;
                  return [
                    `R$ ${value.toFixed(2)} (${percent.toFixed(0)}%)`,
                    name,
                  ];
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>

          {/* Resumo */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between gap-1 p-3 bg-emerald-500/10 rounded-lg">
              <span className="font-medium">Total Receitas:</span>
              <span className="text-xl font-bold text-emerald-400">
                R$ {totalIncome.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-1 p-3 bg-red-500/10 rounded-lg">
              <span className="font-medium  ">Total Despesas:</span>
              <span className="text-xl font-bold text-red-400">
                R$ {totalExpense.toFixed(2)}
              </span>
            </div>
            <div
              className={`flex items-center justify-between gap-1 p-3 rounded-lg ${
                balance >= 0 ? "bg-emerald-600/20" : "bg-red-600/20"
              }`}
            >
              <span className="font-medium">Saldo do Mês:</span>
              <span
                className={`text-xl font-bold ${
                  balance >= 0 ? "text-emerald-400" : "text-red-400"
                }`}
              >
                R$ {balance.toFixed(2)}
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ChartResumoFinanceiro;
