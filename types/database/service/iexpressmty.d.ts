/*
@author LxingA
@version 2.0.0
@project SocASF
@description Prototipos en el Ambito "Servicio" para la Aplicación "IExpressMTY" en el Proyecto
@date 07/05/24 11:30PM
*/
import type {File,ManyToAny} from '..';
import type Database from '..';

/** Definición del Objeto para el Prototipo de los Horarios Esenciales para la Aplicación */
export type ScheduleObject = {
    /** Nombre del Icono a Ilustrar en el Horario */
    icon: string,
    /** Título Descriptivo del Horario */
    title: string,
    /** Descripción Acerca del Propósito del Horario */
    description?: string,
    /** Objeto con los Rangos del Horario */
    range: {
        /** Contenedor con el Rango de las Horas para el Horario */
        hour: string[],
        /** Contenedor con el Rango de los Días para el Horario */
        day: string[]
    }
};

/** Prototipo para la Definición de los Horarios Esenciales para la Aplicación */
export interface Schedule extends Database {
    /** Indicar sí el Horario está Habilitado en la Aplicación */
    active: boolean,
    /** Nombre Identificable del Horario en la Aplicación */
    name: string,
    /** Nombre del Icono a Ilustrar en el Horario para la Aplicación */
    icon: string,
    /** Número Inicial de la Hora para el Horario en la Aplicación */
    startHourRange: number,
    /** Número Final de la Hora para el Horario en la Aplicación */
    endHourRange: number,
    /** Número Inicial del Día para el Horario en la Aplicación */
    startDayRange: number,
    /** Número Final del Día para el Horario en la Aplicación */
    endDayRange: number,
    /** Objeto con los Conceptos Esenciales del Horario en Varios Idiomas para la Aplicación */
    translation: {
        /** Titulo a Mostrar del Horario en la Aplicación */
        title: string,
        /** Descripción Acerca del Propósito del Horario en la Aplicación */
        description?: string
    }
};

/** Definición del Prototipo para el Objeto de Respuesta de las Políticas en la Aplicación */
export type PolicyObject = {
    /** Fecha (ISO) de Vigencía en Vigor de la Política en la Aplicación */
    dateAt: string,
    /** Título Descriptivo de la Política en la Aplicación */
    title: string,
    /** Descripción Acerca de la Política en la Aplicación */
    description?: string,
    /** Contenedor con las Reglas de la Política para su Renderizado en el DOM de la Aplicación */
    rule: string[]
};

/** Prototipo para la Definición de la Política de la Aplicación */
export interface Policy extends Database {
    /** Indicar sí la Política está Habilitado en la Aplicación */
    active: boolean,
    /** Nombre Identificable de la Política en la Aplicación */
    name: string,
    /** Fecha de Vigencía (ISO) de la Política en la Aplicación */
    validityAt: string,
    /** Objeto con los Conceptos Esenciales de la Política en Varios Idiomas de la Aplicación */
    translation: {
        /** Título Descriptivo de la Política en la Aplicación */
        title: string,
        /** Descripción del Propósito de la Política en la Aplicación */
        description?: string,
        /** Contenedor con las Reglas Definidas en la Política para la Aplicación */
        rules: string[]
    }
};

/** Prototipo para la Definición de los Materiales para los Productos de la Aplicación */
export interface Material extends Database {
    /** Indicar sí el Material está Habilitado en la Aplicación */
    active: boolean,
    /** Nombre Identificable del Material en la Aplicación */
    name: string,
    /** Precio Base del Material para la Aplicación */
    price: number,
    /** Contenedor con las Variantes del Material para la Aplicación */
    variant?: MaterialVariant[],
    /** Objeto con los Conceptos Esenciales del Material en Varios Idiomas para la Aplicación */
    translation: {
        /** Etiqueta a Mostrar del Material en la Aplicación */
        label: string,
        /** Definición de un Mensaje de Advertencia sobre el Material en la Aplicación */
        message?: string
    }
};

/** Prototipo para la Definición de las Variantes de los Materiales de la Aplicación */
export interface MaterialVariant extends Database {
    /** Indicar sí el Variante del Material está Habilitado en la Aplicación */
    active: boolean,
    /** Nombre Identificable del Variante del Material en la Aplicación */
    name: string,
    /** Precio Base de la Variante del Material en la Aplicación */
    price: number,
    /** Contenedor con las Colecciones Relacionadas a la Variante del Material para la Aplicación */
    extra?: ManyToAny[],
    /** Objeto con los Conceptos Esenciales de la Variante del Material en Varios Idiomas para la Aplicación */
    translation: {
        /** Etiqueta a Mostrar de la Variante de Material en la Aplicación */
        label: string,
        /** Mensaje de Advertencia sobre la Variante en la Aplicación */
        message?: string
    }
};

/** Prototipo para la Definición de los Tipo de Pápel para los Productos de la Aplicación */
export interface Paper extends Database {
    /** Indicar sí el Tipo de Pápel está Habilitado en la Aplicación */
    active: boolean,
    /** Nombre Identificable del Tipo de Pápel en la Aplicación */
    name: string,
    /** Precio Base del Tipo de Pápel en la Aplicación */
    price: number,
    /** Altura del Papel para la Aplicación */
    height: number,
    /** Anchura del Papel para la Aplicación */
    width: number,
    /** Objeto con los Conceptos Esenciales del Tipo de Pápel en Varios Idiomas en la Aplicación */
    translation: {
        /** Etiqueta a Mostrar del Tipo de Pápel en la Aplicación */
        label: string
    }
};

/** Prototipo para la Definición de las Formas para los Productos de la Aplicación */
export interface Shape extends Database {
    /** Indicar sí la Forma está Habilitada en la Aplicación */
    active: boolean,
    /** Nombre Identificable de la Forma en la Aplicación */
    name: string,
    /** Objeto con los Conceptos Esenciales de la Forma en Varios Idiomas para la Aplicación */
    translation: {
        /** Etiqueta a Mostrar de la Forma en la Aplicación */
        label: string
    }
};

/** Prototipo para la Definición de los Tamaños ó Medidas para los Productos de la Aplicación */
export interface Size extends Database {
    /** Indicar sí el Tamaño ó Medida está Habilitado en la Aplicación */
    active: boolean,
    /** Definición de la Altura del Tamaño para la Aplicación */
    height: number,
    /** Definición de la Anchura del Tamaño para la Aplicación */
    width: number
};

/** Prototipo para la Definición de los Colores para los Productos de la Aplicación */
export interface Color extends Database {
    /** Indicar sí el Color está Habilitado en la Aplicación */
    active: boolean,
    /** Nombre Identificable del Color en la Aplicación */
    name: string,
    /** Precio Base del Color en la Aplicación */
    price: number,
    /** Objeto con los Conceptos Esenciales del Color en Varios Idiomas para la Aplicación */
    translation: {
        /** Etiqueta a Mostrar del Color en la Aplicación */
        label: string
    }
};

/** Prototipo para la Definción de los Grosores para los Pápeles de la Aplicación */
export interface Grammage extends Database {
    /** Indicar sí el Grosor del Pápel está Habilitado en la Aplicación */
    active: boolean,
    /** Definición del Entero para el Grosor del Pápel para la Aplicación */
    bulk: number
};

/** Prototipo para la Definición de las Orientaciones para los Productos en la Aplicación */
export interface Orientation extends Database {
    /** Indicar sí la Orientación está Habilitado en la Aplicación */
    active: boolean,
    /** Nombre Identificable de la Orientación en la Aplicación (Z,Y,X) */
    name: string,
    /** Objeto con los Conceptos Esenciales de la Orientación en Varios Idiomas para la Aplicación */
    translation: {
        /** Etiqueta para Mostrar en la Orientación para la Aplicación */
        label: string
    }
};

/** Prototipo para la Definición de los Laminadores para los Productos en la Aplicación */
export interface Laminate extends Database {
    /** Indicar sí el Laminador está Habilitado en la Aplicación */
    active: boolean,
    /** Nombre Identificable del Laminador para la Aplicación */
    name: string,
    /** Precio Base del Laminador para la Aplicación */
    price: number,
    /** Objeto con los Conceptos Esenciales para el Laminador en Varios Idiomas para la Aplicación */
    translation: {
        /** Etiqueta a Mostrar del Laminador en la Aplicación */
        label: string
    }
};

/** Definición del Objeto de Respuesta de la API con la Categoría de la Aplicación */
export type CategoryObject = {
    /** Identificador Único (UUID) de la Portada de Ilustración de la Categoría */
    cover: string,
    /** Nombre de la Categoría como Identificación para la Aplicación (SLUG) */
    name: string,
    /** Color Hexadecimal Asignada a la Categoría para la Aplicación */
    color: string,
    /** Título Descriptivo de la Categoría para la Aplicación */
    title: string,
    /** Descripción Acerca del Propósito de la Categoría para la Aplicación */
    description?: string
};

/** Prototipo para la Definición de las Categorías Esenciales en la Aplicación */
export interface Category extends Database {
    /** Indicar sí la Categoría está Habiliado en la Aplicación */
    active: boolean,
    /** Identificador Único (UUID) de la Portada Ilustrativa de la Categoría en la Aplicación */
    cover: string,
    /** Nombre Identificable de la Categoría en la Aplicación */
    name: string,
    /** Definición del Hexadecimal del Color para la Categoría en la Aplicación */
    color: string,
    /** Objeto con los Conceptos Esenciales de la Categoría en Varios Idiomas para la Aplicación */
    translation: {
        /** Título Descriptivo de la Categoría en la Aplicación */
        title: string,
        /** Descripción Acerca del Propósito de la Categoría en la Aplicación */
        description?: string
    }
};

/** Definición del Objeto para la Respuesta de la API para los Productos en la Aplicación */
export type ProductObject = {
    /** Objeto con las Ilustraciones Esenciales del Producto en la Aplicación */
    image: {
        /** Identificador Único (UUID) de la Ilustración del Producto */
        key: string,
        /** MIME de la Ilustración para el Producto */
        type: string,
        /** Nombre Único Identificable de la Ilustración del Producto */
        name: string
    }[],
    /** Identificador Único del Producto en el Proyecto */
    identified: string,
    /** Título Llamativo Ilustrativo del Producto para la Aplicación */
    title?: string
};

/** Prototipo para la Definición de los Productos para la Aplicación */
export interface Product extends Database {
    /** Indicar sí el Producto está Disponible en la Aplicación */
    active: boolean,
    /** Objeto con la Información de la Categoría Padre para el Producto en la Aplicación */
    category: Category,
    /** Objeto con la Información de la Portada Ilustrativa del Producto en la Aplicación */
    cover: File,
    /** Contenedor con la Galería de Ilustracciones del Producto en la Aplicación */
    gallery: File[],
    /** Total de Popularidad de Adquisición del Producto por los Clientes en la Aplicación */
    populate?: number,
    /** Contenedor con los Atributos Vinculados al Producto para la Aplicación */
    prop: ManyToAny[],
    /** Objeto con los Conceptos Esenciales del Producto en Varios Idiomas para la Aplicación */
    translation: {
        /** Título Llamatio Ilustrativo del Producto en la Aplicación */
        title: string
    }
};

/** Definición del Tipo para el Objeto de Respuesta de la API para la Definición de los Parámetros Esenciales para el Constructor de la Aplicación */
export type ConstructorParams = {
    /** Nombre Identificable del Parámetro para la Entrada de la Aplicación */
    name: string,
    /** Etiqueta Visual para Ilustrar en la Entrada de la Aplicación */
    label: string,
    /** Contenedor con los Valores de la Entrada para la Aplicación */
    value: {
        /** Identificador Único del Elemento del Valor para la Entrada */
        key: string,
        /** Etiqueta Visual a Mostrar en la Entrada para el Valor Actual */
        label: string,
        /** Definición de Datos Adicionales para la Entrada en la Aplicación */
        extra?: any
    }[],
    /** Contenedor con las Entradas Extras Relacionadas al Contexto de la Entrada Actual para la Aplicación */
    extra?: ConstructorParams[]
};