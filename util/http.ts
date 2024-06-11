/*
@author LxingA
@version 1.0.0
@project SocASF
@description Definición de los Fetchers Locales para el Servidor API
@date 29/05/24 07:30PM
*/

/** Utilidad Esencial para la Verificación de la Respuesta del reCaptcha dada en el Cliente */
export const HTTPreCaptcha = (async({secretKey,responseKey}:{
    /** Clave Secreto del reCaptcha */
    secretKey: string,
    /** Código de Respuesta del reCaptcha */
    responseKey: string
}): Promise<{success:boolean,"error-codes":string[]}> => (await (await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${responseKey}`,{
    method: "get"
}))["json"]()));