import { useState, useEffect } from 'react';
import { FastAverageColor } from 'fast-average-color';


export function UseImageExtractColor(imgRef,src){
    const [bgColor,setBgColor] = useState("#e5e7eb");
    useEffect(() => {
        const fac = new FastAverageColor();
        const img = imgRef.current;
        if(!img) return; 
        const handleLoad = async() => {
            try {
                const color = await fac.getColorAsync(img);
                setBgColor(color.hex);
            } catch (error) {
                console.warn("Error Extrayendo el color:", error);
            }
        };
        if (img.complete) {
            handleLoad();
        } else {
            img.addEventListener("load", handleLoad);
            return () => {
                img.removeEventListener("load", handleLoad);
            };
        }
    },[src]);
    return bgColor;

}