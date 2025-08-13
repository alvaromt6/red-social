import { Icon } from "@iconify/react/dist/iconify.js";

export const PublicacionCard = () => {
  return (
    <div className="border-b border-gray-500/50 p-4 ">
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
            <img src="https://www.hazunaweb.com/imagenes/prueba.jpg" alt="imagen de perfil" className="w-12 h-12 rounded-full object-cover" />
            <span className="font-bold">
                Nombre de usuario
            </span>

        </div>
        <div className="flex items-center gap-2 ">
            <span className="text-gray-500 text-sm whitespace-nowrap">Hace 8 horas</span>
            <button>
                <Icon icon="mdi:dots-horizontal" className="text-gray-500"/>
            </button>
        </div>

      </div>
    </div>
  );
};