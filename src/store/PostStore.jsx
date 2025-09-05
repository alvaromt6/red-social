import { create } from "zustand";
import { supabase } from "../supabase/supabase.config.jsx";
import { data } from "react-router-dom";

// Nombre de la tabla en la base de datos
const tabla = "publicaciones";

/**
 * Función para insertar una nueva publicación
 * @param {Object} p - Datos de la publicación
 * @param {File} file - Archivo de imagen (opcional)
 * @returns {Object} Datos de la publicación insertada
 */

const InsertarPost = async (p, file) => {
    // Insertar la publicación en la base de datos
    const { data, error } = await supabase
        .from(tabla)
        .insert(p)
        .select()
        .maybeSingle();
    
    if (error) {
        throw new Error(error.message);
    }
    
    // Si hay un archivo, subirlo y actualizar la publicación con la URL
    if (file) {
        const nuevo_id = data?.id;
        const urlImagen = await SubirArchivo(file, nuevo_id);
        const pUrl = {
            url: urlImagen,
            id: nuevo_id,
        };
        
        await EditarPublicacion(pUrl);
    }
    
    return data;
};

/**
 * Función para subir un archivo al storage de Supabase
 * @param {File} file - Archivo a subir
 * @param {number} id - ID de la publicación
 * @returns {string} URL pública del archivo
 */

const SubirArchivo = async (file, id) => {
    const ruta = `publicaciones/${id}`;
    
    // Subir el archivo al storage
    const { data, error } = await supabase.storage
        .from("Archivos")
        .upload(ruta, file, {
            cacheControl: "0",
            upsert: true, // Sobrescribe si ya existe
        });
    
    if (error) {
        throw new Error(error.message);
    }
    
    // Obtener la URL pública del archivo
    if (data) {
        const { data: urlImagen } = await supabase.storage
            .from("Archivos")
            .getPublicUrl(ruta);
        
        return urlImagen.publicUrl;
    }
};

/**
 * Función para editar/actualizar una publicación existente
 * @param {Object} p - Datos a actualizar (debe incluir id)
 * @returns {Object} Datos actualizados
 */
const EditarPublicacion = async (p) => {
    const { data, error } = await supabase
        .from(tabla)
        .update(p)
        .eq("id", p.id)
        .select()
        .maybeSingle();
    
    if (error) {
        throw new Error(error.message);
    }
    
    return data;
};

// Store de Zustand para el manejo del estado global
export const usePostStore = create((set, get) => ({
    // Estado para el archivo seleccionado
    file: null,
    setFile: (file) => set({ file }),
    
    // Estado para mostrar/ocultar selector de imagen
    stateImage: false,
    setStateImage: () => set((state) => ({ 
        stateImage: !state.stateImage 
    })),

    // Estado para mostrar/ocultar formulario
    stateForm: false,
    setStateForm: () => set((state) => ({ 
        stateForm: !state.stateForm 
    })),

    // Método para insertar post desde el store
    insertarPost: async (p, file) => {
        await InsertarPost(p, file);
    },
    // Estado para almacenar los posts obtenidos de la base de datos
    dataPost: null,          

    // Función asíncrona para obtener posts de un usuario específico
    mostrarPost: async (p) => {
    // Llama a la función RPC 'publicaciones_con_detalles' en Supabase
    // Pasa el ID del usuario como parámetro
    const { data, error } = await supabase.rpc("publicaciones_con_detalles",{
        _id_usuario: p._id_usuario,
    }).range(p.desde, p.desde + p.hasta -1 ); // Implementa paginación: desde índice 'desde' hasta 'desde + hasta - 1'
    
    // Si hay error en la consulta, lanza una excepción
    if (error) {
        throw new Error(error.message);
    }
    
    // Actualiza el estado local con los datos obtenidos
    set({ dataPost: data });
    
    // Retorna los datos para uso externo (útil para React Query)
    return data;
    },
}));