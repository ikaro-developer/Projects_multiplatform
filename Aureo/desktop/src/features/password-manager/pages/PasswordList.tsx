//CONTEXT
import { useContext, useState } from "react";
import { ContextSenha } from "../context/SenhaContext";

//COMPONENTS
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordServiceGroup } from "../components";

//ICONS
import { AlertTriangle, Key, Lock, Plus, Search, Shield } from "lucide-react";

//UTILS

const PasswordList = () => {
  const { setViewMode, Password } = useContext(ContextSenha);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredPasswords = Password.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.url?.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "compromised")
      return (
        (matchesSearch && p.strength === "weak") || p.strength === "medium"
      );
    return matchesSearch;
  });

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Shield className="h-8 w-8 text-[hsl(var(--primary))]" />
            Cofre de Senhas
          </h1>
          <p className="text-muted-foreground mt-1">
            Gerencie suas senhas com segurança
          </p>
        </div>
        <div className="flex gap-2">
          {/* <Button variant="outline" onClick={() => setViewMode("security")}>
            <Shield className="h-4 w-4 mr-2" />
            Segurança
          </Button> */}
          <Button
            className=" cursor-pointer"
            onClick={() => setViewMode("form")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Nova Senha
          </Button>
        </div>
      </div>
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar senhas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all" className="gap-2">
            <Key className="h-4 w-4" />
            Todas ({Password.length})
          </TabsTrigger>

          <TabsTrigger value="compromised" className="gap-2">
            <AlertTriangle className="h-4 w-4" />
            Atenção (
            {
              Password.filter(
                (p) => p.strength === "weak" || p.strength === "medium"
              ).length
            }
            )
          </TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab} className="mt-6">
          {filteredPasswords.length === 0 && (
            <div className="text-center py-12">
              <Lock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Nenhuma senha encontrada</h3>
              <p className="text-muted-foreground">
                {searchQuery
                  ? "Tente uma busca diferente"
                  : "Adicione sua primeira senha"}
              </p>
            </div>
          )}
          <PasswordServiceGroup passwords={filteredPasswords} />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default PasswordList;
