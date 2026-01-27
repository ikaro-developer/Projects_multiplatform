import { PasswordForm, PasswordList, PasswordDetails } from "./pages";

import { useContext, useEffect } from "react";
import { ContextSenha } from "./context/SenhaContext";
import useSupabasePassword from "./services/SupabasePassword";

export default function SenhasHome() {
  const { viewMode, selectedPassword, setPassword } = useContext(ContextSenha);
  const { getPassword } = useSupabasePassword();

  useEffect(() => {
    async function load() {
      getPassword().then(setPassword);
    }
    load();
  }, []);
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
