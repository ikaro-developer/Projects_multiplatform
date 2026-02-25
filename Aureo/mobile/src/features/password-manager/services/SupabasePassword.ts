import { ContextPassword } from "../context/PasswordContext";
import supabase from "@/services/supabase";
import { Password, PasswordFormData } from "../types/passwordTypes";
import { useContext } from "react";
// import { toast } from "sonner";

const useSupabasePassword = () => {
  const { setPassword } = useContext(ContextPassword);

  async function getPassword(): Promise<Password[]> {
    try {
      const { data, error } = await supabase.from("passwords").select("*");

      if (error) throw error;
      return data ?? [];
    } catch (err) {
      //   toast.error("Erro ao buscar senhas");
      console.error("Erro ao buscar senha:", err);
      return [];
    }
  }

  async function addPassword(form: PasswordFormData): Promise<Password> {
    try {
      const { data, error } = await supabase
        .from("passwords")
        .insert({
          name: form.name,
          username: form.username,
          password: form.password,
          url: form.url,
          strength: form.strength,
        })
        .select()
        .single();

      if (error) throw error;

      setPassword((prev) => [data, ...prev]);
      return data;
    } catch (err) {
      //   toast.error("Erro ao adicionar senha");
      console.error("Erro ao adicionar senha:", err);
      throw err;
    }
  }

  return {
    getPassword,
    addPassword,
  };
};

export default useSupabasePassword;
