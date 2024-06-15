/*
@author LxingA
@version 1.0.0
@project SocASF
@description Definición de los Objetos de las Configuraciones de la API
@date 26/04/24 03:00AM
*/
import {Keyword} from '../util/random';
import type {Application} from '../types/configuration';

/** Definición del Objeto con la Información Global de la Aplicación */
export const AppConfig = (): Application => ({
    smtpKey: (process["env"]["CKGlobParamDefineBrevoSMTPKeyAccess"]),
    database: {
        hostname: (process["env"]["CKGlobParamDefineAPIDatabasePathExecute"]),
        tokenAccess: (process["env"]["CKGlobParamDefineAPIDatabaseAccessTokenKey"]),
        resourceAccess: (process["env"]["CKGlobParamDefineAPITokenAccessResource"])
    },
    security: {
        origin: (process["env"]["CKGlobParamDefineAPISecurityAllowHTTPOrigin"]?.split(",") || []),
        ip: (process["env"]["CKGlobParamDefineAPISecurityAllowIP"]?.split(",") || []),
        method: (process["env"]["CKGlobParamDefineAPISecurityAllowMethods"]?.split(",") || []),
        header: (process["env"]["CKGlobParamDefineAPISecurityAllowHeaders"]?.split(",") || []),
        token: (process["env"]["CKGlobParamDefineJWTTokenSecretKey"] || Keyword(48))
    },
    server: {
        port: (process["env"]["CKGlobParamDefineAPIPortListen"] || 3000),
        context: (process["env"]["CKGlobParamDefineAPIEnvironmentType"] || "developer")
    },
    version: (process["env"]["CKGlobParamDefineAPIVersion"] || 1)
});

/** Definición del Objeto con las Claves Secretas de Acceso a los reCaptchas del Proyecto */
export const reCaptcha = (): Record<string,(Record<string,string>)> => {
    const _splitted_: string[] = (process["env"]["CKGlobParamDefineReCaptchaKeysSecret"]["split"](",") || []);
    return ({
        iexpressmty: {
            formContactKey: (_splitted_[0] || "")
        }
    });
};

/** Definición del Objeto con las Claves Secretas de Acceso a BunnyCDN Stream del Proyecto */
export const BunnyCDNStream = (): Record<string,(Record<string,({
    /** Clave de Acceso Secreto para la API de BunnyCDN Stream */
    accessKey: string,
    /** Identificador Númerico de la Librería para el Acceso a la API de BunnyCDN Stream */
    libraryID: number,
    /** Clave Secreto para la Encriptación de los Vídeos de BunnyCDN Stream del Proyecto */
    secretKey: string
})>)> => {
    const _accessKey_: string[] = (process["env"]["CKGlobParamDefineBunnyCDNStreamAccessKey"]["split"](",") || []);
    const _libraryID_: string[] = (process["env"]["CKGlobParamDefineBunnyCDNStreamLibraryID"]["split"](",") || []);
    const _secretKey_: string[] = (process["env"]["CKGlobParamDefineBunnyCDNStreamHashedSecretKey"]["split"](",") || []);
    return ({
        ckvideopub: {
            container: {
                accessKey: _accessKey_[0],
                libraryID: Number(_libraryID_[0]),
                secretKey: _secretKey_[0]
            }
        }
    });
};

/** Definición del Contenedor con los Días en Varios Idiomas para las Aplicaciones */
export const Days: Record<string,(string[])> = {
    es: [
        "Domingos",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábados"
    ]
};