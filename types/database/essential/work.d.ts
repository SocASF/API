/*
@author LxingA
@version 1.0.0
@project SocASF
@description Definición del Tipo para el Contexto "Essential" con las Experiencias Laborales para el Proyecto
@date 28/04/24 01:00AM
*/
import type {File} from '..';
import type Database from "..";

/** Definición del Tipo para las Experiencias Laborales de los Miembros en el Proyecto */
interface Work extends Database {
    /** Objeto con la Información de la Portada de la Empresa Laboral del Miembro en el Proyecto */
    cover: File,
    /** Nombre de la Empresa en la Experiencia Laboral del Miembro en el Proyecto */
    company: string,
    /** Contenedor con los Nombres Alternos de la Empresa Laboral del Miembro en el Proyecto */
    alternative?: string[],
    /** Contenedor con la Ubicación de la Empresa Laboral del Miembro en el Proyecto (Nombre de Calle con la Colonia, Municipio, Estado y País) */
    location: string[],
    /** Objeto con los Conceptos Esenciales de la Experiencia Laboral del Miembro en Varios Idiomas para el Proyecto */
    translation: {
        /** Nombre del Puesto Laboral del Miembro en la Experiencia Laboral para el Proyecto */
        name: string,
        /** Resumén de la Experiencia Laboral del Miembro Dado para el Proyecto */
        description: string
    },
    /** Fecha de Comienzo del Miembro en la Experiencia Laboral para el Proyecto */
    startAt: string,
    /** Fecha de Finalización del Miembro en la Experiencia Laboral para el Proyecto */
    endAt: string,
    /** Objeto con la Información del Certificado de Capacitación del Miembro en la Empresa Laboral del Proyecto */
    certificate?: File,
    /** Objeto con la Información del Comprobante Laboral del Miembro en la Empresa Laboral del Proyecto */
    proofOfEmployment?: File,
    /** Contenedor con los Objetos con la Información de la Evidencia Laboral del Miembro en la Empresa Laboral para el Proyecto */
    evidence?: File[]
};

export default Work;