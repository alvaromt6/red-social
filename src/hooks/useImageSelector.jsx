import { useState, useRef } from "react";
import { usePostStore } from "../store/PostStore";
import imageCompression from 'browser-image-compression';

export const useImageSelector = () => {
    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);
    const [fileType, setFileType] = useState(null);
    const fileInputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false); // Arrastrar y soltar

    const { setFile: setFileStore } = usePostStore(); 

    const openFileSelector = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = async (event) => {
        const selectedFile = event.target.files[0];
        if (!selectedFile) return;

        const fileType = selectedFile.type;

         // Validar tipo de archivo
        if (!fileType.startsWith("image/") && !fileType.startsWith("video/")) {
            alert("El archivo seleccionado no es una imagen ni un video.");
            return;
        }

        const sizeMB = selectedFile.size / (1024 * 1024);

        if (fileType.startsWith("image/")) {
            if (sizeMB > 2) {
                alert("El archivo seleccionado es demasiado grande.");
                return;
            }

            try {
                const options = {
                    maxSizeMB: sizeMB > 1 ? 0.1 : 0.2,
                    maxWidthOrHeight: 1920,
                    useWebWorker: true,
                };

                const compressedFile = await imageCompression(selectedFile, options);

                setFile(compressedFile);
                setFileStore(compressedFile);
                setFileType(compressedFile.type);
                setFileUrl(URL.createObjectURL(compressedFile));

            } catch (error) {
                alert("Error al comprimir la imagen.");
                console.error("Error al comprimir la imagen:", error);
            }

        } else {
            // Es un video
            setFile(selectedFile);
            setFileStore(selectedFile);
            setFileType(selectedFile.type);
            setFileUrl(URL.createObjectURL(selectedFile));
        
        }
    };

    return {
        file,
        fileUrl,
        fileType,
        fileInputRef,
        isDragging,
        setIsDragging,
        openFileSelector,
        handleImageChange
    };
};

export const ImageSelector = () => {
    const { fileInputRef, handleImageChange } = useImageSelector();

    return (
        <div className="mt-10 ">
            <input
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                type="file"
                accept="image/*,video/*"
                ref={fileInputRef}
                onChange={handleImageChange}
            />
        </div>
    );
};
