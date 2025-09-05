import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
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
                if (extension === "mp4" || extension === "mov" || extension === "avi" || extension === "wmv" || extension === "flv" || extension === "mkv") {
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


// Hook personalizado para manejar la consulta infinita de posts
export const useMostrarPostQuery = () => {
   // Obtiene los datos del usuario logueado desde el store
   const {dataUsuario} = useUsuariosStore();
   
   // Obtiene la función para mostrar posts desde el store
   const {mostrarPost} = usePostStore();
   
   // Define cuántos posts cargar por página
   const cantidad_items = 10;
   
   // Retorna una consulta infinita usando React Query
   return useInfiniteQuery({
       // Clave única para el cache, incluye el ID del usuario para invalidación específica
       queryKey: ["mostrar-post", {id_usuario: dataUsuario?.id}],
       
       // Función que ejecuta la consulta en cada página
       queryFn: async ({pageParam = 0}) => {
           const data = await mostrarPost({
                _id_usuario: dataUsuario?.id,        // ID del usuario actual
                desde: pageParam,                    // Índice de inicio (0, 10, 20, etc.)
                hasta: cantidad_items,               // Cantidad de items a traer
           });
           return data;
       },
       
       // Determina el parámetro para la siguiente página
       getNextPageParam: (lastPage, allPages) => {
           // Si no hay datos o la página tiene menos items que el máximo, no hay más páginas
           if (!lastPage || lastPage.length < cantidad_items) return undefined;
           
           // Calcula el siguiente índice: páginas cargadas * items por página
           return allPages.length * cantidad_items;
       },
       
       // Parámetro inicial para la primera página
       initialPageParam: 0,
   });
};