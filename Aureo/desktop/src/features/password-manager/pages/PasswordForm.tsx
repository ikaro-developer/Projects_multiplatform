//COMPONENTS
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@radix-ui/react-tabs";
import { PasswordAddForm, PasswordGenerator } from "../components";

//ICONS
import { ArrowLeft } from "lucide-react";

//CONTEXT
import { useContext } from "react";
import { ContextSenha } from "../context/SenhaContext";

export default function PasswordForm() {
  const { setViewMode } = useContext(ContextSenha);

  return (
    <div className="flex-1 py-6">
      <Button
        variant="ghost"
        className="gap-2"
        onClick={() => setViewMode("list")}
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </Button>
      <Tabs defaultValue="Nova Senha">
        <TabsList className="grid w-full grid-cols-2 bg-zinc-400/20">
          <TabsTrigger
            className="text-white cursor-pointer data-[state=active]:bg-[hsl(42_86%_55%)] data-[state=active]:text-black"
            value="Nova Senha"
          >
            Nova Senha
          </TabsTrigger>

          <TabsTrigger
            className="text-white cursor-pointer data-[state=active]:bg-[hsl(42_86%_55%)] data-[state=active]:text-black"
            value="Gerador Senha"
          >
            Gerador de Senha
          </TabsTrigger>
        </TabsList>

        <TabsContent value="Nova Senha">
          <PasswordAddForm />
        </TabsContent>

        <TabsContent value="Gerador Senha">
          <PasswordGenerator />
        </TabsContent>
      </Tabs>
    </div>
  );
}
