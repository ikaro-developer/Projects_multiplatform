import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit, Plus, Trash2 } from "lucide-react";
import { CategoryDialogFinancas } from "@/components/Financas/CategoryDialogFinancas";
import { ContextFinance } from "@/context/FinanceContext";
import { Badge } from "@/components/ui/badge";
import { Category } from "@/types/FinancasType";
import CategoriaDetail from "./CategoriaDetail";

export default function CategoriesTab() {
  const { category, rule } = useContext(ContextFinance);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);

  const [openDetails, setOpenDetails] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<Category>();
  function openCategoryDetails(categoria: Category) {
    setSelectedCategory(categoria);
    setOpenDetails(true);
  }
  if (openDetails && selectedCategory) {
    return (
      <CategoriaDetail
        selectedCategorie={selectedCategory}
        onBack={() => setOpenDetails(false)}
      />
    );
  }
  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center ">
        <h2 className="text-2xl font-bold">Minhas Categorias</h2>

        <Button
          className="bg-[hsl(42_86%_55%)] text-black hover:bg-[hsl(42_86%_45%)] cursor-pointer"
          onClick={() => {
            setCategoryDialogOpen(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Nova Categoria
        </Button>
      </div>

      {/* Lista ou vazio */}
      {category.length === 0 ? (
        <Card className="p-8 text-center rounded-md bg-zinc-800/30 my-8 border-zinc-600">
          <p className="text-zinc-400">
            Você ainda não tem categorias. Crie sua primeira categoria!
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {category.map((categoria) => {
            // Busca a regra da recorrência correta
            const recurrenceRule = rule.find(
              (r) => r.id === categoria.recorrencia_id
            );

            const isIncome = categoria.type === "Receita";

            return (
              <div
                key={categoria.id}
                onClick={() => openCategoryDetails(categoria)}
                className="cursor-pointer"
              >
                <Card className="p-4 hover:shadow-md transition-shadow bg-zinc-900 text-white">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: categoria.color }}
                        />
                        <h3 className="font-semibold text-white">
                          {categoria.name}
                        </h3>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Badge className="text-xs font-bold text-black bg-amber-500">
                          {isIncome ? "Receita" : "Despesa"}
                        </Badge>

                        <Badge variant="outline" className="text-xs text-white">
                          {recurrenceRule?.tipo ?? "Sem regra"}
                        </Badge>
                      </div>
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
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL DE UMA NOVA CATEGORIA */}
      <CategoryDialogFinancas
        open={categoryDialogOpen}
        onOpenChange={setCategoryDialogOpen}
      />
    </div>
  );
}
