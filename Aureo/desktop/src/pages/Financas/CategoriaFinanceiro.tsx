import { CategoryCard } from "@/components/Financas/CategoryCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Context } from "@/context/Context";
import { Plus } from "lucide-react";
import { useContext } from "react";

const CategoriaFinanceiro = () => {
  const { category } = useContext(Context);
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Minhas Categorias</h2>
        <Button className="bg-[hsl(42_86%_55)] cursor-pointer text-black hover:bg-[]">
          <Plus className="w-4 h-4 mr-2" />
          <p> Nova Categoria</p>
        </Button>
      </div>

      {category.length == 0 ? (
        <Card className="p-8 text-center rounded-md bg-zinc-800/30 my-8 border-zinc-600 ">
          <p className="text-zinc-400">
            Você ainda não tem categorias. Crie sua primeira categoria para
            começar!
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4 ">
          {category.map((category) => (
            <div
              key={category.id}
              // onClick={() => handleCategoryClick(category)}
              className="cursor-pointer"
            >
              <CategoryCard
                category={category}
                // onEdit={(cat) => {
                //   // setEditingCategory(cat);
                //   // setCategoryDialogOpen(true);
                // }}
                // onDelete={handleDeleteCategory}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CategoriaFinanceiro;
