import { useRelativeTime } from "../../hooks/useRelativeTime";
import { useRespuestasComentariosStore } from "../../store/RespuestasComentariosStore";
import { InputRespuestaAComentario } from "./InputRespuestaAComentario";

export const ComentarioCard = ({item}) => {
  const fechaRelativa = useRelativeTime(item?.fecha);
  const { respuestaActivaParaComentarioId, setRespuestaActiva, limpiarRespuestaActiva } = useRespuestasComentariosStore();

  return (
    <div className="mb-4 last:mb-0">
      <div className="flex items-start gap-3 group relative w-full">
        <img 
          src={item?.foto_perfil} 
          alt={`Avatar de ${item?.nombre_usuario}`}
          className="w-8 h-8 rounded-full object-cover flex-shrink-0" 
        />
        <div className="flex-1 min-w-0">
          <div className="bg-gray-100 dark:bg-neutral-800 p-3 rounded-2xl text-sm w-fit max-w-full">
            <span className="font-semibold block text-xs text-gray-800 dark:text-gray-200 mb-1">
              {item?.nombre_usuario}
            </span>
            <p className="text-gray-900 dark:text-gray-100 break-words leading-relaxed">
              {item?.comentario}
            </p>
          </div>
          <div className="flex gap-3 mt-1 text-xs text-gray-500 ml-2 relative">
            <span>{fechaRelativa}</span>
            <button className="hover:underline cursor-pointer" onClick={() => {
              respuestaActivaParaComentarioId === item?.id ? limpiarRespuestaActiva() : setRespuestaActiva(item?.id)
            }}>
              {respuestaActivaParaComentarioId === item?.id ? 'Cancelar' : 'Responder'}
            </button>
          </div>
          
          {/* Contador de respuestas */}
          {item?.respuestas_count > 0 && (
            <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mt-2 ml-2 font-medium transition-colors flex items-center gap-1">
              <span>─</span>
              {item?.respuestas_count === 1 
                ? `Ver ${item?.respuestas_count} respuesta`
                : `Ver ${item?.respuestas_count} respuestas`
              }
            </button>
          )}
          {respuestaActivaParaComentarioId === item?.id && (
            <div>
              <div className="w-4 h-4 border-l-2 border-b-2 border-gray-300 dark:border-gray-600 rounded-bl-[8px] absolute bottom-18 -ml-[29px]"/>
                <InputRespuestaAComentario />
              
            </div>
          )}
        </div>
      </div>
    </div>
  );
};