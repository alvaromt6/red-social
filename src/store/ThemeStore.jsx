import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useThemeStore = create(
    persist(
        (set) => ({
            theme: "light",
            setTheme: () =>
                set((state) => {
                    const newTheme = state.theme === "light" ? "dark" : "light";
                    //Elimina el estado anterior y crea un nuevo estado
                    document.documentElement.classList.remove(state.theme);
                    document.documentElement.classList.add(newTheme);
                    return { theme: newTheme };
                }),
        }),
        {
            name: "theme-storage-redsocial",
        }
    )
);