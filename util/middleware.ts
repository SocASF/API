/*
@author LxingA
@version 1.0.0
@project SocASF
@description Definición del Middleware Global para la API
@date 26/04/24 07:30PM
*/
import {AppConfig} from './configuration';
import {ResponseHTML} from './response';
import type {Request,Response,NextFunction} from 'express';

/** Instanciamos la Configuración Global de la Aplicación */
const configuration = (AppConfig());

/** Middleware Esencial para la Verificación de las Cabeceras del Servidor */
export const MiddlewareHeader = (rq:Request,rs:Response,nt:NextFunction): void => {
    let _init_: any = {response:rs,version:configuration["version"]};
    if(rq["header"](configuration["security"]["header"][0])){
        if(/[a-z0-9]{8}\-(([a-z0-9]+)\-){3}[a-z0-9]{12}/["test"](rq["header"](configuration["security"]["header"][0]) ?? "")) nt();
        else ResponseHTML({
            code: 400,
            meta: {
                title: "Identificador de la Aplicación no Valída",
                message: "Lo sentimos, el identificador de la aplicación dado, no es valído"
            },
            ..._init_
        });
    }else ResponseHTML({
        code: 401,
        meta: {
            title: "Cabecera no Definida",
            message: "Lo sentimos, no se envío la cabecera HTTP esencial para el acceso a la API"
        },
        ..._init_
    });
};

/** Middleware Esencial para la Verificación de Seguridad de Acceso al Servidor */
export const MiddlewareSecure = (rq:Request,rs:Response,nt:NextFunction): void => {
    let _init_: any = {response:rs,version:configuration["version"]};
    if(configuration["security"]["method"]["includes"](rq["method"])){
        if(configuration["security"]["origin"]["includes"](rq["header"]("origin") || rq["header"]("referer") || "")) nt();
        else ResponseHTML({
            code: 403,
            meta: {
                title: "No Autorizado",
                message: "Lo sentimos, no estás autorizado para acceder al servidor mediante su origen HTTP"
            },
            ..._init_
        });
    }else ResponseHTML({
        code: 405,
        meta: {
            title: "Método HTTP no Permitido",
            message: "Lo sentimos, el método HTTP de la solicitud, no está permitida"
        },
        ..._init_
    });
};