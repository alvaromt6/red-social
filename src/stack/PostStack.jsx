import { useMutation } from "@tanstack/react-query";
import { usePostStore } from "../store/PostStore";
import { useFormattedDate } from "../hooks/useFormattedDate";
import { useUsuariosStore } from "../store/UsuarioStore";
import { toast } from "sonner";

/**
 * Hook personalizado para manejar la mutación de insertar posts
 * Determina automáticamente el tipo de contenido (imagen/video)
 * y prepara los datos para la inserción
 */
export const useInsertarPostMutate = () => {
    const { insertarPost, file, setStateForm, setFile } = usePostStore();
    const fechaActual = useFormattedDate();
    const { dataUsuario: dataUsuarioAuth } = useUsuariosStore();

    return useMutation({
        mutationKey: ["insertar-post"],
        mutationFn: async (data) => {
            // Determinar el tipo de archivo basado en la extensión
            let type = "imagen";
            
            if (file && file.name) {
                const extension = file.name.split('.').pop()?.toLowerCase();
                if (extension === "mp4") {
                    type = "video";
                }
            }

            // Preparar objeto de datos para la inserción
            const p = {
                descripcion: data.descripcion,
                url: "-", // Se actualizará después de subir el archivo
                fecha: fechaActual,
                id_usuario: dataUsuarioAuth.id,
                tipo: type
            };

            // Ejecutar la inserción del post
            await insertarPost(p, file);
        },
        onError: (error) => {
            toast.error("Error al insertar el post : " + error.message);
        },
        onSuccess: () => {
            toast.success("Publicado");
            setStateForm(false);
            setFile(null);
        }
    });
};