import { Category } from "@/types/FinancasType";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CategoryCardProps {
  category: Category;
  //   onEdit: (category: Category) => void;
  //   onDelete: (id: string) => void;
}

const recurrenceLabels = {
  fixed: "Fixo - Valor Fixo",
  variable: "Variável",
  "fixed-variable": "Fixo - Valor Varia",
};

export function CategoryCard({
  category,
}: //   onEdit,
//   onDelete,
CategoryCardProps) {
  const isIncome = category.type === "Despesa";

  return (
    <Card className="p-4 hover:shadow-md transition-shadow rounded-md border-zinc-600 bg-zinc-800/20">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: category.color }}
            />
            <h3 className="font-semibold  text-white">{category.title}</h3>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge
              variant={isIncome ? "default" : "destructive"}
              className={`text-xs ${
                isIncome &&
                "bg-[hsl(42_86%_55%)] text-black hover:bg-[hsl(42_86%_45%)]"
              }`}
            >
              {isIncome ? "Receita" : "Despesa"}
            </Badge>
            <Badge variant="outline" className="text-xs text-white">
              {recurrenceLabels[category.recorrencia]}
            </Badge>
          </div>
        </div>

        <div className="flex gap-1">
          <Button
            size="icon"
            variant="ghost"
            // onClick={() => onEdit(category)}
            className="h-8 w-8 text-white"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            // onClick={() => onDelete(category.id)}
            className="h-8 w-8 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
