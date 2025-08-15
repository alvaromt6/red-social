export const useGenerarCodigosAleatorios = () => {
    const caracteres = "0123456789";
    const longitud = 8;
    let resultado = "";

    for (let i = 0; i < longitud; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        resultado += caracteres[indice];
    }

    return resultado;
};
