import PasswordForm from "./pages/PasswordForm";
import PasswordList from "./pages/PasswordList";
import PasswordDetails from "./pages/PasswordDetails";

import { useContext } from "react";
import { ContextSenha } from "@/features/password-manager/context/SenhaContext";

export default function SenhasHome() {
  const { viewMode, selectedPassword } = useContext(ContextSenha);

  return (
    <div className="flex-1 p-6 space-y-6">
      {viewMode === "list" && <PasswordList />}

      {viewMode === "details" && selectedPassword && (
        <PasswordDetails password={selectedPassword} />
      )}

      {viewMode === "form" && <PasswordForm />}
    </div>
  );
}
