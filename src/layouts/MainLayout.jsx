import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/sidebar/Sidebar";
import { useMostrarUsuariosQuery } from "../stack/UsuariosStack";

export const MainLayout = () => {
  const { data, isLoading, error } = useMostrarUsuariosQuery();
    if (isLoading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data) return <div>No hay datos disponibles</div>;

  return (
    <main className="flex justify-center h-screen overflow-hidden bg-white dark:bg-bg-dark text-black dark:text-white transition-colors duration-300">
      <section className="flex w-full max-w-[1300px]">
        <Sidebar />
        <section className="flex-1 px-4 overflow-y-auto h-full">
          <Outlet />
        </section>
      </section>
    </main>
  );
};