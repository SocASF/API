/*
@author LxingA
@version 1.0.0
@project SocASF
@description Definición del Rutador Global para la API
@date 26/04/24 02:00AM
*/
import Engine from 'elysia';
import Middleware,{Security} from '../util/middleware';
import ContextGlobal from './handler/global.router';

/** Definición del Contexto para el Rutador de la Aplicación */
const Router = (new Engine())["onBeforeHandle"](
    ({headers,set}) => Middleware({headers,set})
)["onRequest"](
    ({request,set}) => Security(request,set)
)["group"](
    "/global", application => ContextGlobal(application)
);

export default Router;