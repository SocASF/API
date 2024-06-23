/*
@author LxingA
@version 1.0.0
@project SocASF
@description Definición del Rutador Global para la API
@date 26/04/24 02:00AM
*/
import {Router} from 'express';
import {MiddlewareHeader,MiddlewareSecure} from '../util/middleware';
import Application from './handler/application.router';
import Global from './handler/global.router';

/** Inicialización del Rutador Índice del Servidor */
const Route = (Router());

/** Inicializamos la Ruta para la Obtención de la Información de una Aplicación en el Proyecto de Forma Global */
Route["get"]("/global",[MiddlewareHeader,MiddlewareSecure],(Global));

/** Inicializamos la Ruta para los Mutadores Generales de las Aplicaciones de la API */
Route["post"]("/application",[MiddlewareHeader,MiddlewareSecure],(Application));

export default Route;