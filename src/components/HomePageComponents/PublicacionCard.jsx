import { Icon } from "@iconify/react/dist/iconify.js";
import { PostImageFrame } from "./PostImageFrame";
import { PostVideoFrame } from "./PostVideoFrame";
import { usePostStore } from "../../store/PostStore";
import { useLikePostMutate } from "../../stack/PostStack";

export const PublicacionCard = ({item}) => {
  const { setItemSelect } = usePostStore();
  const { mutate: likePost } = useLikePostMutate();
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
          <button 
            onClick={() => {
              setItemSelect(item);
              likePost();
            }} 
            className="flex items-center gap-2 cursor-pointer">

            <Icon
              icon={item?.like_usuario_actual?"mdi:heart":"mdi:heart-outline"}
              className={`text-3xl p-1 rounded-full ${item?.like_usuario_actual ? "text-red-500" : "text-gray-400 "}  hover:bg-[rgba(78,184,223,0.2)] cursor-pointer`}
            />
            
          </button>
          <button className="flex items-center gap-2 cursor-pointer ">
            <Icon 
              icon="mdi:comment-outline" 
              className="text-3xl p-1 rounded-full text-gray-400 hover:bg-[rgba(78,184,223,0.2)] cursor-pointer"
            />
            
          </button>

        </div>
        <div className="flex gap-4 mt-1">
          {
            item?.likes > 0 && <span className="text-xs text-gray-400">{item?.likes} Me gusta</span>
          }

          {
            item?.comentarios_count == 0 && <span className="text-xs text-gray-400 cursor-pointer hover:underline">{item?.comentarios_count} Comentarios</span>
          }

        </div>
      </div>
    </div>
  );
};