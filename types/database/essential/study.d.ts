/*
@author LxingA
@version 1.0.0
@project SocASF
@description Definición del Tipo para el Contexto "Essential" con los Estudios para el Proyecto
@date 28/04/24 01:00AM
*/
import type {File} from '..';
import type Database from '..';

/** Definición del Enumerador con el Tipo de Estudio del Miembro para el Proyecto */
export enum Type {
    "Preescolar" = "18d51b49fa4d",
    "Primaria" = "5977fb8c6f0c",
    "Secundaria" = "bd5ad94318d9",
    "Preparatoria Técnica" = "84691c07e091",
    "Preparatoria Normal" = "55ac47762f39",
    "En Línea" = "8f3fa3dee4b7"
};

/** Definición del Tipo para los Estudios de los Miembros en el Proyecto */
interface Study extends Database {
    /** Objeto con la Información de la Portada de la Institución del Estudio del Miembro en el Proyecto */
    cover: File,
    /** Nombre de la Institución del Miembro en el Proyecto */
    name: string,
    /** Identificador del Registro de la Institución en el Gobierno para el Proyecto */
    key: string,
    /** Objeto con la Información del Certificado de Graduación del Miembro en el Proyecto */
    certificate: File,
    /** Fecha de Comienzo (ISO) del Miembro en la Institución del Estudio para el Proyecto */
    startAt: string,
    /** Fecha de Finalización (ISO) del Miembro en la Institución del Estudio para el Proyecto */
    endAt: string,
    /** Contenedor con la Ubicación de la Institución del Estudio del Miembro para el Proyecto */
    location: string[],
    /** Identificador Único para la Definición del Tipo de Estudio del Miembro en el Proyecto */
    type: string
};

export default Study;