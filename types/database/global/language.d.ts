/*
@author LxingA
@version 1.0.0
@project SocASF
@description Definición del Tipo para el Contexto "Global" con los Idiomas Oficiales para el Proyecto
@date 28/04/24 01:00AM
*/
import type Database from "..";

/** Definición del Tipo para los Idiomas Oficiales de las Aplicaciones del Proyecto */
interface Language extends Database {
    /** Indicar sí el Idioma Oficial está Habilitado en el Proyecto */
    active: boolean,
    /** Nombre del Idioma en su País de Origen */
    label: string,
    /** Descripción del Propósito del Idioma Oficial en el Proyecto */
    description?: string,
    /** Identificador en 2 Dígitos del Idioma Oficial en el Proyecto */
    iso: string
};

export default Language;