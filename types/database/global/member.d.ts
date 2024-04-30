/*
@author LxingA
@version 1.0.0
@project SocASF
@description Definición del Tipo para el Contexto "Global" con los Miembros Oficiales para el Proyecto
@date 28/04/24 01:00AM
*/
import type {File} from '..';
import type Database from "..";
import type Mail from "./mail";
import type Study from "../essential/study";
import type Work from "../essential/work";

/** Definición del Tipo para los Miembros Oficiales del Proyecto */
interface Member extends Database {
    /** Indicar sí el Miembro Oficial está Habilitado en el Proyecto */
    active: boolean,
    /** Objeto con la Información del Avatar del Miembro Oficial en el Proyecto */
    avatar: File,
    /** Contenedor con el Nombre Completo del Miembro Oficial en el Proyecto (Primer Nombre, Segundo Nombre, Apellido Paterno, Apellido Materno) */
    name: string[],
    /** Fecha de Nacimiento (ISO) del Miembro Oficial en el Proyecto */
    birthday: string,
    /** Objeto con la Información del Correo Electrónico Asociado al Miembro Oficial en el Proyecto */
    email: Mail,
    /** Objeto con los Conceptos Esenciales del Miembro Oficial para Varios Idiomas para el Proyecto */
    translation: {
        /** Titulo Profesional del Miembro Oficial en el Proyecto */
        title?: string,
        /** Resumén Descriptivo en el Concepto Profesional del Miembro Oficial en el Proyecto */
        summary?: string
    },
    /** Contenedor con los Nombres Alternativos del Miembro Oficial en el Proyecto */
    alternative?: string[],
    /** Contenedor con las Experiencias Laborales del Miembro Oficial en el Proyecto */
    job?: Work[],
    /** Contenedor con los Estudios Académicos del Miembro Oficial en el Proyecto */
    study?: Study[],
    /** Objeto con la Información de la Foto de Perfil Profesional del Miembro Oficial en el Proyecto */
    public?: File,
    /** Contenedor con los Apodos Oficiales del Miembro Oficial en el Proyecto */
    nick?: string[],
    /** Contenedor con los Números de Teléfono del Miembro Oficial en el Proyecto */
    telephone?: string[]
};

export default Member;