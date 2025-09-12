import { useEffect, useRef, useState } from 'react';
import { FastAverageColor } from 'fast-average-color';

export const PostVideoFrame = ({ src }) => {
    const videoRef = useRef(null);
    const [bgColor, setBgColor] = useState("#e5e7eb")
    const containerRef = useRef(null);

    // Observar si esta en pantalla y pausar/reproducir
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                const video = videoRef.current;
                if (!video) return;
                if (entry.isIntersecting) { // Si el video está en pantalla
                    // Intentar reproducir el video y manejar posibles errores
                    video.play().catch((error) => {
                        console.warn("Error al reproducir el video:", error);
                    });
                } else {
                    video.pause();
                }
            },
            {
                threshold: 0.5 // El video debe estar al menos un 50% visible para reproducirse
            }
        );
        if (containerRef.current) { // Asegurarse de que la referencia no sea nula
            observer.observe(containerRef.current);
        }
        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    //Capturar color del primer frame del video
    useEffect(() => {
        const fac = new FastAverageColor(); // Instancia de FastAverageColor
        const video = videoRef.current;
        if(!video) return;
        
        const captureFrame = async() => {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL("image/jpeg");
            
            const img = new Image();
            img.src = dataUrl;
            img.crossOrigin = "anonymous";
            img.onload = async () => {
                try {
                    const color = await fac.getColorAsync(img);
                    setBgColor(color.hex);
                } catch (error) {
                    console.warn("Error al extraer el color del video:", error);
                }
            };
        };
        
        const onLoaded = () => {
            captureFrame();
        };
        
        video.addEventListener('loadeddata', onLoaded);
        
        return () => {
            video.removeEventListener('loadeddata', onLoaded);
            fac.destroy();
        };
    }, [src]);

    // RENDERIZADO DEL COMPONENTE
    return (
        <div
            ref={containerRef} // Referencia para el IntersectionObserver
            className="rounded-lg overflow-hidden flex items-center justify-center max-h-[500px]"
            style={{ backgroundColor: bgColor }} // Color dinámico extraído del video
        >
            <video
                muted                           // Sin sonido por defecto (necesario para autoplay)
                ref={videoRef}                 // Referencia para controlar el video
                src={src}                      // Fuente del video pasada como prop
                controls                       // Mostrar controles nativos del video
                crossOrigin="anonymous"        // Evitar problemas de CORS
                alt="Video de la publicación"  // Texto alternativo para accesibilidad
                className="object-contain max-h-[500px] w-full" // Estilos responsive
            /> 
        </div>
    );
};