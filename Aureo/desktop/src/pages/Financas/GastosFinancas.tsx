import ChartFinanceiro from "@/components/Financas/ChartFinanceiro";
import ChartResumoFinanceiro from "@/components/Financas/ChartResumoFinanceiro";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useFinance } from "../../utils/finance/useFinance";

const GastosFinancas = () => {
  const { categoriasArrayDespesas, categoriasArrayReceitas, valoresDoMes } =
    useFinance();

  return (
    <section>
      <TabsContent value="gastos" className="space-y-4 ">
        <Card className="border border-[#33363D] text-white bg-zinc-800/50 backdrop-blur">
          <CardHeader>
            <CardTitle>Distribuição Financeira</CardTitle>
            <CardDescription>
              Visualize a porcentagem de despesas e receitas por categoria
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* TAB PRINCIPAL */}

            <Tabs defaultValue="despesas" className="space-y-4">
              <TabsList className="flex justify-center bg-zinc-400/20 w-full">
                <TabsTrigger
                  value="despesas"
                  className="text-white data-[state=active]:bg-[hsl(42_86%_55%)] data-[state=active]:text-black"
                >
                  Despesas
                </TabsTrigger>
                <TabsTrigger
                  value="receitas"
                  className="text-white data-[state=active]:bg-[hsl(42_86%_55%)] data-[state=active]:text-black"
                >
                  Receitas
                </TabsTrigger>
                <TabsTrigger
                  value="resumo"
                  className="text-white data-[state=active]:bg-[hsl(42_86%_55%)] data-[state=active]:text-black"
                >
                  Resumo
                </TabsTrigger>
              </TabsList>

              {/* 1 Despesa */}

              <TabsContent value="despesas">
                <div className="flex justify-center items-center h-[380px]">
                  <ChartFinanceiro data={categoriasArrayDespesas} />
                </div>
              </TabsContent>
              {/* 2 Receita */}

              <TabsContent value="receitas">
                <div className="flex justify-center items-center h-[380px]">
                  <ChartFinanceiro data={categoriasArrayReceitas} />
                </div>
              </TabsContent>
              {/* 3 Resumo/Lucro */}

              <TabsContent value="resumo">
                <div className="flex flex-col justify-center items-center h-[380px]">
                  <ChartResumoFinanceiro
                    totalIncome={valoresDoMes.totalReceita}
                    totalExpense={valoresDoMes.totalDespesa}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </TabsContent>
    </section>
  );
};

export default GastosFinancas;
