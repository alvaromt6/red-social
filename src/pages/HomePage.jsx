import { useEffect, useRef, useCallback } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { HeaderSticky } from "../components/HomePageComponents/HeaderSticky";
import { InputPublicar } from "../components/HomePageComponents/InputPublicar";
import { PublicacionCard } from "../components/HomePageComponents/PublicacionCard";
import { FormPost } from "../components/forms/formPost";
import { usePostStore } from "../store/PostStore";
import { Toaster } from "sonner";
import { useMostrarPostQuery } from "../stack/PostStack";
import { throttle } from "../components/utils/throttle";
import { SpinnerMoonloader } from "../components/sidebar/ui/spinners/SpinnerMoonloader";
import { useSupabaseSubscription } from "../hooks/useSupabaseSubscription";
import { ComentarioModal } from "../components/HomePageComponents/ComentarioModal";
import { useComentarioStore } from "../store/ComentarioStore";

export const HomePage = () => {
  const { showModal } = useComentarioStore();
  // Estado del store para controlar si el modal de crear post está abierto
  const { stateForm } = usePostStore();
  
  // Hook de React Query para manejo de paginación infinita
  // dataPost: Array de páginas con posts [[post1, post2], [post3, post4], ...]
  // fetchNextPage: Función para cargar la siguiente página
  // hasNextPage: Boolean que indica si hay más páginas disponibles
  // isFetchingNextPage: Boolean que indica si está cargando una nueva página
  const {data: dataPost, fetchNextPage, hasNextPage, isFetchingNextPage } = useMostrarPostQuery();

  // Referencia al elemento div que contiene el scroll
  // Necesario para detectar cuando el usuario llega al final del contenido
  const scrollRef = useRef(null);

  // Función throttleada que se ejecuta máximo cada 200ms
  // Evita que fetchNextPage se llame cientos de veces durante el scroll
  const throttledFetchNextPage = useCallback(
    throttle(() => {
      // Solo carga más posts si hay páginas disponibles y no está cargando ya
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }, 200), // Máximo 5 ejecuciones por segundo
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  // Función que maneja el evento scroll y detecta cuando el usuario está cerca del final
  const handleScroll = useCallback(() => {
    const element = scrollRef.current;
    
    if (!element) return;
    
    // Cálculo de posición de scroll:
    // scrollTop: píxeles que han sido scrolleados desde la parte superior
    // clientHeight: altura visible del contenedor de scroll
    // scrollHeight: altura total del contenido (incluyendo lo que no se ve)
    const scrollTop = element.scrollTop;
    const clientHeight = element.clientHeight;
    const scrollHeight = element.scrollHeight;
    
    // Verificamos si el usuario está cerca del final (200px antes de llegar abajo)
    // Esto da tiempo para cargar contenido antes de que llegue al final real
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - 200;
    
    if (isNearBottom) {
      // Ejecutamos la función throttleada para cargar más contenido
      throttledFetchNextPage();
    }
  }, [throttledFetchNextPage]);

  // Effect para configurar y limpiar el event listener del scroll
  useEffect(() => {
    const element = scrollRef.current;
    
    if (element) {
      // Agregamos el event listener al elemento
      element.addEventListener("scroll", handleScroll);
      
      // Función de limpieza que se ejecuta cuando:
      // 1. El componente se desmonta
      // 2. Las dependencias del useEffect cambian
      // Esto previene memory leaks al remover event listeners huérfanos
      return () => {
        element.removeEventListener("scroll", handleScroll);
      };
    }
  }, [handleScroll]);

  useSupabaseSubscription({
    channelName: "public:publicaciones",
    options: {
      event: "*",
      schema: "public",
      table: "publicaciones",
    },
    queryKey: ["mostrar-post"],
  })

    useSupabaseSubscription({
    channelName: "public:comentarios",
    options: {
      event: "*",
      schema: "public",
      table: "comentarios",
    },
    queryKey: ["mostrarComentario"],
  })

  return (
    <main className="flex min-h-screen bg-white dark:bg-bg-dark max-w-[1200px] mx-auto">
      {/* Componente para mostrar notificaciones tipo toast */}
      <Toaster position="top-center" richColors closeButton />
      
      {/* Modal de formulario para crear posts - solo se muestra si stateForm es true */}
      {stateForm && <FormPost />}
      
      <section className="flex flex-col w-full h-screen">
        <article className="flex flex-col h-screen overflow-hidden border border-gray-200 border-t-0 border-b-0 dark:border-gray-600">
          
          {/* Header que permanece fijo en la parte superior */}
          <HeaderSticky/>
          
          {/* Contenedor principal con scroll - aquí se aplica el infinite scroll */}
          <div ref={scrollRef} className="overflow-y-auto">
            
            {/* Componente para crear nuevas publicaciones */}
            <InputPublicar/>
            
            {/* Renderizado de todas las publicaciones usando paginación infinita */}
            {
              dataPost?.pages?.map((page, pageIndex) => 
                // Cada página es un array de posts que mapeamos individualmente
                page?.map((item, index) => (
                  <PublicacionCard 
                    // Key único: preferimos item.id si existe, sino usamos índices
                    // Esto ayuda a React a optimizar re-renders
                    key={item.id || `${pageIndex}-${index}`}
                    // Pasamos toda la data del post al componente
                    item={item} 
                  />
                ))
              )
            }
            
            {/* Estado vacío - se muestra cuando no hay publicaciones */}
            {dataPost?.pages?.[0]?.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No hay publicaciones aún</p>
                <p className="text-sm">¡Sé el primero en compartir algo!</p>
              </div>
            )}

                       {/* Indicador de carga - se muestra mientras se cargan más publicaciones */}
            {isFetchingNextPage && (
              <div className="text-center py-4 text-gray-500">
                <SpinnerMoonloader />
              </div>
            )}

          </div>
        </article>

        
        {/* Sidebar derecho - comentado para uso futuro */}
        {/* <article>
          Side Derecho
        </article> */}
        {/* Modal de comentarios - se muestra al interactuar con una publicación */}
        { showModal && (
          <ComentarioModal  />
        )}
      </section>
    </main>
  );
};