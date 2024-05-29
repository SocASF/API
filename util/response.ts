/*
@author LxingA
@version 1.0.0
@project SocASF
@description Definición de las Respuestas Predeterminadas para el Servidor
@date 28/05/24 11:30PM
*/
import {Component} from './html';
import {Keyword} from './random';
import type {Application} from '../types/configuration';
import type {Response as ExpressResponse} from 'express';
import type ResponseAPI from '../types/response';

/** Respuesta Esencial con el Formato Establecido para el Renderizado HTML en la API */
export const ResponseHTML = ({code,response,meta,version}:{
    /** Código HTTP de Respuesta */
    code: number,
    /** Objeto con la Instancia de Respuesta del Servidor Express */
    response: ExpressResponse,
    /** Versión Actual de la Aplicación */
    version: Application["version"],
    /** Objeto con la Información Esencial para la Parte de Renderizado HTML */
    meta: {
        /** Titulo Descriptivo a Mostrar en la Vista */
        title: string,
        /** Mensaje Descriptivo a Mostrar en la Vista */
        message: string
    }
}): any => response["status"](code)["setHeader"]("Content-Type","text/html")["send"](Component["Template"]({
    title: meta["title"],
    message: meta["message"],
    version
}));

/** Respuesta Esencial con el Formato Establecido para los Rutadores Locales de la API */
export const ResponseObject = ({response,status,object}:{
    /** Objeto con la Instancia de Respuesta del Servidor Express */
    response: ExpressResponse,
    /** Indicador de Satisfacción de la Respuesta en el Cliente */
    status: boolean,
    /** Objeto con la Respuesta Solicitada por el Cliente en el Servidor */
    object: any
}): any => response["status"](200)["jsonp"]({
    dt: (Date["now"]()),
    rf: (Keyword(8)),
    st: status,
    rs: object
} as ResponseAPI);