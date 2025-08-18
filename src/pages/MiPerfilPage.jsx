import { useMostrarUsuariosQuery } from "../stack/UsuariosStack";

export const MiPerfilPage = () => {
    const { data, isLoading, error } = useMostrarUsuariosQuery();
    if (isLoading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data) return <div>No hay datos disponibles</div>;

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-bg-dark max-w-[1200px] mx-auto p-4 text-black dark:text-white">
      <span>MiPerfilPage</span>
      <span>{data?.nombre}</span>
    </div>
  );
};