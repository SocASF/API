/*
@author LxingA
@version 1.0.0
@project SocASF
@description Definición de los Fetchers Locales para el Servidor API
@date 29/05/24 07:30PM
*/
import {CloudFlareStream} from './configuration';

/** Utilidad Esencial para la Verificación de la Respuesta del reCaptcha dada en el Cliente */
export const HTTPreCaptcha = (async({secretKey,responseKey}:{
    /** Clave Secreto del reCaptcha */
    secretKey: string,
    /** Código de Respuesta del reCaptcha */
    responseKey: string
}): Promise<{success:boolean,"error-codes":string[]}> => (await (await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${responseKey}`,{
    method: "get"
}))["json"]()));

/** Utilidad Esencial para el Llamado a la API de CloudFlare Stream para los Vídeos del Proyecto */
export const CloudFlareStreamHTTP = async({key,token}:{
    /** Identificador Único del Vídeo */
    key: string,
    /** Establecer la Consulta en Modo de Obtención del Token de Acceso */
    token: boolean
}): Promise<{
    /** Estatus de la Solicitud para el Cliente */
    success: boolean,
    /** Objeto con los Datos Solicitados por la API para el Cliente */
    result: any
}> => {
    const state = (CloudFlareStream());
    return (await (await fetch(`https://api.cloudflare.com/client/v4/accounts/${state["accountID"]}/stream/${key}${token ? "/token" : ""}`,{
        method: (token ? "post" : "get"),
        cache: (token ? undefined : "force-cache"),
        headers: {
            Authorization: `Bearer ${state["tokenAccess"]}`
        }
    }))["json"]());
};