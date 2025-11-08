import CardFinancas from "@/components/Financas/CardFinancas";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import GastosFinancas from "./GastosFinancas";
import ChartMensalFinanceiro from "@/components/Financas/ChartMensalfinanceiro";
import { MonthSelector } from "@/components/MonthSelector";
import { useState } from "react";
import { endOfMonth, startOfMonth } from "date-fns";
import TransacoesFinanceiro from "./TransacoesFinanceiro";
import CategoriaFinanceiro from "./CategoriaFinanceiro";

const FinancasHome = () => {
  // 📅 Dados do gráfico mensal
  const monthlyData = [
    { mes: "Jan", despesas: 1200, lucro: 400, receita: 1600 },
    { mes: "Fev", despesas: 900, lucro: 600, receita: 1500 },
    { mes: "Mar", despesas: 1100, lucro: 500, receita: 1700 },
    { mes: "Abr", despesas: 800, lucro: 700, receita: 1500 },
    { mes: "Mai", despesas: 950, lucro: 650, receita: 1600 },
    { mes: "Jun", despesas: 1050, lucro: 550, receita: 1700 },
  ];

  // 🎨 Configuração das cores e rótulos do gráfico
  const chartConfig = {
    despesas: { label: "Despesas", color: "hsl(0, 70%, 55%)" },
    lucro: { label: "Lucro", color: "hsl(160, 80%, 45%)" },
    receita: { label: "Receita", color: "hsl(42, 86%, 55%)" },
  };

  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const monthStart = startOfMonth(selectedMonth);
  const monthEnd = endOfMonth(selectedMonth);
  return (
    <section className="mt-6">
      <MonthSelector
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
      />
      {/* 📌 Cards de Resumo */}
      <div className="grid gap-4 md:grid-cols-3">
        <CardFinancas
          value={3000.0}
          text="Despesas do Mês"
          color="red"
          icon={TrendingDown}
        />
        <CardFinancas
          value={21.0}
          text="Lucro do Mês"
          color="blue"
          icon={TrendingUp}
        />
        <CardFinancas
          value={330}
          text="Receitas do Mês"
          color="amber"
          icon={Wallet}
        />
      </div>

      {/* 📊 Tabs principais */}
      <Tabs defaultValue="gastos" className="space-y-4 mt-8">
        <TabsList className="grid w-full grid-cols-3 bg-zinc-400/20">
          <TabsTrigger
            className="text-white cursor-pointer data-[state=active]:bg-[hsl(42_86%_55%)] data-[state=active]:text-black"
            value="gastos"
          >
            Distribuição de Gastos
          </TabsTrigger>
          <TabsTrigger
            className="text-white cursor-pointer data-[state=active]:bg-[hsl(42_86%_55%)] data-[state=active]:text-black"
            value="comparacao"
          >
            Comparação Mensal
          </TabsTrigger>

          <TabsTrigger
            className="text-white cursor-pointer data-[state=active]:bg-[hsl(42_86%_55%)] data-[state=active]:text-black"
            value="gestao"
          >
            Gestão
          </TabsTrigger>
        </TabsList>

        {/* 🍕 Aba de Distribuição */}
        <TabsContent value="gastos">
          <GastosFinancas />
        </TabsContent>

        {/* 📈 Aba de Comparação Mensal */}
        <TabsContent value="comparacao" className="space-y-4">
          <ChartMensalFinanceiro
            title="Comparação Mensal"
            description="Lucro, Despesas e Receita ao longo dos meses"
            data={monthlyData}
            config={chartConfig}
          />
        </TabsContent>
        <TabsContent value="gestao" className="space-y-4">
          <Tabs defaultValue="transacoes" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 bg-zinc-400/20">
              <TabsTrigger
                className="text-white cursor-pointer data-[state=active]:bg-[hsl(42_86%_55%)] data-[state=active]:text-black"
                value="transacoes"
              >
                Transações
              </TabsTrigger>
              <TabsTrigger
                className="text-white cursor-pointer data-[state=active]:bg-[hsl(42_86%_55%)] data-[state=active]:text-black"
                value="categorias"
              >
                Categorias
              </TabsTrigger>
            </TabsList>

            <TabsContent value="transacoes">
              <TransacoesFinanceiro />
            </TabsContent>
            <TabsContent value="categorias">
              <CategoriaFinanceiro />
            </TabsContent>
          </Tabs>
          {/* <GestaoFinanceiro /> */}
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default FinancasHome;
