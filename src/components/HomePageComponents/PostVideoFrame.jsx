import { useRef } from 'react';
import { UseImageExtractColor } from '../../hooks/UseImageExtractColor';

export const PostVideoFrame = ({ src }) => {
    const imgRef = useRef(null);
    const bgColor = UseImageExtractColor(imgRef, src);

    return (
        <div
            className="rounded-lg overflow-hidden flex items-center justify-center max-h-[500px]"
            style={{ backgroundColor: bgColor }}
        >
            <video
                muted
                ref={imgRef}
                src={src}
                controls
                crossOrigin="anonymous"
                alt="Video de la publicación"
                className="object-contain max-h-[500px] w-full "
            /> 
        </div>
    );
};