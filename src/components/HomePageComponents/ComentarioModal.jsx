import { useState, useRef, useEffect } from "react";
import { useInsertarComentarioMutate } from "../../stack/ComentarioStack";
import { BtnClose } from "../sidebar/ui/btn/BtnClose";
import { Icon } from "@iconify/react";
import EmojiPicker from "emoji-picker-react";
import { useComentarioStore } from "../../store/ComentarioStore";

export const ComentarioModal = () => {
  const [Comentario, setComentario] = useState("");
  const { mutate: ComentarioMutate } = useInsertarComentarioMutate({ 
    Comentario: Comentario, 
    setComentario: setComentario 
  });
  const { setShowModal} = useComentarioStore();

  const textComentarioRef = useRef(null);
  const pickerRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const addEmoji = (emojiData) => {
    const emojiChar = emojiData.emoji;
    const textarea = textComentarioRef.current;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const originalText = textarea.value;
    const newText = originalText.substring(0, start) + emojiChar + originalText.substring(end);
    
    setComentario(newText);
    setShowEmojiPicker(false);
  };

  // Detectar clics fuera del selector de emoji y cerrarlo
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
    <main 
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      aria-modal="true"
    >
      <section className="bg-white dark:bg-neutral-900 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-xl flex flex-col relative">
        <header className="sticky top-0 p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-black dark:text-white">
              <img
                src="https://www.hazunaweb.com/imagenes/prueba.jpg"
                alt="Avatar del usuario"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="font-bold text-sm md:text-base lg:max-w-none max-w-[200px] truncate">
                  nombre_usuario
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  descripción
                </span>
              </div>
            </div>
            <BtnClose funcion={setShowModal} />
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-4">
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            <Icon icon="mdi:comment-outline" className="text-4xl mx-auto mb-2 opacity-50" />
            <p>Sin comentarios</p>
            <p className="text-sm mt-1">Sé el primero en comentar</p>
          </div>
        </section>

        <footer className="sticky bottom-0 p-4 bg-white dark:bg-neutral-900 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <img 
              src="https://www.hazunaweb.com/imagenes/prueba.jpg" 
              alt="Tu avatar" 
              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1 relative">
              <div className="flex items-center gap-2">
                <input 
                  ref={textComentarioRef}
                  value={Comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  type="text" 
                  placeholder="Escribe un comentario..." 
                  className="flex-1 bg-gray-100 dark:bg-neutral-800 text-black dark:text-white text-sm rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
                <button 
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)} 
                  type="button"
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
                  aria-label="Agregar emoji"
                >
                  <Icon icon="mdi:emoticon-outline" className="text-xl" />
                </button>
                <button 
                  className="text-gray-400 p-2 rounded-full cursor-not-allowed"
                  //disabled
                  aria-label="Enviar comentario"
                  onClick={() => ComentarioMutate()}
                >
                  <Icon icon="mdi:send" className="text-xl" />
                </button>
              </div>
              
              
              {showEmojiPicker && (
                <div 
                  className="absolute bottom-full right-0 mb-2 z-[60]" 
                  ref={pickerRef}
                  style={{ 
                    transform: 'translateY(-8px)',
                    maxHeight: '300px',
                    overflow: 'hidden'
                  }}
                >
                  <EmojiPicker 
                    onEmojiClick={addEmoji} 
                    theme="auto" 
                    searchDisabled
                    width={320}
                    height={300}
                    previewConfig={{
                      showPreview: false
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </footer>
      </section>
    </main>
  );
};