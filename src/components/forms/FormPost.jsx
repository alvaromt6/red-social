import { BtnClose } from "../sidebar/ui/BtnClose";
import { useUsuariosStore } from "../../store/UsuarioStore";

export const FormPost = () => {
  const { dataUsuario } = useUsuariosStore();
  return (
    <main className="fixed z-50 flex items-center justify-center inset-0">
      {/* Fondo difuminado */}
      <div className="absolute inset-0 backdrop-blur-sm cursor-pointer"></div>
      <section className="bg-white relative w-full max-w-md text-black dark:bg-bg-dark dark:text-white rounded-lg shadow-lg p-6">
        {/* header */}
        <header className="flex items-center justify-between p-4 border-b border-gray-200/40 dark:border-gray-600/40">
          <h2 className="text-xl font-semibold">Crear Nueva Publicación</h2>
          <BtnClose />
        </header>
        <article>
          {/* user info */}
          <img src={dataUsuario?.foto_perfil} alt="User Avatar" className="w-10 h-10 rounded-full mr-3 object-cover" />
        </article>
      </section>
    </main>
  );
};