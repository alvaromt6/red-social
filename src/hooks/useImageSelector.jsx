import { useState, useRef } from "react";
import { usePostStore } from "../store/PostStore";
import imageCompression from 'browser-image-compression';
import { Icon } from "@iconify/react/dist/iconify.js";

export const useImageSelector = () => {
    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);
    const [fileType, setFileType] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);
    
    const { setFile: setFileStore } = usePostStore();

    const openFileSelector = () => {
        fileInputRef.current?.click();
    };

    const resetFileState = () => {
        setFile(null);
        setFileUrl(null);
        setFileType(null);
        setFileStore(null);
    };

    const handleImageChange = async (event) => {
        const selectedFile = event.target.files[0];
        if (!selectedFile) return;

        setIsLoading(true);
        
        try {
            const fileType = selectedFile.type;
            
            // Validar tipo de archivo
            if (!fileType.startsWith("image/") && !fileType.startsWith("video/")) {
                alert("El archivo seleccionado no es una imagen ni un video.");
                return;
            }

            const sizeMB = selectedFile.size / (1024 * 1024);
            let finalFile = selectedFile;

            // Procesar imágenes
            if (fileType.startsWith("image/")) {
                if (sizeMB > 2) {
                    alert("La imagen es demasiado grande. Máximo 2MB.");
                    return;
                }

                // Comprimir imagen si es necesaria
                if (sizeMB > 0.5) { // Solo comprimir si es mayor a 0.5MB
                    const options = {
                        maxSizeMB: 0.8,
                        maxWidthOrHeight: 1920,
                        useWebWorker: true,
                    };

                    finalFile = await imageCompression(selectedFile, options);
                }
            } else if (fileType.startsWith("video/")) {
                // Validar tamaño de video (ejemplo: máximo 10MB)
                if (sizeMB > 10) {
                    alert("El video es demasiado grande. Máximo 10MB.");
                    return;
                }
            }

            // Crear URL para preview
            const objectUrl = URL.createObjectURL(finalFile);

            // Actualizar estados
            setFile(finalFile);
            setFileUrl(objectUrl);
            setFileType(finalFile.type);
            setFileStore(finalFile);

        } catch (error) {
            console.error("Error al procesar el archivo:", error);
            alert("Error al procesar el archivo. Por favor, intenta de nuevo.");
            resetFileState();
        } finally {
            setIsLoading(false);
            // Limpiar el input para permitir seleccionar el mismo archivo otra vez
            event.target.value = '';
        }
    };

    // Limpiar URL cuando el componente se desmonte o cambie el archivo
    const clearFileUrl = () => {
        if (fileUrl) {
            URL.revokeObjectURL(fileUrl);
        }
        resetFileState();
    };

    return {
        file,
        fileUrl,
        fileType,
        fileInputRef,
        isLoading,
        openFileSelector,
        handleImageChange,
        clearFileUrl,
        resetFileState
    };
};

export const ImageSelector = () => {
    const { 
        fileInputRef, 
        handleImageChange, 
        isLoading,
        file,
        fileUrl,
        fileType,
        clearFileUrl 
    } = useImageSelector();

    return (
        <div className="mt-10 dark:bg-white p-4 rounded-lg shadow">
            <div className="relative">
                <input
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 pl-8"
                    type="file"
                    accept="image/*,video/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    disabled={isLoading}
                />
                <Icon 
                    icon="mdi:upload" 
                    width={20} 
                    height={20} 
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                />
            </div>
            
            {isLoading && (
                <div className="mt-2 text-sm text-gray-600">
                    Procesando archivo...
                </div>
            )}
            
            {file && fileUrl && (
                <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">
                            {fileType?.startsWith("image/") ? "Vista previa:" : "Archivo seleccionado:"}
                        </span>
                        <button 
                            onClick={clearFileUrl}
                            className="flex items-center gap-1 text-red-500 text-sm hover:text-red-700"
                        >
                            Eliminar <Icon icon="mdi:delete-outline" width={20} height={20} />
                        </button>
                    </div>
                    
                    {fileType?.startsWith("image/") ? (
                        <img 
                            src={fileUrl} 
                            alt="Preview" 
                            className="max-w-xs max-h-48 object-contain border rounded"
                        />
                    ) : (
                        <video 
                            src={fileUrl} 
                            controls 
                            className="max-w-xs max-h-48 border rounded"
                        >
                            Tu navegador no soporta el elemento video.
                        </video>
                    )}
                    
                    <p className="text-xs text-gray-500 mt-1">
                        {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                </div>
            )}
        </div>
    );
};