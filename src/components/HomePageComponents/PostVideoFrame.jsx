import { useEffect, useRef, useState } from 'react';
import { FastAverageColor } from 'fast-average-color';

export const PostVideoFrame = ({ src }) => {
    const videoRef = useRef(null);
    const [bgColor, setBgColor] = useState("#e5e7eb")
    const containerRef = useRef(null);
    // Referencia para manejar la promesa de play()
    const playPromiseRef = useRef(null);

    // Observar si esta en pantalla y pausar/reproducir
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                const video = videoRef.current;
                if (!video) return;
                
                if (entry.isIntersecting) {
                    // FIX: Manejar play() de forma segura
                    if (video.paused) {
                        playPromiseRef.current = video.play().catch((error) => {
                            // Solo logear errores que no sean AbortError
                            if (error.name !== 'AbortError') {
                                console.warn("Error al reproducir el video:", error);
                            }
                        });
                    }
                } else {
                    // FIX: Esperar a que termine play() antes de pausar
                    if (playPromiseRef.current) {
                        playPromiseRef.current.then(() => {
                            if (!video.paused) {
                                video.pause();
                            }
                        }).catch(() => {
                            // Si play() falló, no necesitamos pausar
                        });
                    } else {
                        video.pause();
                    }
                }
            },
            {
                threshold: 0.5 // El video debe estar al menos un 50% visible para reproducirse
            }
        );
        
        if (containerRef.current) {
            observer.observe(containerRef.current);
        }
        
        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
            // FIX: Limpiar promesa pendiente
            playPromiseRef.current = null;
        };
    }, []);

    //Capturar color del primer frame del video
    useEffect(() => {
        const fac = new FastAverageColor();
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
            ref={containerRef}
            className="rounded-lg overflow-hidden flex items-center justify-center max-h-[500px]"
            style={{ backgroundColor: bgColor }}
        >
            <video
                muted
                ref={videoRef}
                src={src}
                controls
                crossOrigin="anonymous"
                // FIX: Remover alt (no es válido en video) y agregar aria-label
                aria-label="Video de la publicación"
                className="object-contain max-h-[500px] w-full"
            /> 
        </div>
    );
};