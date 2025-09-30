import { useMutation, useQuery } from "@tanstack/react-query";
import { useRespuestasComentariosStore } from "../store/RespuestasComentariosStore";
import { useFormattedDate } from "../hooks/useFormattedDate";
import { useUsuariosStore } from "../store/UsuarioStore";
import { toast } from "sonner";
import { useComentarioStore } from "../store/ComentarioStore";

export const useInsertarRespuestaComentarioMutate = () => {
  const {
    insertarRespuestaComentarios,
    respuestaActivaParaComentarioId,
    respuesta,
    setRespuesta, 
    limpiarRespuestaActiva
  } = useRespuestasComentariosStore();
  const { dataUsuario } = useUsuariosStore();
  const fechaAtual = useFormattedDate();
  return useMutation({
    mutationKey: ["insertar respuesta a comentario"],
    mutationFn: () =>
      insertarRespuestaComentarios({
        id_comentario: respuestaActivaParaComentarioId,
        comentario: respuesta,
        fecha: fechaAtual,
        id_usuario: dataUsuario?.id,
      }),
    onError: (error) => {
      toast.error("Error al insertar respuesta: " + error.message);
    },
    onSuccess: () => {
      toast.success("Respuesta enviada");
      setRespuesta("");
      limpiarRespuestaActiva()
    },
  });
};
export const useMostrarRespuestaComentariosQuery = () => {
  const { mostrarRespuestaAComentario } = useRespuestasComentariosStore();
  const { itemSelect } = useComentarioStore();
  return useQuery({
    queryKey: [
      "mostrar respuesta comentario",
      { id_comentario: itemSelect?.id },
    ],
    queryFn: () =>
      mostrarRespuestaAComentario({ id_comentario: itemSelect?.id }),
    enabled: !!itemSelect,
  });
};