import { create } from "zustand";
import { supabase } from "../supabase/supabase.config.jsx";

const TABLA = "comentarios";

export const useComentarioStore = create((set) => ({
    showModal: false,
    setShowModal: () => set((state) => ({ showModal: !state.showModal})),

    itemSelect: null,
    setItemSelect: (item) => set(() => ({ itemSelect: item })),

    insertarComentario: async (comentarioData) => {
        const {error} = await supabase.from(TABLA).insert(comentarioData);
        if(error) {
            throw new Error(error.message);
        }
    },
}));