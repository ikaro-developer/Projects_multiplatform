//COMPONENTS
import { Card } from "@/components/ui/card";

//ICONS

import { Wallet, BookOpen, Sparkles, LockKeyhole } from "lucide-react";

//CONTEXT
import { AppContext } from "@/context/Context";
import { useContext } from "react";

//NAVIGATION
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { setFiltro } = useContext(AppContext);
  const navigate = useNavigate();
  const modules = [
    {
      title: "Financeiro",
      icon: Wallet,
      path: "Finanças",
      gradient:
        "from-[hsl(42_86%_55%)] via-[hsl(38_92%_50%)] to-[hsl(42_86%_55%)]",
      description: "Gerencie suas finanças com elegância",
      delay: "0ms",
    },
    {
      title: "Senhas",
      icon: LockKeyhole,
      path: "Senhas",
      gradient:
        "from-[hsl(42_86%_55%)] via-[hsl(38_92%_50%)] to-[hsl(42_86%_55%)]",
      description: "Nunca perca suas senhas",
      delay: "200ms",
    },
    {
      title: "Livros",
      icon: BookOpen,
      path: "Livros",
      gradient:
        "from-[hsl(38_92%_50%)] via-[hsl(42_86%_55%)] to-[hsl(38_92%_50%)]",
      description: "Sua biblioteca pessoal digital",
      delay: "300ms",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[hsl(240_10%_3.9%)] text-[hsl(42_100%_95%)]">
      {/* Background decorativo */}
      <div className="absolute inset-0 bg-linear-to-br from-[hsl(42_86%_55%/5%)] via-[hsl(240_10%_3.9%/5%)] to-[hsl(38_92%_50%/5%)]" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-[hsl(42_86%_55%/10%)] rounded-full blur-[120px] animate-pulse" />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-[hsl(38_92%_50%/10%)] rounded-full blur-[120px] animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      {/* Header */}
      <header className="relative z-10 border-b border-[hsl(240_6%_20%)/50] backdrop-blur-sm bg-[hsl(240_10%_3.9%)/50]">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[hsl(42_86%_55%)] to-[hsl(38_92%_50%)] flex items-center justify-center animate-glow">
              <Sparkles className="w-6 h-6 text-[hsl(240_10%_3.9%)]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-linear-to-r from-[hsl(42_86%_55%)] via-[hsl(38_92%_50%)] to-[hsl(42_86%_55%)] bg-clip-text text-transparent">
                Aureo
              </h1>
              <p className="text-xs text-[hsl(240_5%_65%)]">
                Sistema de Gestão Pessoal
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(42_86%_55%/10%)] border border-[hsl(42_86%_55%/20%)] mb-6">
              <Sparkles className="w-4 h-4 text-[hsl(42_86%_55%)]" />
              <span className="text-sm text-[hsl(42_86%_55%)] font-medium">
                Sistema Desktop
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-linear-to-r from-[hsl(42_86%_55%)] via-[hsl(42_100%_95%)] to-[hsl(38_92%_50%)] bg-clip-text text-transparent">
              Bem-vindo ao Aureo
            </h2>
            <p className="text-xl text-[hsl(240_5%_65%)] max-w-2xl mx-auto">
              Sua plataforma completa de gestão pessoal e produtividade
            </p>
          </div>

          {/* Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <Card
                  onClick={async () => {
                    await setFiltro(module.path);
                    navigate("/");
                  }}
                  key={module.title}
                  className="group cursor-pointer relative border-[hsl(240_6%_20%)/50] bg-[hsl(240_8%_8%)/50] backdrop-blur-sm hover:bg-[hsl(240_8%_8%)/80] hover:border-[hsl(42_86%_55%)/50] transition-all duration-500 overflow-hidden animate-scale-in hover:shadow-[0_0_30px_rgba(234,179,8,0.15)]"
                  style={{ animationDelay: module.delay }}
                >
                  <div
                    className={`h-1 bg-linear-to-r  mt-[-22px]  ${module.gradient} opacity-60 group-hover:opacity-100 transition-opacity`}
                  />

                  <div className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="relative shrink-0">
                        <div
                          className={`absolute inset-0 bg-linear-to-br ${module.gradient} opacity-20 rounded-2xl blur-xl group-hover:opacity-40 transition-opacity duration-500`}
                        />
                        <div
                          className={`relative w-20 h-20 rounded-2xl bg-linear-to-br ${module.gradient} flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                        >
                          <Icon className="w-10 h-10 text-[hsl(240_10%_3.9%)]" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-2xl font-bold mb-2 text-[hsl(42_100%_95%)] group-hover:text-[hsl(42_86%_55%)] transition-colors duration-300">
                          {module.title}
                        </h3>
                        <p className="text-[hsl(240_5%_65%)] group-hover:text-[hsl(42_100%_95%)] transition-colors duration-300">
                          {module.description}
                        </p>
                      </div>

                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2.5 group-hover:translate-x-0 shrink-0">
                        <div className="w-8 h-8 rounded-full bg-[hsl(42_86%_55%/10%)] flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-[hsl(42_86%_55%)]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </main>

      <footer className="relative z-10 border-t border-[hsl(240_6%_20%)/50] backdrop-blur-sm bg-[hsl(240_10%_3.9%)/50]">
        <div className="container mx-auto px-6 py-4">
          <p className="text-center text-sm text-[hsl(240_5%_65%)]">
            icaro_developer © 2024 - Sistema de Gestão Pessoal
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
