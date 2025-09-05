import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { HeaderSticky } from "../components/HomePageComponents/HeaderSticky";
import { InputPublicar } from "../components/HomePageComponents/InputPublicar";
import { PublicacionCard } from "../components/HomePageComponents/PublicacionCard";
import { FormPost } from "../components/forms/formPost";
import { usePostStore } from "../store/PostStore";
import { Toaster } from "sonner";
import { useMostrarPostQuery } from "../stack/PostStack";


export const HomePage = () => {
  const { stateForm } = usePostStore();
  
  //fetchNextPage - función para cargar la siguiente página
  //hasNextPage - booleano que indica si hay más páginas para cargar
  //isFetchingNextPage - booleano que indica si se están cargando más páginas
  //dataPost - data de las publicaciones
  const {data:dataPost, fetchNextPage, hasNextPage, isFetchingNextPage } = useMostrarPostQuery();
  const scrollRef = useRef(null);

  useEffect(() => {
    const element = scrollRef.current;
    const handleScroll = () => {
      if (element.scrollTop + element.clientHeight >= element.scrollHeight -200 && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };
    if (element) {
      element.addEventListener("scroll", handleScroll);
      return () => 
      element.removeEventListener("scroll", handleScroll);
    }
  },[fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <main className="flex min-h-screen bg-white dark:bg-bg-dark max-w-[1200px] mx-auto ">
      <Toaster position="top-center" richColors closeButton />
      {stateForm && <FormPost />}
      <section className="flex flex-col w-full h-screen ">
        <article className="flex flex-col h-screen overflow-hidden border border-gray-200 border-t-0 border-b-0 dark:border-gray-600">
          <HeaderSticky/>
          <div ref={scrollRef} className="overflow-y-auto">
            <InputPublicar/>
            {
              dataPost?.pages?.map((page, pageIndex) => 
                page?.map((item, index) => (
                  <PublicacionCard 
                    key={item.id || `${pageIndex}-${index}`} // Usar ID único si existe
                    item={item} 
                  />
                ))
              )
            }
            {dataPost?.pages?.[0]?.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No hay publicaciones aún</p>
                <p className="text-sm">¡Sé el primero en compartir algo!</p>
              </div>
            )}
                        
          </div>
        </article>
        {/* <article>
          Side Derecho
        </article> */}
      </section>
    </main>
  );
};