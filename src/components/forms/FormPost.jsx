import { BtnClose } from "../sidebar/ui/BtnClose";
import { useUsuariosStore } from "../../store/UsuarioStore";
import { useRef, useState, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import { Icon } from "@iconify/react/dist/iconify.js";

export const FormPost = () => {
  const { dataUsuario } = useUsuariosStore();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textareaRef = useRef(null);
  const pickerRef = useRef(null);
  const [PostText, setPostText] = useState("");

  const addEmoji = (emojiData) => {

    const emojiChar = emojiData.emoji;
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const originalText = textarea.value;
    const newText = originalText.substring(0, start) + emojiChar + originalText.substring(end);
    setPostText(newText);
  };
  const handleTextChange = (event) => {
    setPostText(event.target.value);
  };

  // Detectar clics fuera del selector de emoji y cerrarlo
  useEffect(() =>{
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
    <section className="fixed z-50 flex items-center justify-center inset-0">
      {/* Fondo difuminado */}
      <div className="absolute inset-0 backdrop-blur-sm cursor-pointer"></div>
      <section className="bg-white relative w-full max-w-xl text-black dark:bg-bg-dark dark:text-white rounded-lg shadow-lg p-6">
        {/* header */}
        <header className="flex items-center justify-between p-4 border-b border-gray-200/40 dark:border-gray-600/40">
          <h2 className="text-xl font-semibold">Crear Nueva Publicación</h2>
          <BtnClose />
        </header>
        <main className="p-4 space-y-4">
          {/* user info */}
          <section className="flex items-center gap-1">
            <img src={dataUsuario?.foto_perfil} alt="User Avatar" className="w-10 h-10 rounded-full mr-3 object-cover" />

            <div>
              <span>{dataUsuario?.nombre}</span>
            </div>
          </section>
          <form action="">
            <div className="relative ">
              <textarea 
                ref={textareaRef}
                value={PostText}
                onChange={handleTextChange}
                className="w-full placeholder-gray-400 outline-none" 
                rows="4" 
                placeholder="¿Qué estás pensando?">
              </textarea>
              {
                showEmojiPicker && (
                  <div 
                    className="absolute top-10 left-10 mt-2" 
                    ref={pickerRef}>
                    <EmojiPicker onEmojiClick={addEmoji} theme="auto" searchDisabled/>
                  </div>
                )}
                <div className="mt-4 flex items-center justify-between">
                  <button type="submit" className=" px-4 py-2 bg-primary text-white rounded-lg font-medium cursor-pointer">Publicar</button>
                  
                  <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} type="button" className=" text-black/50 dark:text-white/50 hover:bg-gray-700 rounded-full cursor-pointer">
                    <Icon icon="mdi:emoticon-outline" className="text-2xl"></Icon>
                  </button>
                </div>
            </div>
          </form>
        </main>
        
        <footer className="p-4 border-t border-gray-500/40">
            <div className="flex items-center justify-between p-3 border border-gray-500/40 rounded-lg">
                <span className="text-sm dark:text-white">
                    Agregar Publicación
                </span>
                <div className="flex space-x-4">
                    <button className="p-1 rounded-full text-black/50 dark:text-white/50 hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Agregar imagen">
                        <Icon icon="mdi:image-outline" className="text-gray-500 text-2xl" />
                    </button>
                </div>
            </div>
        </footer>
      </section>
    </section>
  );
};
