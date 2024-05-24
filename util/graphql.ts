/*
@author LxingA
@version 2.0.0
@project SocASF
@description Utilidades Esenciales para GraphQL en la Aplicación
@date 08/05/24 06:30PM
*/
import {Keyword} from '../util/random';
import {GraphQLError} from 'graphql';
import type {ResponsePaginator} from '../types/response';
import type Response from '../types/response';

/** Definición del Error Predeterminado para los Handlers de GraphQL */
export const GraphQLCatch = (message:any): void => {
    throw new GraphQLError("SCGraphQLUnknownErrorFetched");
};

/** Definición de la Respuesta Predeterminada para los Handlers de GraphQL */
export const GraphQLResponse = (paginator:ResponsePaginator): Response => ({
    rf: Keyword(8),
    rs: paginator,
    dt: (Date["now"]()),
    st: true
});