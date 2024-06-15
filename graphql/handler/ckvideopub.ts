/*
@author LxingA
@version 2.0.0
@project SocASF
@description Handlers para la Aplicación "CKVideoPub" del Proyecto
@date 10/06/24 07:00PM
*/
import {AppConfig,BunnyCDNStream} from '../../util/configuration';
import {GraphQLCatch,GraphQLResponse} from '../../util/graphql';
import {GraphQLJSON} from 'graphql-type-json';
import {createHash} from 'crypto';
import Database from '../../bin/database';
import type {Game,GameObject,Video,VideoObject} from '../../types/database/service/ckvideopub';
import type GraphQLContext from '../../types/context';
import type Response from '../../types/response';

/** Objeto con la Información Esencial de la API */
const configuration = (AppConfig());

/** Objeto con la Información Esencial de BunnyCDN Stream */
const bunny = (BunnyCDNStream());

/** Objeto con los Handlers Esenciales para la Aplicación */
export default {
    /** Integración del Escalar JSON para el Contexto */
    JSON: GraphQLJSON,
    /** Contenedor con los Tipos de Handlers para GraphQL */
    Query: {
        /** Definición del Objeto con la Información del Juego para la Aplicación */
        async f544e1445(_,{ac10fa519}:{
            /** Objeto con la Información del Paginador para la Respuesta de la API */
            ac10fa519?: {
                /** Total de Elementos a Mostrar por Página para la Aplicación */
                a3f53e411: number,
                /** Página Actual en la Vista de la Aplicación */
                af0afffd2: number
            }
        },{language}:GraphQLContext): Promise<Response | void> {
            const _db_ = (new Database(language));
            let _args_: any = {};
            if(ac10fa519){
                _args_["limit"] = (ac10fa519["a3f53e411"]);
                _args_["page"] = (ac10fa519["af0afffd2"]);
            }try{
                const _games_: Game[] = (await _db_["get"]("ckpGame",{
                    fields: []
                }))!;
                const _instance_: Game[] = (await _db_["get"]("ckpGame",{
                    fields: [
                        "active",
                        "identified",
                        "name",
                        "date_created",
                        "score",
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
                            background: [
                                "id",
                                "filename_download",
                                "type"
                            ],
                            translation: [
                                "description"
                            ]
                        }
                    ],
                    ..._args_
                }))!;
                return (GraphQLResponse({
                    tt: (_games_["length"]),
                    pp: (Math["ceil"](_games_["length"] / (ac10fa519?.a3f53e411 ?? 1))),
                    ob: (_instance_["map"](({name,cover,icon,translation,identified,date_created,score,active,background}) => {
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
                        });if(background) illustration["push"]({
                            name: background["filename_download"]["split"](".")[0],
                            type: background["type"],
                            key: background["id"]
                        });
                        return ({
                            title: name,
                            illustration,
                            key: identified,
                            description: translation[0]["description"],
                            createAt: date_created,
                            populate: score,
                            available: active
                        } as GameObject);
                    }))
                }));
            }catch(e){
                GraphQLCatch(e);
            }
        },
        /** Definición del Objeto con la Información de los Vídeos para la Aplicación */
        async fbd45e939(_,{ad73b976c,ac10fa519,a4ee44f99,a0e95a8b1,e10794ae = false}:{
            /** Identificador Único (UUID) del Juego Asociado al Vídeo */
            ad73b976c: string,
            /** Objeto con el Paginador para la Respuesta de la Solicitud de los Vídeos */
            ac10fa519?: {
                /** Total de Elementos a Mostrar por Página */
                a3f53e411: number,
                /** Número de Página Actual desde la Aplicación */
                af0afffd2: number
            },
            /** Identificador Único (UUID) del Vídeo Actual para la Respuesta */
            a4ee44f99?: string,
            /** Identificador Único (UUID) del Personaje Actual para el Filtro en la Respuesta */
            a0e95a8b1?: string,
            /** Indica sí desde la Aplicación se está Solicitando desde el Modo Sugerido para la Respuesta */
            e10794ae: boolean
        },{language}:GraphQLContext): Promise<Response | void> {
            const _db_ = (new Database(language));
            let _args_: any = {};
            let _filter_: any = {};
            if(ac10fa519){
                _args_["limit"] = (ac10fa519["a3f53e411"]);
                _args_["page"] = (ac10fa519["af0afffd2"]);
            }if(a0e95a8b1) _filter_["character"] = {
                identified: {
                    _eq: a0e95a8b1
                }
            };try{
                const _video_: any[] = a4ee44f99 ? [] : (await _db_["get"]("ckpVideo",{
                    fields: [],
                    filter: {
                        game: {
                            identified: {
                                _eq: ad73b976c
                            }
                        },..._filter_
                    }
                }))!;
                const _instance_: Video[] = (await _db_["get"]("ckpVideo",{
                    fields: [
                        "date_created",
                        "identified",
                        "key",
                        {
                            cover: [
                                "id"
                            ],
                            translation: [
                                "title",
                                "description"
                            ],
                            character: [
                                "identified",
                                "name",
                                {
                                    translation: [
                                        "description"
                                    ],
                                    cover: [
                                        "filename_download",
                                        "id"
                                    ],
                                    background: [
                                        "filename_download",
                                        "id"
                                    ],
                                    icon: [
                                        "filename_download",
                                        "id"
                                    ]
                                }
                            ]
                        }
                    ],
                    filter: {
                        game: {
                            identified: {
                                _eq: ad73b976c
                            }
                        },
                        ...(a4ee44f99 ? {
                            identified: (a0e95a8b1 ? {
                                _neq: a4ee44f99
                            } : (e10794ae ? {
                                _neq: a4ee44f99
                            } : {
                                _eq: a4ee44f99
                            }))
                        } : {}),..._filter_
                    },
                    ..._args_
                }))!;
                const _mutated_: VideoObject[] = [];
                (await Promise["all"](
                    (_instance_["map"](async({cover,translation,identified,character,key,date_created}) => {
                        const _bcdn_ = (await (await fetch(`https://video.bunnycdn.com/library/${bunny["ckvideopub"]["container"]["libraryID"]}/videos/${key}`,{
                            cache: "force-cache",
                            headers: {
                                Accept: "application/json",
                                AccessKey: bunny["ckvideopub"]["container"]["accessKey"]
                            }
                        }))["json"]());
                        const _timer_: number = (Math["floor"]((Date["now"]()) / 1000) + 3600);
                        let _character_: any = {};
                        if(character){
                            const _characterIllustration_ = [
                                {
                                    name: (character["cover"]["filename_download"]["split"](".")[0]),
                                    key: (character["cover"]["id"])
                                }
                            ];
                            if(character["background"]) _characterIllustration_["push"]({
                                name: (character["background"]["filename_download"]["split"](".")[0]),
                                key: (character["background"]["id"])
                            });
                            if(character["icon"]) _characterIllustration_["push"]({
                                name: (character["icon"]["filename_download"]["split"](".")[0]),
                                key: (character["icon"]["id"])
                            });
                            _character_["label"] = (character["name"]);
                            _character_["description"] = (character["translation"][0]["description"]);
                            _character_["illustration"] = _characterIllustration_;
                            _character_["key"] = (character["identified"]);
                        }_mutated_["push"](({
                            thumbnail: cover["id"],
                            title: translation[0]["title"],
                            description: translation[0]["description"],
                            key: identified,
                            character: (character ? _character_ : undefined),
                            view: _bcdn_["views"],
                            endpoint: `https://iframe.mediadelivery.net/embed/${_bcdn_["videoLibraryId"]}/${_bcdn_["guid"]}?token=${createHash("sha256")["update"](`${bunny["ckvideopub"]["container"]["secretKey"]}${key}${_timer_}`)["digest"]("hex")}&expires=${_timer_}&autoplay=false&loop=false&muted=false&preload=false&responsive=true`,
                            createAt: date_created
                        } as VideoObject));
                    }))
                ));
                return (GraphQLResponse({
                    tt: (_video_["length"]),
                    pp: (Math["ceil"](_video_["length"] / Number(ac10fa519?.a3f53e411 ?? 1))),
                    ob: _mutated_
                }));
            }catch(e){
                GraphQLCatch(e);
            }
        }
    }
};