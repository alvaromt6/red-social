import { create } from "zustand";
import { supabase } from "../supabase/supabase.config.jsx";

export const useAuthStore = create((set) => ({
    credenciales: null,
    setCredenciales: (credenciales) => set({ credenciales }),
    creaUserYLogin: async ({ email, password }) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });
        if (error) throw error;
        return data?.user || null;
    },
}));
