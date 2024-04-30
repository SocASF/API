/*
@author LxingA
@version 1.0.0
@project SocASF
@description Definición del Tipo para el Contexto "Global" con los Correos Electrónicos para el Proyecto
@date 28/04/24 01:00AM
*/
import type Database from "..";
import type Domain from "./domain";

/** Definición del Tipo para los Correos Electrónicos de las Aplicaciones del Proyecto */
interface Mail extends Database {
    /** Nombre del Correo Electrónico en el Proyecto */
    name: string,
    /** Objeto con la Información del Dominio Público Vinculado en el Proyecto */
    domain: Domain,
    /** Objeto con los Conceptos Esenciales del Correo Electrónico en Varios Idiomas */
    translation: {
        /** Descripción Acerca del Propósito del Correo Electrónico en el Proyecto */
        description?: string
    }
};

export default Mail;