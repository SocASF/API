/*
@author LxingA
@version 2.0.0
@project SocASF
@description Definición del Tipo para el Contexto de GraphQL en la Aplicación
@date 07/05/24 03:00AM
*/

/** Definición del Prototipo para el Contexto de GraphQL en la Aplicación */
type GraphQLContext = {
    /** Definición del Contexto del Idioma para la API */
    language: string,
    /** Identificador Único de la Aplicación Currente */
    appID: string
};

export default GraphQLContext;