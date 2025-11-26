import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { ContextFinance } from "@/context/FinanceContext";
import { Badge } from "@/components/ui/badge";
import RuleDialog from "@/components/Financas/RuleDialog";

export default function RulesTab() {
  const { rule } = useContext(ContextFinance);

  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center ">
        <h2 className="text-2xl font-bold">Regras de Recorrência</h2>

        <Button
          className="bg-[hsl(42_86%_55%)] text-black hover:bg-[hsl(42_86%_45%)] cursor-pointer"
          onClick={() => setDialogOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Nova Regra
        </Button>
      </div>

      {/* Nenhuma regra */}

      {rule.length === 0 ? (
        <Card className="p-8 text-center rounded-md bg-zinc-800/30 my-8 border-zinc-600">
          <p className="text-zinc-400">
            Você ainda não criou regras. Adicione uma nova!
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {rule.map((r) => {
            return (
              <Card
                key={r.id}
                className="p-4 hover:shadow-md transition-shadow bg-zinc-900 text-white"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-2">
                      Regra #{r.id.slice(0, 6)}
                    </h3>

                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge className="text-xs font-bold text-black bg-amber-500 capitalize">
                        {r.tipo}
                      </Badge>

                      {r.valor_fixo !== null && (
                        <Badge variant="outline" className="text-xs text-white">
                          Valor Fixo: R$ {Number(r.valor_fixo).toFixed(2)}
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-zinc-400">
                      {r.descricao_regra ?? "Sem descrição"}
                    </p>
                  </div>

                  {/* <div className="flex gap-1">
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>

                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div> */}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* DIALOG MODEL */}
      <RuleDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
}
