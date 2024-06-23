/*
@author LxingA
@version 1.0.0
@project SocASF
@description Definición del Tipo para la Respuesta de la API en la Aplicación
@date 26/04/24 09:00PM
*/

/** Definición del Objeto con el Paginador del Proyecto */
export type ResponsePaginator = {
    /** Contenedor con los Elementos Solicitados en la Solicitud de la API */
    ob: any[],
    /** Total de Elementos Obtenidos desde la Base de Datos */
    tt: number,
    /** Total de Elementos a Mostrar por Pagina en la Solicitud de la API */
    pp: number
};

/** Definición del Objeto de Respuesta Predeterminada para las Mutaciones de GraphQL */
export type GraphQLMutateResponse = {
    /** Estado de la Solicitud en la API para el Cliente */
    status: boolean,
    /** Mensaje Descriptivo Respecto a la Operación Solicitada por el Cliente */
    message: string,
    /** Objeto con la Información Parcial para el Contexto del Cliente */
    context?: any
};

/** Definición del Objeto de la Respuesta de la API */
type ResponseAPI = {
    /** Identificador Único de Referencia */
    rf?: string,
    /** Mensaje Descriptivo de la Respuesta */
    ms?: string,
    /** Objeto con la Respuesta de la API en Formato Paginador */
    rs?: ResponsePaginator,
    /** Tiempo en MS de la Respuesta de la API en la Solicitud */
    dt: number,
    /** Estado Actual de la Solicitud */
    st: boolean
};

export default ResponseAPI;