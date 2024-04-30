/*
@author LxingA
@version 1.0.0
@project SocASF
@description Definición de la Esquema Global de GraphQL para la API
@date 26/04/24 01:00AM
*/
import {mergeTypeDefs,mergeResolvers} from '@graphql-tools/merge';
import {makeExecutableSchema} from '@graphql-tools/schema';
import {loadFilesSync} from '@graphql-tools/load-files';
import {join} from 'path';

/** Definición de los Resolvedores para el Servidor GraphQL */
const GraphQLHandler = mergeResolvers(
    loadFilesSync(
        join(__dirname, "./handler"),
        {
            extensions: [
                "ts",
                "js"
            ],
            ignoreIndex: true
        }
    )
);

/** Definición de los Tipos para el Servidor GraphQL */
const GraphQLType = mergeTypeDefs(
    loadFilesSync(
        join(__dirname, "./types"),
        {
            extensions: [
                "graphql"
            ],
            ignoreIndex: true
        }
    )
);

/** Definición de la Esquema Global con la Fusión de los Resolvedores y Tipos para el Servidor GraphQL */
const GraphQLSchema = makeExecutableSchema({
    typeDefs: GraphQLType,
    resolvers: GraphQLHandler
});

export default GraphQLSchema;