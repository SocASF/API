/*
@author LxingA
@version 1.0.0
@project SocASF
@description Definición del Tipo para el Contexto "Global" con los Dominios Públicos para el Proyecto
@date 28/04/24 01:00AM
*/
import type Database from "..";

/** Definición del Enumerador de los Proveedores de los Dominios Públicos */
export enum Provider {
    "CloudFlare" = "86ed40a09085",
    "Google" = "34725045a6a5",
    "Microsoft" = "86715fe4e7ab",
    "Hostinger" = "3d3bc154b229",
    "Akky" = "283df15d9c90",
    "Hostgator" = "4dee05648a27"
};

/** Definición del Tipo para los Dominios Públicos de las Aplicaciones del Proyecto */
interface Domain extends Database {
    /** Indicar sí el Dominio Público está Habilitado en el Proyecto */
    active: boolean,
    /** Nombre Corto Identificable del Dominio Público para el Proyecto */
    name: string,
    /** Dominio en Formato FQDN para el Proyecto */
    extension: string,
    /** Objeto con los Conceptos Esenciales del Dominio Público en Varios Idiomas para el Proyecto */
    translation: {
        /** Descripción Acerca del Propósito del Dominio Público en el Proyecto */
        description?: string
    },
    /** Fecha de Registro (ISO) del Dominio Público en el ICANN para el Proyecto */
    register: string,
    /** Identificador del Proveedor Vinculado al Dominio Público para el Proyecto */
    provider?: string
};

export default Domain;