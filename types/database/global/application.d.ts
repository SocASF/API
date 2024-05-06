/*
@author LxingA
@version 1.0.0
@project SocASF
@description Definición del Tipo para el Contexto "Global" con las Aplicaciones para el Proyecto
@date 28/04/24 01:00AM
*/
import type {File} from '..';
import type Database from "..";
import type EndPoint from "./endpoint";
import type ChangeLog from "../essential/changelog";
import type Project from "./project";

/** Definición del Enumerador de los Tipos de Aplicación para el Proyecto */
export enum Type {
    "web" = "fb67db5d09f3",
    "mobile" = "d45e877bfed5",
    "game" = "9f9cf2dbd065",
    "desktop" = "79b7ed13d2bd",
    "service" = "7c4e2a3d1d4c"
};

/** Definición del Tipo para las Aplicaciones del Proyecto */
interface Application extends Database {
    /** Contenedor con los Recursos Adicionales para la Aplicación del Proyecto */
    asset?: File[],
    /** Indicar sí la Aplicación está Habilitada en el Proyecto */
    active: boolean,
    /** Nombre de la Aplicación Corto para su Identificación en el Proyecto */
    name: string,
    /** Identificador Único (UUID) de la Aplicación en el Exterior del Proyecto */
    key: string,
    /** Objeto con la Información de la Portada de la Aplicación del Proyecto */
    cover: File,
    /** Nombre de la Aplicación para el Proyecto */
    title: string,
    /** Objeto con la Información del Proyecto Asociado a la Aplicación para el Proyecto */
    project: Project,
    /** Contenedor con el Historial de Cambios de la Aplicación en el Proyecto */
    log?: ChangeLog[],
    /** Contenedor con los Objetos con la Información de las Vistas Previas de la Aplicación tras el Historial de Versiones para el Proyecto */
    screenshot?: File[],
    /** Objeto con los Conceptos Esenciales de la Aplicación en Varios Idiomas para el Proyecto */
    translation: {
        /** Frase Típica de la Aplicación para el Proyecto */
        slogan?: string,
        /** Descripción Acerca del Propósito de la Aplicación en el Proyecto */
        description?: string,
        /** Contenedor con las Palabras Claves para el SEO de la Aplicación en el Proyecto */
        keyword?: string[],
        /** Definición mediante un Titulo del cómo se creó la Aplicación en el Contexto del Proyecto */
        builder?: string,
        /** Descripción Acerca del Contexto de Desarrollo de la Aplicación en el Proyecto */
        summary?: string
    },
    /** Identificador del Tipo de Aplicación Vinculada a la Aplicación para el Proyecto */
    type: string
};

export default Application;