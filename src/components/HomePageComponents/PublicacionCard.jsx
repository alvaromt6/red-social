import { Icon } from "@iconify/react/dist/iconify.js";
import { PostImageFrame } from "./PostImageFrame";
import { PostVideoFrame } from "./PostVideoFrame";

export const PublicacionCard = ({item}) => {
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
        <p className="mt-2">{item?.descripcion}</p>
        <div>
          {
            item?.url !=="-" && (item?.tipo === "imagen") ? (
              <PostImageFrame src={item?.url} />
            ) : (item?.tipo === "video") ? (
              <PostVideoFrame src={item?.url} />
            ) : null
          }
        </div>
        <div className="flex justify-between mt-4">
          <button className="flex items-center gap-2 cursor-pointer">
            <Icon icon="mdi:thumb-up" className="text-3xl p-1 rounded-full text-gray-400 hover:bg-[rgba(78,184,223,0.2)] cursor-pointer"/>
            {/* <span className="text-xs md:text-sm text-gray-400">Me Gusta</span> */}
          </button>
          <button className="flex items-center gap-2 cursor-pointer ">
            <Icon icon="mdi:comment" className="text-3xl p-1 rounded-full text-gray-400 hover:bg-[rgba(78,184,223,0.2)] cursor-pointer"/>
            {/* <span className="text-xs md:text-sm text-gray-400">Comentar</span> */}
          </button>

        </div>
      </div>

    </div>
  );
};