/*
@author LxingA
@version 2.0.0
@project SocASF
@description Handlers para la Aplicación "CKVideoPub" del Proyecto
@date 10/06/24 07:00PM
*/
import {AppConfig} from '../../util/configuration';
import {GraphQLCatch,GraphQLResponse} from '../../util/graphql';
import {GraphQLJSON} from 'graphql-type-json';
import Database from '../../bin/database';
import type {Game,GameObject} from '../../types/database/service/ckvideopub';
import type GraphQLContext from '../../types/context';
import type Response from '../../types/response';

/** Objeto con la Información Esencial de la API */
const configuration = (AppConfig());

/** Objeto con los Handlers Esenciales para la Aplicación */
export default {
    /** Integración del Escalar JSON para el Contexto */
    JSON: GraphQLJSON,
    /** Contenedor con los Tipos de Handlers para GraphQL */
    Query: {
        /** Definición del Objeto con la Información del Juego para la Aplicación */
        async f544e1445(_,{}:{

        },{language}:GraphQLContext): Promise<Response | void> {
            const _db_ = (new Database(language));
            try{
                const _instance_: Game[] = (await _db_["get"]("ckpGame",{
                    fields: [
                        "identified",
                        "name",
                        {
                            cover: [
                                "id",
                                "filename_download",
                                "type"
                            ],
                            icon: [
                                "id",
                                "filename_download",
                                "type"
                            ],
                            translation: [
                                "description"
                            ]
                        }
                    ],
                    filter: {
                        active: {
                            _eq: true
                        }
                    }
                }))!;
                return (GraphQLResponse({
                    tt: (_instance_["length"]),
                    pp: 1,
                    ob: (_instance_["map"](({name,cover,icon,translation,identified}) => {
                        const illustration = [
                            {
                                name: cover["filename_download"]["split"](".")[0],
                                type: cover["type"],
                                key: cover["id"]
                            }
                        ];if(icon) illustration["push"]({
                            name: icon["filename_download"]["split"](".")[0],
                            type: icon["type"],
                            key: icon["id"]
                        });
                        return ({
                            title: name,
                            illustration,
                            key: identified,
                            description: translation[0]["description"]
                        } as GameObject);
                    }))
                }));
            }catch(e){
                GraphQLCatch(e);
            }
        }
    }
};