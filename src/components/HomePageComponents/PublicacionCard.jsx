import { Icon } from "@iconify/react/dist/iconify.js";
import { PostImageFrame } from "./PostImageFrame";

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
      <div  className="mt-3">
        <p className="mt-2">Titulo</p>
        <div>
          <PostImageFrame src={"https://imgs.search.brave.com/TqdXmekdSaBRSSavrOLF3m8m7reFObU-iD2aEPxtq6Y/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJhY2Nlc3Mu/Y29tL2Z1bGwvMjcx/MzIxNy5qcGc"} />
        </div>
      </div>

    </div>
  );
};