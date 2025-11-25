import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

//COMPONENTS
import { MonthSelector } from "@/components/Financas/MonthSelector";
import CardFinancas from "@/components/Financas/CardFinancas";
import ChartMensalFinanceiro from "@/components/Financas/ChartMensalfinanceiro";
import { Toaster } from "@/components/ui/sonner";

//UTILS
import { useFinance } from "../../utils/finance/useFinance";
import GastosFinancas from "./GastosFinancas";
import CategoriaFinanceiro from "./CategoriaFinanceiro";
import TransacoesFinanceiro from "./TransacoesFinanceiro";
import RuleFinanceiro from "./RuleFinanceiro";

const FinancasHome = () => {
  const { valoresDoMes } = useFinance();

  return (
    <section className="mt-6">
      <Toaster position="bottom-right" />
      <MonthSelector />

      {/* Cards de Resumo */}
      <div className="grid gap-4 md:grid-cols-3">
        <CardFinancas
          value={valoresDoMes.totalDespesa}
          text="Despesas do Mês"
          color="red"
          icon={TrendingDown}
        />
        <CardFinancas
          value={valoresDoMes.totalReceita}
          text="Receitas do Mês"
          color="amber"
          icon={TrendingUp}
        />
        <CardFinancas
          value={valoresDoMes.totalLucro}
          text="Lucro do Mês"
          color="green"
          icon={Wallet}
        />
      </div>

      {/* Tabs principais */}
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

        {/* 1  Aba de Distribuição */}
        <TabsContent value="gastos">
          <GastosFinancas />
        </TabsContent>

        {/* 2  Aba de Comparação Mensal */}
        <TabsContent value="comparacao" className="space-y-4">
          <ChartMensalFinanceiro
            title="Comparação Mensal"
            description="Lucro, Despesas e Receita ao longo dos meses"
          />
        </TabsContent>

        {/* 3  Aba de Gestão */}
        <TabsContent value="gestao" className="space-y-4">
          <Tabs defaultValue="transacoes" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3 bg-zinc-400/20">
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
              <TabsTrigger
                className="text-white cursor-pointer data-[state=active]:bg-[hsl(42_86%_55%)] data-[state=active]:text-black"
                value="regras"
              >
                Regras
              </TabsTrigger>
            </TabsList>

            <TabsContent value="transacoes">
              <TransacoesFinanceiro />
            </TabsContent>
            <TabsContent value="categorias">
              <CategoriaFinanceiro />
            </TabsContent>
            <TabsContent value="regras">
              <RuleFinanceiro />
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default FinancasHome;
