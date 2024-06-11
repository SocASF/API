/*
@author LxingA
@version 2.0.0
@project SocASF
@description Prototipos en el Ambito "Servicio" para la Aplicación "CKVideoPub" en el Proyecto
@date 11/06/24 01:00AM
*/
import type {File} from '..';
import type Database from '..';

/** Definición del Objeto de Respuesta de un Juego para la Aplicación */
export type GameObject = {
    /** Titulo del Juego en la Aplicación */
    title: string,
    /** Contenedor con las Ilustraciones del Juego para la Aplicación */
    illustration: {
        /** Tipo de MIME de la Ilustración para el DOM */
        type: string,
        /** Identificador Único (UUID) de la Ilustración para la Aplicación */
        key: string,
        /** Nombre Identificable Corto de la Ilustración para la Aplicación */
        name: string
    }[],
    /** Identificador Único (UUID) del Juego para la Aplicación */
    key: string,
    /** Descripción Acerca del Propósito del Juego en la Aplicación */
    description?: string
};

/** Definición del Prototipo para los Juegos de la Aplicación */
export interface Game extends Database {
    /** Indicar sí el Juego está Habilitado en la Aplicación */
    active: boolean,
    /** Objeto con la Información de la Portada Principal del Juego en la Aplicación */
    cover: File,
    /** Objeto con la Información del Ícono Principal del Juego en la Aplicación */
    icon?: File,
    /** Nombre Original del Juego para la Aplicación */
    name: string,
    /** Puntuación de Calificación de Parte del Desarrollador Respecto al Juego en la Aplicación */
    score: number,
    /** Objeto con los Conceptos Esenciales del Juego en Varios Idiomas para la Aplicación */
    translation: {
        /** Descripción Acerca del Propósito del Juego en la Aplicación */
        description?: string
    }
};