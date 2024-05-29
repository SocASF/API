/*
@author LxingA
@version 1.0.0
@project SocASF
@description Inicialización de la API
@date 26/04/24 12:00AM
*/
import {AppConfig} from './util/configuration';
import {HTTP,Server} from './main';
import {expressMiddleware} from '@apollo/server/express4';
import {Component} from './util/html';
import {MiddlewareHeader,MiddlewareSecure} from './util/middleware';
import GraphQLServer from './bin/graphql';
import LocalRouter from './router';
import type {Response} from 'express';
import type GraphQLContext from './types/context';

/** Instanciamos la Configuración Global de la Aplicación */
const configuration = (AppConfig());

/** Inicialización de la API en el Contexto del Servidor */
(async() => {
    Server["use"]("/",(LocalRouter));
    (await GraphQLServer["start"]());
    Server["use"]("/graphql",[MiddlewareHeader,MiddlewareSecure],(expressMiddleware(GraphQLServer,{
        context: (async({req}) => {
            return ({
                language: (req["header"](configuration["security"]["header"][1]) ?? "es")
            } as GraphQLContext);
        })
    })));
    Server["all"]("*",((_:any,rs:Response) => {
        rs["status"](200)["setHeader"]("Content-Type","text/html")["send"](Component["Template"]({
            version: (configuration["version"])
        }));
    }));
    HTTP["listen"](configuration["server"]["port"]);
})();