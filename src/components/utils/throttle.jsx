/**
 * Función throttle para optimizar el rendimiento del scroll
 * Limita la ejecución de una función a un máximo de una vez cada X milisegundos
 * 
 * @param {Function} func - La función que queremos throttlear
 * @param {number} delay - Tiempo mínimo entre ejecuciones en milisegundos
 * @returns {Function} - Nueva función throttleada
 */
export const throttle = (func, delay) => {
  let timeoutId;          // ID del timeout (por si necesitamos cancelarlo)
  let lastExecTime = 0;   // Timestamp de la última ejecución exitosa
  
  // Retornamos una nueva función que controla la frecuencia de ejecución
  return (...args) => {
    const currentTime = Date.now();
    
    // Solo ejecuta si ha pasado suficiente tiempo desde la última ejecución
    if (currentTime - lastExecTime > delay) {
      // Ejecutamos la función original con todos sus argumentos
      // El spread operator (...args) desempaca el array de argumentos
      func(...args);
      lastExecTime = currentTime;
    }
  };
};
