export const mongoConfig = {
    maxPoolSize: 10, // Número máximo de conexiones en el pool
    maxIdleTimeMS: 15000, // Tiempo máximo de inactividad de una conexión
    serverSelectionTimeoutMS: 40000, // Aumentar tiempo de espera (40 segundos)
    socketTimeoutMS: 60000, // Tiempo de inactividad permitido para sockets
    retryWrites: true, // Reintentar escrituras en caso de error
}