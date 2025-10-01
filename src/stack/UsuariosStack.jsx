import { useQuery } from "@tanstack/react-query";
import { useSesion } from "../store/AuthStore";
import { useUsuariosStore } from "../store/UsuarioStore"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useGlobalStore } from "../store/GlobalStore";

export const useMostrarUsuariosQuery = () => {
  const { mostrarUsuario } = useUsuariosStore();
  const { user } = useSesion();
  return useQuery({
    queryKey: ["MostrarUsuario"],
    queryFn: () => mostrarUsuario({id_auth: user?.id}),
  })
};
export const useEditarFotoUserMutate = () => {
  const { file } = useGlobalStore();
  const { editarUsuarios, dataUsuario } = useUsuariosStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["editar foto user"],
    mutationFn: async (data) => {
      if (file.size === undefined) {
        return;
      }
      const p = {
        nombre: data.nombre,
        id: dataUsuario?.id,
      };
      await editarUsuarios(p, dataUsuario?.foto_perfil, file);
    },
    onError: (error) => {
      toast.error("Error al editar usuario: " + error.message);
    },
    onSuccess: () => {
      if (file.size === undefined) {
        return toast.info("Seleccione una imagen");
      }
      toast.success("Datos guardados");
      queryClient.invalidateQueries(["mostrar user auth"]);
    },
  });
};
export const useContarUsuariosTodosQuery = () => {
  const { contarUsuariosTodos } = useUsuariosStore();
  return useQuery({
    queryKey: ["contar usuarios todos"],
    queryFn: contarUsuariosTodos,
  });
};