/*
@author LxingA
@version 1.0.0
@project SocASF
@description Definición del Tipo para el Contexto "Essential" con el Historial de Cambios para el Proyecto
@date 28/04/24 01:00AM
*/
import type Database from "..";

/** Definición del Tipo para los Dominios Públicos del Historial de Cambios de las Aplicaciones del Proyecto */
interface ChangeLog extends Database {
    /** Versión Actual de la Aplicación del Proyecto */
    name: string,
    /** Fecha de Publicación de la Versión en la Aplicación del Proyecto */
    date: string,
    /** Objeto con los Conceptos Esenciales del Historiador de Versiones en Varios Idiomas para el Proyecto */
    translation: {
        /** Mensaje Predeterminado como Descripción Inicial de la Versión de la Aplicación en el Proyecto */
        summary?: string,
        /** Contenedor con los Añadidos en el Historial de Cambios de la Aplicación para el Proyecto */
        added?: string[],
        /** Contenedor con las Correcciones en el Historial de Cambios de la Aplicación para el Proyecto */
        fixed?: string[],
        /** Contenedor con los Cambios en el Historial de Cambios de la Aplicación para el Proyecto */
        changed?: string[],
        /** Contenedor con los Removidos en el Historial de Cambios de la Aplicación para el Proyecto */
        removed?: string[],
        /** Contenedor con las Traducciones en el Historial de Cambios de la Aplicación para el Proyecto */
        translated?: string[]
    }
};

export default ChangeLog;