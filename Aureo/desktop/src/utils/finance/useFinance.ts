import { useContext } from "react";
import { ContextFinance } from "@/context/FinanceContext";
import { useMonthlySummary } from "./useMonthlySummary";
import { useCategoriesPie } from "./useCategoriesPie";
import { useLineChartData } from "./useLineChartData";
import { useMonthlyTransactions } from "./useMonthlyTransactions";

export const useFinance = () => {
  const { transaction, category, selectedMonth } = useContext(ContextFinance);

  interface ChartConfig {
    [key: string]: { label: string; color: string };
  }

  const valoresDoMes = useMonthlySummary(transaction, category, selectedMonth);
  const {
    despesas: categoriasArrayDespesas,
    receitas: categoriasArrayReceitas,
  } = useCategoriesPie(transaction, category, selectedMonth);
  const data = useLineChartData(transaction, category);

  const transacoesOrdenadas = useMonthlyTransactions(
    transaction,
    category,
    selectedMonth
  );

  const config: ChartConfig = {
    despesas: { label: "Despesas", color: "hsl(0,70%,55%)" },
    lucro: { label: "Lucro", color: "hsl(160,80%,45%)" },
    receita: { label: "Receita", color: "hsl(42,86%,55%)" },
  };
  const dataKeys = Object.keys(config);

  return {
    valoresDoMes,
    categoriasArrayDespesas,
    categoriasArrayReceitas,
    data,
    dataKeys,
    config,
    transacoesOrdenadas,
  };
};
