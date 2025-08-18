import { create } from "zustand";
import { supabase } from "../supabase/supabase.config.jsx";

const tabla = "usuarios";

export const useUsuariosStore = create((set) => ({
  dataUsuario: null,
  mostrarUsuario: async (p) => {
    try {
      const { data, error } = await supabase
        .from(tabla)
        .select()
        .eq("id_auth", p.id_auth)
        .maybeSingle();

      if (error) {
        console.error("Supabase error:", error.message);
        throw new Error(error.message);
      }

      set({ dataUsuario: data });
      return data;

    } catch (error) {
      console.error("Error inesperado:", error);

      throw error;
    }
  },
}));
