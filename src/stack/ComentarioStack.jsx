import { useMutation } from '@tanstack/react-query';
import { useComentarioStore } from '../store/ComentarioStore';
import { useUsuariosStore } from '../store/usuarioStore';
import { usePostStore } from '../store/PostStore';
import { useFormattedDate } from '../hooks/useFormattedDate';
import { toast } from 'sonner';


export const useInsertarComentarioMutate = (p) => {
    const { insertarComentario } = useComentarioStore();
    const { dataUsuario: dataUsuarioAuth } = useUsuariosStore();
    const { itemSelect } = usePostStore();
    const fechaActual = useFormattedDate(); 

    return useMutation({
        mutationKey: ['insertarComentario'],
        mutationFn: () => insertarComentario({
            comentario: p.comentario,
            id_usuario: dataUsuarioAuth?.id,
            id_publicacion: itemSelect?.id,
            fecha: fechaActual,
        }),
        onError: (error) => {
            toast.error(`Error al insertar comentario: ${error.message}`);
        },
        onSuccess: () => {
            toast.success('Comentario agregado con éxito');
            p.setComentario("");
        }
    });
};