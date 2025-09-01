import { useQuery } from "@tanstack/react-query";
import { useSesion } from "../store/AuthStore";
import { useUsuariosStore } from "../store/UsuarioStore"

export const useMostrarUsuariosQuery = () => {
  const { mostrarUsuario } = useUsuariosStore();
  const { user } = useSesion();
  return useQuery({
    queryKey: ["MostrarUsuario"],
    queryFn: () => mostrarUsuario({id_auth: user?.id}),
  })
};