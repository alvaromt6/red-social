import { useUsuariosStore } from "../../store/UsuarioStore";
import { useInsertarRespuestaComentarioMutate } from "../../stack/RespuestasComentariosStack";
import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import EmojiPicker from "emoji-picker-react";
import { useRespuestasComentariosStore } from "../../store/RespuestasComentariosStore";

export const InputRespuestaAComentario = () => {
  const textComentarioRef = useRef(null);
  const pickerRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [comentario, setComentario] = useState("");
  const { mutate: comentarioMutate } = useInsertarRespuestaComentarioMutate();
  const { dataUsuario } = useUsuariosStore();
  const { setRespuesta } = useRespuestasComentariosStore();

  const addEmoji = (emojiData) => {
    const emojiChar = emojiData.emoji;
    const textarea = textComentarioRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const originalText = textarea.value;
    const newText =
      originalText.substring(0, start) +
      emojiChar +
      originalText.substring(end);

    setComentario(newText);
    setShowEmojiPicker(false);
    setRespuesta(newText);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section className="sticky bottom-0 p-4 bg-white dark:bg-neutral-900 border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3">
        <img
          src={dataUsuario?.foto_perfil}
          alt="Tu avatar"
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1 relative">
          <div className="flex items-center gap-2">
            <input
              ref={textComentarioRef}
              value={comentario}
              onChange={(e) =>{
                setRespuesta(e.target.value);
                setComentario(e.target.value);
              }}
              type="text"
              placeholder="Escribe un comentario..."
              className="flex-1 bg-gray-100 dark:bg-neutral-800 text-black dark:text-white text-sm rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => setShowEmojiPicker((prev) => !prev)}
              type="button"
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Agregar emoji"
            >
              <Icon icon="mdi:emoticon-outline" className="text-xl" />
            </button>
            <button
              className="text-gray-400 p-2 rounded-full cursor-not-allowed"
              aria-label="Enviar comentario"
              onClick={() => comentarioMutate()}
            >
              <Icon icon="mdi:send" className="text-xl" />
            </button>
          </div>
          {showEmojiPicker && (
            <div
              className="absolute bottom-full right-0 mb-2 z-[60]"
              ref={pickerRef}
              style={{
                transform: "translateY(-8px)",
                maxHeight: "300px",
                overflow: "hidden",
              }}
            >
              <EmojiPicker
                onEmojiClick={addEmoji}
                theme="auto"
                searchDisabled
                width={320}
                height={300}
                previewConfig={{
                  showPreview: false,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
