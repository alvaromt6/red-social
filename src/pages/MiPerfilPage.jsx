import { useUsuariosStore } from "../store/UsuarioStore";

export const MiPerfilPage = () => {
  const { dataUsuario } = useUsuariosStore();
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-bg-dark max-w-[1200px] mx-auto p-4 text-black dark:text-white">
      <span>MiPerfilPage</span>
      <span>{dataUsuario?.nombre}</span>
    </div>
  );
};