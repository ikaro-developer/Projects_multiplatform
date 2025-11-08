import ChartFinanceiro, {
  PieDataItem,
} from "@/components/Financas/ChartFinanceiro";
import ChartResumoFinanceiro from "@/components/Financas/ChartResumoFinanceiro";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const GastosFinancas = () => {
  const despesas: PieDataItem[] = [
    { name: "Alimentação", value: 70 },
    { name: "Transporte", value: 20 },
    { name: "Lazer", value: 15 },
    { name: "Educação", value: 10 },
    { name: "Outros", value: 20 },
  ];

  const receitas: PieDataItem[] = [
    { name: "Salário", value: 70 },
    { name: "Freelance", value: 20 },
    { name: "Investimentos", value: 10 },
  ];

  const coresDespesas = [
    "hsl(0 75% 60%)",
    "hsl(210 90% 55%)",
    "hsl(280 80% 60%)",
    "hsl(35 90% 55%)",
    "hsl(0 70% 60%)",
  ];
  const coresReceitas = [
    "hsl(160 80% 45%)",
    "hsl(200 85% 55%)",
    "hsl(100 75% 50%)",
  ];

  //   // 💰 Totais de exemplo (simulação de cálculo)
  const totalReceitas = receitas.reduce((sum, r) => sum + r.value, 0);
  const totalDespesas = despesas.reduce((sum, d) => sum + d.value, 0);

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

              <TabsContent value="despesas">
                <div className="flex justify-center items-center h-[380px]">
                  <ChartFinanceiro
                    data={despesas}
                    colors={coresDespesas}
                    height={320}
                  />
                </div>
              </TabsContent>

              <TabsContent value="receitas">
                <div className="flex justify-center items-center h-[380px]">
                  <ChartFinanceiro
                    data={receitas}
                    colors={coresReceitas}
                    height={320}
                  />
                </div>
              </TabsContent>

              <TabsContent value="resumo">
                <div className="flex flex-col justify-center items-center h-[380px]">
                  <ChartResumoFinanceiro
                    totalIncome={totalReceitas}
                    totalExpense={totalDespesas}
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
