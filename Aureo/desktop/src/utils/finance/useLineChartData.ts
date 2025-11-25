import { useMemo } from "react";
import type { Transaction, Category } from "@/types/FinancasType";

export const useLineChartData = (
  transaction: Transaction[],
  category: Category[]
) => {
  return useMemo(() => {
    const months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    const categoriesMap = Object.fromEntries(category.map((c) => [c.id, c]));

    const totalPorMes: Record<
      string,
      { totalDespesa: number; totalReceita: number; totalLucro: number }
    > = {};

    transaction.forEach((t) => {
      const cat = categoriesMap[t.categoria_id];
      if (!cat) return;

      const year = Number(t.data.slice(0, 4));
      const month = Number(t.data.slice(5, 7));
      const key = `${year}-${String(month).padStart(2, "0")}`;

      if (!totalPorMes[key])
        totalPorMes[key] = { totalDespesa: 0, totalReceita: 0, totalLucro: 0 };

      if (cat.type === "Despesa") totalPorMes[key].totalDespesa += t.valor;
      else totalPorMes[key].totalReceita += t.valor;

      totalPorMes[key].totalLucro =
        totalPorMes[key].totalReceita - totalPorMes[key].totalDespesa;
    });

    const data = Object.entries(totalPorMes)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([ym, valores]) => {
        const [, mes] = ym.split("-");
        return {
          mes: months[Number(mes) - 1],
          despesas: valores.totalDespesa,
          receita: valores.totalReceita,
          lucro: valores.totalLucro,
        };
      });

    return data;
  }, [transaction, category]);
};
