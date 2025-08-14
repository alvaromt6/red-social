import { useRef } from 'react';
import { UseImageExtractColor } from '../../hooks/UseImageExtractColor';

export const PostImageFrame = ({ src }) => {
    const imgRef = useRef(null);
    const bgColor = UseImageExtractColor(imgRef, src);

    return (
        <div
            className="rounded-lg overflow-hidden flex items-center justify-center max-h-[500px]"
            style={{ backgroundColor: bgColor }}
        >
            <img
                ref={imgRef}
                src={src}
                crossOrigin="anonymous"
                alt="Imagen de la publicación"
                className="object-contain max-h-[500px]"
            />
        </div>
    );
};