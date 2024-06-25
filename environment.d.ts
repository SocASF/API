declare global {
    namespace NodeJS {
        interface ProcessEnv {
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
            CKGlobParamDefineAPITokenAccessResource: string,
            /** Definición de las Claves Secretas de los reCaptchas del Proyecto para la API (separadas por comas) */
            CKGlobParamDefineReCaptchaKeysSecret: string,
            /** Definición de la Clave de Acceso a la API de Brevo en el Servidor */
            CKGlobParamDefineBrevoSMTPKeyAccess: string,
            /** Definición de la Clave de Acceso a la API de CloudFlare Stream en el Servidor */
            CKGlobParamDefineCloudFlareStreamAccessToken: string,
            /** Definición del Identificador de Cuenta de CloudFlare del Proyecto en el Servidor */
            CKGlobParamDefineCloudFlareAccountIdentified: string
        }
    }
}

export {}