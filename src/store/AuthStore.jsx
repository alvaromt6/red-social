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

export const useSesion = create((set) => {
    const store = {
        user: null,
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
            set({ user: session.user });
        }
    });
    supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
            set({ user: session.user });
        } else {
            set({ user: null });
        }
    });
    return store;
});