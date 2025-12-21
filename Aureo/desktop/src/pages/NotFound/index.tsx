import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] flex items-center justify-center p-6">
      <div className="max-w-lg w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="text-[150px] font-bold text-[hsl(var(--primary))]/10 leading-none select-none"
            >
              404
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Search className="w-20 h-20 text-[hsl(var(--primary))]/50" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="space-y-4"
        >
          <h1 className="text-3xl font-bold text-[hsl(var(--foreground))]">
            Página não encontrada
          </h1>

          <p className="text-[hsl(var(--muted-foreground))] text-lg">
            A página que você está procurando não existe ou foi movida para
            outro endereço.
          </p>
          <p className="text-[hsl(var(--muted-foreground))] text-lg mb-2">
            A rota{" "}
            <code className="bg-[hsl(var(--muted))] px-2 py-1 rounded-md text-[hsl(var(--primary))] font-mono text-sm border border-[hsl(var(--border))]">
              {location.pathname}
            </code>{" "}
            não existe.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button variant="default" size="lg" asChild className="gap-2">
            <Link to="/home">
              <Home className="w-4 h-4" />
              ir ao Início
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Página Anterior
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-12 pt-8 border-t border-[hsl(var(--border))]"
        >
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Precisa de ajuda? Entre em contato conosco.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
