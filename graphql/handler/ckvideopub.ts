/*
@author LxingA
@version 2.0.0
@project SocASF
@description Handlers para la Aplicación "CKVideoPub" del Proyecto
@date 10/06/24 07:00PM
*/
import {BunnyCDNStream} from '../../util/configuration';
import {GraphQLCatch,GraphQLResponse} from '../../util/graphql';
import {GraphQLJSON} from 'graphql-type-json';
import {createHash} from 'crypto';
import Database from '../../bin/database';
import type {Game,GameObject,Video,VideoObject,Comment,CommentObject} from '../../types/database/service/ckvideopub';
import type {GraphQLMutateResponse} from '../../types/response';
import type GraphQLContext from '../../types/context';
import type Response from '../../types/response';

/** Objeto con la Información Esencial de BunnyCDN Stream */
const bunny = (BunnyCDNStream());

/** Objeto con los Handlers Esenciales para la Aplicación */
export default {
    /** Integración del Escalar JSON para el Contexto */
    JSON: GraphQLJSON,
    /** Contenedor con los Tipos de Handlers Mutadores para GraphQL */
    Mutation: {
        /** Definición del Mutador para la Alteración de los Me Gusta de un Vídeo de la Aplicación */
        async fd38f7f3e(_,{a4ee44f99,a994efdc3}:{
            /** Identificador Único (UUID) del Vídeo para su Mutación en la Base de Datos */
            a4ee44f99: string,
            /** Me Gusta Actual del Vídeo desde el Cliente para la Mutación de la Solicitud */
            a994efdc3: number
        },{language}:GraphQLContext): Promise<GraphQLMutateResponse> {
            const _db_ = (new Database(language));
            try{
                const {like}: Video = (await _db_["updateOne"]("ckpVideo",a4ee44f99,{
                    like: (a994efdc3 + 1)
                })) as any;
                return ({
                    status: true,
                    message: "Se ha actualizado con éxito la estádistica en el vídeo solicitado",
                    context: {
                        newLikedContext: like
                    }
                });
            }catch(e){
                return ({
                    status: false,
                    message: (e as any)
                });
            }
        },
        /** Mutador para la Creación de un Comentario de un Vídeo para la Aplicación */
        async fd613979c(_,{a7fa34be8,ae08f6691,c55b1270}:{
            /** Identificador Único del Vídeo Actual para el Comentario */
            a7fa34be8: string,
            /** Objeto con los Valores Definidos por el Cliente para el Comentario */
            ae08f6691: {
                /** Nombre del Usuario que Publicará el Comentario */
                name: string,
                /** Mensaje Definido por el Usuario desde el Cliente para el Comentario */
                message: string
            },
            /** Identificación Única (UUID) del Avatar para la Inyección en el Comentario */
            c55b1270?: string
        },{language}:GraphQLContext): Promise<GraphQLMutateResponse> {
            const _instance_ = (new Database(language))["getClient"]();
            const {createItem} = (await import("@directus/sdk"));
            (await _instance_["request"](createItem("ckpComment",({
                name: ae08f6691["name"],
                message: ae08f6691["message"],
                video: (a7fa34be8 as any),
                avatar: (c55b1270 as any)
            }))));
            try{
                return ({
                    status: true,
                    message: "Se ha creado con éxito el comentario"
                });
            }catch(e){
                return ({
                    status: false,
                    message: (e as any)
                });
            }
        }
    },
    /** Contenedor con los Tipos de Handlers para GraphQL */
    Query: {
        /** Definición del Objeto con la Información del Juego para la Aplicación */
        async f544e1445(_,{ac10fa519,a7fc45f1d}:{
            /** Objeto con la Información del Paginador para la Respuesta de la API */
            ac10fa519?: {
                /** Total de Elementos a Mostrar por Página para la Aplicación */
                a3f53e411: number,
                /** Página Actual en la Vista de la Aplicación */
                af0afffd2: number
            },
            /** Identificador Único (UUID) del Filtro a Aplicar en el Contexto Actual */
            a7fc45f1d?: string
        },{language}:GraphQLContext): Promise<Response | void> {
            const _db_ = (new Database(language));
            let _args_: any = {};
            let _ftx_: any = {};
            if(ac10fa519){
                _args_["limit"] = (ac10fa519["a3f53e411"]);
                _args_["page"] = (ac10fa519["af0afffd2"]);
            }if(a7fc45f1d)switch(a7fc45f1d){
                case "92499353-6816-45da-b27f-ac8af43ad019":
                    _ftx_["sort"] = ["name"];
                break;
                case "055457b5-41ff-4cc6-9535-b71ab7030623":
                    _ftx_["sort"] = ["-date_created"];
                break;
                case "24f3eb68-f4a1-4c79-87f8-231d6a1b6648":
                    _ftx_["sort"] = ["-score"];
                break;
            };try{
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
                        "genre",
                        "platform",
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
                    ..._args_,
                    ..._ftx_
                }))!;
                let _container_: GameObject[] = [];
                (await Promise["all"](
                    (_instance_["map"](async({name,cover,icon,translation,identified,date_created,score,active,background,genre,platform},iterator) => {
                        const category: GameObject["category"] = [];
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
                        const _video_: Video[] = (await _db_["get"]("ckpVideo",{
                            fields: [],
                            filter: {
                                game: {
                                    identified
                                }
                            }
                        }))!;if(platform) category["push"]({
                            name: "platform",
                            value: platform
                        });if(genre) category["push"]({
                            name: "genre",
                            value: genre
                        });
                        _container_[iterator] = ({
                            title: name,
                            illustration,
                            key: identified,
                            description: translation[0]["description"],
                            createAt: date_created,
                            populate: score,
                            available: active,
                            videos: _video_["length"],
                            category
                        } as GameObject);
                    }))
                ));
                return (GraphQLResponse({
                    tt: (_games_["length"]),
                    pp: (Math["ceil"](_games_["length"] / (ac10fa519?.a3f53e411 ?? 1))),
                    ob: (_container_)
                }));
            }catch(e){
                GraphQLCatch(e);
            }
        },
        /** Definición del Objeto con la Información de los Vídeos para la Aplicación */
        async fbd45e939(_,{ad73b976c,ac10fa519,a4ee44f99,a0e95a8b1,e10794ae = false,a7fc45f1d}:{
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
            e10794ae: boolean,
            /** Identificador Único (UUID) del Filtro a Aplicar en el Contexto Actual */
            a7fc45f1d?: string
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
            };if(a7fc45f1d)switch(a7fc45f1d){
                case "92499353-6816-45da-b27f-ac8af43ad019":
                    _args_["sort"] = ["-translation.title"];
                break;
                case "055457b5-41ff-4cc6-9535-b71ab7030623":
                    _args_["sort"] = ["-date_created"];
                break;
            }try{
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
                        "like",
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
                    (_instance_["map"](async({cover,translation,identified,character,key,date_created,like},iterator) => {
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
                        }_mutated_[iterator] = (({
                            thumbnail: cover["id"],
                            title: translation[0]["title"],
                            description: translation[0]["description"],
                            key: identified,
                            character: (character ? _character_ : undefined),
                            view: _bcdn_["views"],
                            endpoint: `https://iframe.mediadelivery.net/embed/${_bcdn_["videoLibraryId"]}/${_bcdn_["guid"]}?token=${createHash("sha256")["update"](`${bunny["ckvideopub"]["container"]["secretKey"]}${key}${_timer_}`)["digest"]("hex")}&expires=${_timer_}&autoplay=false&loop=false&muted=false&preload=false&responsive=true`,
                            createAt: date_created,
                            duration: _bcdn_["length"],
                            populate: like
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
        },
        /** Obtención de Todos los Comentarios Relacionados a un Vídeo de la Aplicación */
        async fb48e8d58(_,{a7fa34be8,abbe88fb2}:{
            /** Identificador Único (UUID) del Vídeo Currente para los Comentarios */
            a7fa34be8: string,
            /** Objeto para la Definición de la Paginación de los Comentarios */
            abbe88fb2: {
                /** Total de Comentarios a Mostrar por Página */
                ab456473a: number,
                /** Página Actual en la Vista de los Comentarios en el Cliente */
                a2db3c45a: number
            }
        },{language}:GraphQLContext): Promise<Response | void> {
            const _db_ = (new Database(language));
            try{
                const _all_: Comment[] = (await _db_["get"]("ckpComment",{
                    fields: [],
                    filter: {
                        video: {
                            identified: {
                                _eq: a7fa34be8
                            }
                        }
                    }
                }))!;
                const _comments_: Comment[] = (await _db_["get"]("ckpComment",{
                    fields: [
                        {
                            avatar: [
                                "id"
                            ]
                        },
                        "name",
                        "message",
                        "date_created"
                    ],
                    filter: {
                        video: {
                            identified: {
                                _eq: a7fa34be8
                            }
                        }
                    },
                    sort: ["-date_created"],
                    page: abbe88fb2["a2db3c45a"],
                    limit: abbe88fb2["ab456473a"]
                }))!;
                return (GraphQLResponse({
                    tt: (_all_["length"]),
                    pp: (Math["ceil"](_all_["length"] / abbe88fb2["ab456473a"])),
                    ob: (_comments_["map"](({avatar,name,message,date_created}) => ({
                        image: avatar?.id,
                        createAt: date_created,
                        name,
                        message
                    } as CommentObject)))
                }));
            }catch(e){
                GraphQLCatch(e);
            }
        }
    }
};