declare module "bun" {
    interface Env {
        /** Definición del Puerto TCP de Escucha para la API */
        CKGlobParamDefineAPIPortListen: number,
        /** Definición del Tipo de Entorno de Ejecución de la API en el Servidor de Origen */
        CKGlobParamDefineAPIEnvironmentType: "production" | "developer",
        /** Contenedor con las Cabeceras HTTP Autorizadas en la API (separadas por comas) */
        CKGlobParamDefineAPISecurityAllowHeaders: string,
        /** Contenedor con los Métodos HTTP Autorizados en la API (separados por comas) */
        CKGlobParamDefineAPISecurityAllowMethods: string,
        /** Contenedor con los Origenes HTTP Autorizados en la API (separados por comas) */
        CKGlobParamDefineAPISecurityAllowHTTPOrigin: string,
        /** Contenedor con las Direcciones IP Autorizadas en la API (separadas por comas) */
        CKGlobParamDefineAPISecurityAllowIP: string,
        /** Ruta Absoluta HTTP para la Conexión con la Base de Datos de la API */
        CKGlobParamDefineAPIDatabasePathExecute: string,
        /** Clave de Acceso a la API Confidencial */
        CKGlobParamDefineAPIDatabaseAccessTokenKey: string,
        /** Definición de la Versión Global de la Aplicación */
        CKGlobParamDefineAPIVersion: number,
        /** Definición de una Clave Secreta para la Autenticación JWT de la Aplicación */
        CKGlobParamDefineJWTTokenSecretKey: string,
        /** Definición de una Clave de Acceso para los Recursos Locales de la Base de Datos para la API */
        CKGlobParamDefineAPITokenAccessResource: string
    }
}