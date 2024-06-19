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
    description?: string,
    /** Fecha de Añadición del Juego en la Aplicación */
    createAt: string,
    /** Calificación General del Administrador en el Juego para la Aplicación */
    populate: number,
    /** Indicador sí el Juego está Disponible para su Acceso a la Aplicación */
    available: boolean,
    /** Total de Vídeos Publicados del Juego Currente para la Aplicación */
    videos: number
};

/** Definición del Prototipo para los Juegos de la Aplicación */
export interface Game extends Database {
    /** Indicar sí el Juego está Habilitado en la Aplicación */
    active: boolean,
    /** Objeto con la Información de la Portada Principal del Juego en la Aplicación */
    cover: File,
    /** Objeto con la Información del Ícono Principal del Juego en la Aplicación */
    icon?: File,
    /** Objecto con la Información del Fondo de Pantalla Principal del Juego en la Aplicación */
    background?: File,
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

/** Definición del Objeto de Respuesta de un Personaje para la Aplicación */
export type CharacterObject = {
    /** Etiqueta con el Nombre del Personaje para la Aplicación */
    label: string,
    /** Descripción Acerca del Personaje en el Vídeo para la Aplicación */
    description?: string,
    /** Contenedor con las Ilustracciones del Personaje para la Aplicación */
    illustration: {
        /** Nombre Corto Identificable de la Ilustración para la Aplicación */
        name: string,
        /** Identificador Único (UUID) de la Ilustración en la Base de Datos para la Aplicación */
        key: string
    }[],
    /** Identificador Único (UUID) del Personaje para la Aplicación */
    key: string
};

/** Definición del Prototipo para los Personajes de los Vídeos de la Aplicación */
export interface Character extends Database {
    /** Nombre del Personaje Original para el Vídeo en la Aplicación */
    name: string,
    /** Objeto con la Información de la Portada Original del Personaje para el Vídeo de la Aplicación */
    cover: File,
    /** Objeto con la Información del Fondo de Pantalla Original del Personaje para el Vídeo en la Aplicación */
    background?: File,
    /** Objeto con la Información del Icono Original del Personaje para el Vídeo en la Aplicación */
    icon?: File,
    /** Calificación General del Personaje en Opinión del Autor de la Aplicación */
    score: number,
    /** Objeto con los Conceptos Esenciales del Personaje en Varios Idiomas para la Aplicación */
    translation: {
        /** Descripción Acerca del Propósito del Personaje en la Aplicación */
        description?: string
    }
};

/** Definición del Objeto de Respuesta de un Vídeo para la Aplicación */
export type VideoObject = {
    /** Identificador Único (UUID) de la Miniatura del Vídeo para la Aplicación */
    thumbnail: string,
    /** Titulo Descriptivo del Vídeo para la Aplicación */
    title: string,
    /** Descripción Acerca del Propósito del Vídeo para la Aplicación */
    description?: string,
    /** Identificador Único (UUID) del Vídeo Actual para la Aplicación */
    key: string,
    /** Objeto con la Información del Personaje Vinculado al Vídeo para la Aplicación */
    character?: CharacterObject,
    /** Cantidad de Visitas del Vídeo en la Aplicación */
    view: number,
    /** Ruta Absoluta HTTP del Punto Final para el Acceso al Vídeo Incrustado para la Aplicación */
    endpoint: string,
    /** Fecha de Creación del Vídeo en la Base de Datos de la Aplicación */
    createAt: string
};

/** Definición del Prototipo para los Vídeos de la Aplicación */
export interface Video extends Database {
    /** Objeto con la Información de la Portada Principal del Vídeo para la Aplicación */
    cover: File,
    /** Identificador Único (UUID) del Vídeo Ubicado en BunnyCDN para la Aplicación */
    key: string,
    /** Objeto con la Información del Juego Asociado al Vídeo para la Aplicación */
    game: Game,
    /** Objeto con la Información del Personaje Asociado al Vídeo para la Aplicación */
    character?: Character,
    /** Objeto con los Conceptos Esenciales del Vídeo en Varios Idiomas para la Aplicación */
    translation: {
        /** Titulo Descriptivo del Vídeo en la Aplicación */
        title: string,
        /** Descripción Acerca del Propósito del Vídeo en la Aplicación */
        description?: string
    }
};