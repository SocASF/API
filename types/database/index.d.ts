/*
@author LxingA
@version 1.0.0
@project SocASF
@description Definición del Tipo para la Base de Datos del Proyecto
@date 28/04/24 01:00AM
*/
import type ChangeLog from "./essential/changelog";
import type Study from "./essential/study";
import type Work from "./essential/work";
import type Application from "./global/application";
import type Language from "./global/language";
import type Domain from "./global/domain";
import type EndPoint from "./global/endpoint";
import type Mail from "./global/mail";
import type Member from "./global/member";
import type Project from "./global/project";

/** Definición del Tipo para los Recursos Locales de la Base de Datos */
export type File = {
    /** Identificador Único (UUID) del Recurso en la Base de Datos */
    readonly id: string,
    /** Tipo de Almacenamiento del Recurso en la Base de Datos */
    readonly storage: string,
    /** Nombre del Recurso en el Disco Local en la Base de Datos */
    readonly filename_disk: string,
    /** Nombre del Recurso (Original) en Formato Content-Disposition en la Cabecera en la Base de Datos */
    readonly filename_download: string,
    /** Titulo Definido del Recurso en la Base de Datos */
    readonly title: string,
    /** Tipo de MIME del Recurso en la Base de Datos */
    readonly type: string,
    /** Identificador Único (UUID) de la Carpeta Almacenadora del Recurso en la Base de Datos */
    readonly folder: string,
    /** Identificador Único (UUID) del Miembro que Subió el Recurso a la Base de Datos */
    readonly uploaded_by: string,
    /** Fecha de Subida (ISO) del Recurso en la Base de Datos */
    readonly uploaded_on: string,
    /** Identificador Único (UUID) del Miembro que Modificó el Recurso en la Base de Datos */
    readonly modified_by?: string,
    /** Fecha de Modificación (ISO) del Recurso en la Base de Datos */
    readonly modified_on: string,
    /** Tamaño en Bytes del Recurso en la Base de Datos */
    readonly filesize: number,
    /** Anchura Original (px) del Recurso en la Base de Datos */
    readonly width?: number,
    /** Largura Original (px) del Recurso en la Base de Datos */
    readonly height?: number
};

/** Definición de la Esquema para la Instancia de Directus en la Base de Datos */
export type Schema = {
    /** Contenedor con Todos los Idiomas Oficiales del Proyecto en la Base de Datos */
    readonly language: Language[],
    /** Contenedor con Todos los Dominios Públicos del Proyecto en la Base de Datos */
    readonly domain: Domain[],
    /** Contenedor con Todos los Puntos Finales del Proyecto en la Base de Datos */
    readonly endpoint: EndPoint[],
    /** Contenedor con Todos los Correos Electrónicos del Proyecto en la Base de Datos */
    readonly mail: Mail[],
    /** Contenedor con el Historial de Cambios de las Aplicaciones del Proyecto en la Base de Datos */
    readonly changelog: ChangeLog[],
    /** Contenedor con los Estudios de los Miembros del Proyecto en la Base de Datos */
    readonly study: Study[],
    /** Contenedor con las Experiencias Laborales de los Miembros del Proyecto en la Base de Datos */
    readonly work: Work[],
    /** Contenedor con Todos los Miembros Oficiales del Proyecto en la Base de Datos */
    readonly member: Member[],
    /** Contenedor con Todos los Proyectos Internos del Proyecto en la Base de Datos */
    readonly project: Project[],
    /** Contenedor con Todas las Aplicaciones Oficiales del Proyecto en la Base de Datos */
    readonly application: Application[]
};

/** Definición de la Estructura Inicial de la Base de Datos */
interface Database {
    /** Identificador Único (UUID) del Elemento en la Base de Datos */
    readonly identified?: string,
    /** Indicador que Lista en Orden los Elementos de la Base de Datos */
    readonly sort?: any,
    /** Identificador Único (UUID) del Usuario Creador del Elemento en la Base de Datos */
    readonly user_created: string,
    /** Identificador Único (UUID) del Usuario que Modificó el Elemento en la Base de Datos */
    readonly user_updated?: string,
    /** Fecha de Creación (ISO) del Elemento en la Base de Datos */
    readonly date_created: string,
    /** Fecha de Modificación (ISO) del Elemento en la Base de Datos */
    readonly date_updated?: string
};

export default Database;