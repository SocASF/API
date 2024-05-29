/*
@author LxingA
@version 1.0.0
@project SocASF
@description Integración de Apollo GraphQL como Servidor GraphQL del Servidor
@date 28/05/24 10:00PM
*/
import {ApolloServer} from '@apollo/server';
import {ApolloServerPluginInlineTraceDisabled,ApolloServerPluginSchemaReportingDisabled,ApolloServerPluginUsageReportingDisabled} from '@apollo/server/plugin/disabled';
import {ApolloServerPluginLandingPageProductionDefault} from '@apollo/server/plugin/landingPage/default';
import GraphQLSchema from '../graphql';
import type GraphQLContext from '../types/context';

/** Instancia de GraphQL Server para el Servidor */
const GraphQL = (new ApolloServer<GraphQLContext>({
    csrfPrevention: true,
    includeStacktraceInErrorResponses: false,
    status400ForVariableCoercionErrors: true,
    cache: "bounded",
    schema: GraphQLSchema,
    persistedQueries: {
        ttl: 3600
    },
    plugins: [
        ApolloServerPluginInlineTraceDisabled(),
        ApolloServerPluginSchemaReportingDisabled(),
        ApolloServerPluginUsageReportingDisabled(),
        ApolloServerPluginLandingPageProductionDefault({
            footer: false
        })
    ]
}));

export default GraphQL;