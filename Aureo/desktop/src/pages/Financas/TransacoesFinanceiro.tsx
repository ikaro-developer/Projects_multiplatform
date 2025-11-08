import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Context } from "@/context/Context";
import { Plus } from "lucide-react";
import { useContext } from "react";

const TransacoesFinanceiro = () => {
  const { transaction } = useContext(Context);
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Minhas Transações</h2>
        <Button className="bg-[hsl(42_86%_55)] cursor-pointer text-black hover:bg-[]">
          <Plus className="w-4 h-4 mr-2" />
          <p> Nova Transação</p>
        </Button>
      </div>

      {transaction.length == 0 ? (
        <Card className="p-8 text-center rounded-md bg-zinc-800/30 my-8 border-zinc-600">
          <p className="text-zinc-400">Nenhuma transação neste mês.</p>
        </Card>
      ) : (
        <></>
      )}
    </>
  );
};

export default TransacoesFinanceiro;
