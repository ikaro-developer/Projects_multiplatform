import { useState } from "react";
import IconsUi from "@/components/ui/IconsUi";
import { KeyRound, DollarSign, BookOpen, LogOut } from "lucide-react";
import { FinancasHome, LivroHome, SenhasHome } from "./pages";

const App = () => {
  const [filtro, setFiltro] = useState("Finanças");
  const [open, setOpen] = useState(true);

  const options = [
    { name: "Finanças", icon: DollarSign },
    { name: "Livros", icon: BookOpen },
    { name: "Senhas", icon: KeyRound },
    { name: "Sair", icon: LogOut },
  ];

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
            <div className="h-10 w-10 rounded-lg flex bg-amber-400 items-center justify-center shadow-lg shrink-0">
              <span className="font-bold text-xl text-[#0F0F0F]">A</span>
            </div>
            {open && (
              <h1 className="text-xl font-bold bg-amber-400 bg-clip-text text-transparent">
                Aureo
              </h1>
            )}
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
                  className={"text-amber-400"}
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

      {/* Conteúdo principal com scroll */}
      <section
        className="
          flex-1 ml-60 p-10
          overflow-y-auto
          h-screen
        "
      >
        <h1 className="text-3xl font-semibold ">{filtro}</h1>

        {filtro === "Finanças" && <FinancasHome />}
        {filtro === "Livros" && <LivroHome />}
        {filtro === "Senhas" && <SenhasHome />}
      </section>
    </main>
  );
};

export default App;

// // import { useNavigate } from "react-router-dom";
// import { Card } from "@/components/ui/card";
// import { Wallet, CheckSquare, Bell, BookOpen, Sparkles } from "lucide-react";

// const Home = () => {
//   // const navigate = useNavigate();

//   const modules = [
//     {
//       title: "Financeiro",
//       icon: Wallet,
//       path: "/financeiro",
//       gradient: "from-primary via-accent to-primary",
//       description: "Gerencie suas finanças com elegância",
//       delay: "0ms",
//     },
//     {
//       title: "Tarefas",
//       icon: CheckSquare,
//       path: "/tarefas",
//       gradient: "from-accent via-primary to-accent",
//       description: "Organize suas atividades diárias",
//       delay: "100ms",
//     },
//     {
//       title: "Alarmes",
//       icon: Bell,
//       path: "/alarmes",
//       gradient: "from-primary via-accent to-primary",
//       description: "Nunca perca um compromisso",
//       delay: "200ms",
//     },
//     {
//       title: "Livros",
//       icon: BookOpen,
//       path: "/livros",
//       gradient: "from-accent via-primary to-accent",
//       description: "Sua biblioteca pessoal digital",
//       delay: "300ms",
//     },
//   ];

//   return (
//     <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
//       {/* Background decorativo */}
//       <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
//       <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[120px]" />
//       <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />

//       {/* Header */}
//       <header className="relative z-10 border-b border-border/50 backdrop-blur-sm">
//         <div className="container mx-auto px-6 py-6">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-glow">
//               <Sparkles className="w-6 h-6 text-background" />
//             </div>
//             <div>
//               <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
//                 Aureo
//               </h1>
//               <p className="text-xs text-muted-foreground">
//                 Sistema de Gestão Pessoal
//               </p>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="relative z-10 flex-1 flex items-center justify-center p-6">
//         <div className="w-full max-w-6xl">
//           {/* Hero Section */}
//           <div className="text-center mb-16 animate-fade-in">
//             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
//               <Sparkles className="w-4 h-4 text-primary" />
//               <span className="text-sm text-primary font-medium">
//                 Sistema Desktop
//               </span>
//             </div>
//             <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-foreground to-accent bg-clip-text text-transparent">
//               Bem-vindo ao Aureo
//             </h2>
//             <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//               Sua plataforma completa de gestão pessoal e produtividade
//             </p>
//           </div>

//           {/* Modules Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {modules.map((module) => {
//               const Icon = module.icon;
//               return (
//                 <Card
//                   key={module.path}
//                   className="group cursor-pointer border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-500 overflow-hidden animate-scale-in"
//                   style={{ animationDelay: module.delay }}
//                   // onClick={() => navigate(module.path)}
//                 >
//                   {/* Borda animada no topo */}
//                   <div
//                     className={`h-1 bg-gradient-to-r ${module.gradient} opacity-60 group-hover:opacity-100 transition-opacity`}
//                   />

//                   <div className="p-8">
//                     <div className="flex items-start gap-6">
//                       {/* Icon Container */}
//                       <div className="relative">
//                         <div
//                           className={`absolute inset-0 bg-gradient-to-br ${module.gradient} opacity-20 rounded-2xl blur-xl group-hover:opacity-40 transition-opacity`}
//                         />
//                         <div
//                           className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${module.gradient} flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
//                         >
//                           <Icon className="w-10 h-10 text-background" />
//                         </div>
//                       </div>

//                       {/* Content */}
//                       <div className="flex-1">
//                         <h3 className="text-2xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
//                           {module.title}
//                         </h3>
//                         <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
//                           {module.description}
//                         </p>
//                       </div>

//                       {/* Arrow indicator */}
//                       <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
//                         <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
//                           <svg
//                             className="w-4 h-4 text-primary"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M9 5l7 7-7 7"
//                             />
//                           </svg>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </Card>
//               );
//             })}
//           </div>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="relative z-10 border-t border-border/50 backdrop-blur-sm">
//         <div className="container mx-auto px-6 py-4">
//           <p className="text-center text-sm text-muted-foreground">
//             Aureo © 2024 - Sistema de Gestão Pessoal
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Home;
