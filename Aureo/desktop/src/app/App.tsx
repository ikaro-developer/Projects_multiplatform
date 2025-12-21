import { useContext } from "react";
import IconsUi from "@/components/ui/IconsUi";
import { Sparkles } from "lucide-react";
import { FinancasHome, LivroHome, SenhasHome } from "@/features";
import { ContextFinanceProvider } from "../features/finance-manager/context/FinanceContext";
import { AppContext } from "../context/Context";
import { ContextSenhaProvider } from "../features/password-manager/context/SenhaContext";

const App = () => {
  const { filtro, setFiltro, options } = useContext(AppContext);

  return (
    <main className="flex h-screen  text-white overflow-hidden">
      {/* Sidebar fixa */}
      <section
        className="
          fixed top-0 left-0 h-full
          flex flex-col items-center gap-4
          w-60 bg-[#1E1E1E]
          p-4 rounded-r-xl
          transition-all duration-300 shadow-md

        "
      >
        {/* Logo */}
        <div className="px-4 py-6 border-b border-[#2A2A2A] w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[hsl(42_86%_55%)] to-[hsl(38_92%_50%)] flex items-center justify-center animate-glow">
              <Sparkles className="w-6 h-6 text-[hsl(240_10%_3.9%)]" />
            </div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-[hsl(42_86%_55%)] via-[hsl(38_92%_50%)] to-[hsl(42_86%_55%)] bg-clip-text text-transparent">
              Aureo
            </h1>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-2 w-full mt-4">
          {options.map((item, index) => {
            const isActive = filtro === item.name;
            return (
              <button
                key={index}
                onClick={() => setFiltro(item.name)}
                className={`flex gap-2 w-full items-center justify-start cursor-pointer rounded-md px-6 py-2 transition-all duration-300
                  ${
                    isActive
                      ? "bg-[#2A2A2A] text-amber-400"
                      : "hover:bg-[#2A2A2A] text-gray-300"
                  }`}
              >
                <IconsUi
                  size={20}
                  active={isActive}
                  icon={item.icon}
                  className={"text-[hsl(var(--primary))]"}
                />
                <p>{item.name}</p>
              </button>
            );
          })}
        </nav>

        {/* Rodapé */}
        <div className="mt-auto text-xs text-[#777] text-center w-full border-t border-[#2A2A2A] pt-4">
          v1.0.0 <br /> @ikaro-developer
        </div>
      </section>
      {/* Sidebar fixa */}

      {/* Conteúdo principal com scroll */}
      <section
        className="
          flex-1 ml-60 p-6
          overflow-y-auto
          h-screen
        "
      >
        {filtro === "Finanças" && (
          <ContextFinanceProvider>
            <FinancasHome />
          </ContextFinanceProvider>
        )}
        {filtro === "Livros" && <LivroHome />}
        {filtro === "Senhas" && (
          <ContextSenhaProvider>
            <SenhasHome />
          </ContextSenhaProvider>
        )}
      </section>
    </main>
  );
};

export default App;
