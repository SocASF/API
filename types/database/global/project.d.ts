/*
@author LxingA
@version 1.0.0
@project SocASF
@description Definición del Tipo para el Contexto "Global" con los Proyectos para el Proyecto
@date 28/04/24 01:00AM
*/
import type {File} from '..';
import type Database from "..";
import type Mail from "./mail";
import type Member from "./member";

/** Definición del Tipo para los Proyectos del Proyecto */
interface Project extends Database {
    /** Nombre del Proyecto en el Proyecto */
    name: string,
    /** Objeto con la Información de la Portada del Proyecto para el Proyecto */
    cover: File,
    /** Objeto con la Información del Correo Electrónico Asociado al Proyecto en el Proyecto */
    email: Mail,
    /** Número de Teléfono de Contacto Público del Proyecto en el Proyecto */
    telephone: number,
    /** Objeto con los Conceptos Esenciales del Proyecto en Varios Idiomas para el Proyecto */
    translation: {
        /** Descripción Acerca del Propósito del Proyecto en el Proyecto */
        description?: string
    },
    /** Contenedor con los Nombres Alternativos del Proyecto para el Proyecto */
    alternative?: string[],
    /** Contenedor con la Ubicación del Proyecto en el Proyecto (Calle, Número Exterior, Colonia, Código Postal, Municipio, Estado, País) */
    location?: string[],
    /** Contenedor con los Miembros Oficiales Involucrados en el Proyecto para el Proyecto */
    member?: Member[],
    /** Contenedor con los Objetos con la Información de los Recursos del Proyecto para el Proyecto */
    resource?: File[],
    /** Contenedor con las Rutas Relativas HTTP de las Redes Sociales del Proyecto para el Proyecto (Facebook, Twitter, Github) */
    social?: string[]
};

export default Project;