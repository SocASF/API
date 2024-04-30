/*
@author LxingA
@version 1.0.0
@project SocASF
@description Definición del Tipo para el Contexto "Global" con los Puntos Finales para el Proyecto
@date 28/04/24 01:00AM
*/
import type Database from "..";
import type Domain from "./domain";

/** Definición del Enumerador para los Tipos de Carga en la Aplicación del Proyecto */
export enum Type {
    "preload" = "3b2a06912804",
    "dns" = "fb7b8c789dd3"
};

/** Definición del Tipo para los Puntos Finales de las Aplicaciones del Proyecto */
interface EndPoint extends Database {
    /** Nombre Identificable Corto del Punto Final para el Proyecto */
    name: string,
    /** Objeto con la Información del Dominio Público Vinculado al Punto Final del Proyecto */
    domain: Domain,
    /** Nombre del Subdominio a Asignar como Sufijo para el Punto Final del Proyecto */
    suffix?: string,
    /** Objeto con los Conceptos Esenciales del Punto Final en Varios Idiomas para el Proyecto */
    translation: {
        /** Descripción Acerca del Propósito del Punto Final en el Proyecto */
        description?: string
    },
    /** Identificador del Tipo de Carga del Punto Final en la Aplicación del Proyecto */
    loader: string | null
};

export default EndPoint;