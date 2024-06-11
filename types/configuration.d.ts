/*
@author LxingA
@version 1.0.0
@project SocASF
@description Definición del Tipo para la Configuración Global de la Aplicación
@date 26/04/24 03:00AM
*/

/** Definición del Prototipo para la Configuración de la Aplicación */
export type Application = {
    /** Clave de Acceso a la API de Brevo para la Comunicación SMTP del Servidor */
    smtpKey: string,
    /** Objeto con la Configuración de la Base de Datos de la Aplicación */
    database: {
        /** Ruta Absoluta HTTP del Acceso a la Base de Datos del Proyecto */
        hostname: string,
        /** Clave Secreta para el Acceso a la API de la Base de Datos del Proyecto */
        tokenAccess: string,
        /** Clave Secreta para el Acceso a los Recursos Locales de la Base de Datos para la API */
        resourceAccess: string
    },
    /** Objeto con la Configuración de Seguridad Esencial para la Aplicación */
    security: {
        /** Contenedor con los Métodos HTTP Permitidos en la API */
        method: string[],
        /** Contenedor con las Cabeceras HTTP Permitidas en la API */
        header: string[],
        /** Contenedor con las Direcciones Absolutas de los Origenes Permitidas en la API */
        origin: string[],
        /** Contenedor con las Direcciones IP Permitidas en la API */
        ip: string[],
        /** Clave Secreta para la Encriptación de la Autenticación JWT de la API */
        token: string
    },
    /** Objeto con la Configuración del Servidor para la Aplicación */
    server: {
        /** Número de Puerto TCP para el Escucha de la API */
        port: number,
        /** Definición del Contexto de Entorno de Desarrollo de la API */
        context: "production" | "developer"
    },
    /** Definición de la Versión Global de la Aplicación */
    version: number
};