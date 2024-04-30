/*
@author LxingA
@version 1.0.0
@project SocASF
@description Definición del Contexto "Global" para el Rutador de la Aplicación
@date 26/04/24 08:00PM
*/
import {t} from 'elysia';
import {AppConfig} from '../../util/configuration';
import {Keyword} from '../../util/random';
import Database from '../../bin/database';
import type {Elysia as Engine} from 'elysia';
import type {Application as ApplicationObject} from '../../types/router/global';
import type {File} from '../../types/database';
import type DBApplication from '../../types/database/global/application';
import type DBEndPoint from '../../types/database/global/endpoint';
import type DBLanguage from '../../types/database/global/language';
import type ResponseAPI from '../../types/response';

/** Instanciamos la Configuración Global de la Aplicación */
const configuration = (AppConfig());

/** Definición del Contexto Global para el Rutador de la Aplicación */
const Global = (Application:Engine<"/global">) => Application["get"](
    /** Obtención de Información de una Aplicación */
    "/", async({headers,query}) => {
        const __initial__ = (new Database((headers[configuration["security"]["header"][1]["toLowerCase"]()]) ?? "es"));
        const __application__ = (await __initial__["get"]("application",{
            fields: [
                {
                    project: [
                        "name",
                        {
                            resource: [
                                {
                                    directus_files_id: [
                                        "id",
                                        "filename_download",
                                        "type",
                                        "filesize"
                                    ]
                                }
                            ],
                            cover: [
                                "id",
                                "filename_download",
                                "type",
                                "filesize"
                            ],
                            email: [
                                "name",
                                {
                                    domain: [
                                        "extension"
                                    ]
                                }
                            ]
                        },
                        "telephone",
                        "social",
                        "alternative",
                        "location"
                    ]
                },
                "name",
                "title",
                {
                    cover: [
                        "id",
                        "filename_download",
                        "type",
                        "filesize"
                    ],
                    translation: [
                        "description",
                        "keyword"
                    ],
                    log: [
                        {
                            changelog_identified: [
                                "name"
                            ]
                        }
                    ]
                }
            ],
            filter: {
                key: {
                    _eq: (headers[configuration["security"]["header"][0]["toLowerCase"]()])
                },
                active: {
                    _eq: true
                }
            },
            limit: 1
        })) as DBApplication[];
        const __language__ = (await __initial__["get"]("language",{
            fields: [
                "label",
                "iso"
            ],
            filter: {
                active: {
                    _eq: true
                }
            }
        })) as DBLanguage[];
        const __endpoint__ = (await __initial__["get"]("endpoint",{
            fields: [
                "name",
                "suffix",
                {
                    domain: [
                        "extension"
                    ]
                },
                "loader"
            ]
        })) as DBEndPoint[];
        if(__application__["length"] > 0){
            let _objected_: any = {};
            const _current_ = (__application__[0]);
            switch(query["context"]){
                case "application":
                    _objected_ = ({
                        token: (configuration["database"]["resourceAccess"]),
                        identified: (_current_["name"]),
                        name: (_current_["title"]),
                        resource: [
                            {
                                key: _current_["cover"]["id"],
                                mime: _current_["cover"]["type"],
                                size: _current_["cover"]["filesize"],
                                name: _current_["cover"]["filename_download"]
                            },
                            {
                                key: _current_["project"]["cover"]["id"],
                                mime: _current_["project"]["cover"]["type"],
                                size: _current_["project"]["cover"]["filesize"],
                                name: _current_["project"]["cover"]["filename_download"]
                            },
                            ...((_current_["project"]["resource"]!)["map"]((f:File) => {
                                f = (f as any)["directus_files_id"];
                                return ({
                                    key: f["id"],
                                    mime: f["type"],
                                    size: f["filesize"],
                                    name: f["filename_download"]
                                })
                            }))
                        ],
                        version: ((_current_["log"]!["sort"]((a,b) => {
                            const first = Number((a as any)["changelog_identified"]["name"]["replace"](/\./g,""));
                            const last = Number((b as any)["changelog_identified"]["name"]["replace"](/\./g,""));
                            return (first < last) ? 1 : -1;
                        }) as any)[0]["changelog_identified"]["name"]),
                        description: ((_current_["translation"] as any)[0]["description"]),
                        keywords: ((_current_["translation"] as any)[0]["keyword"]),
                        email: `${_current_["project"]["email"]["name"]}@${_current_["project"]["email"]["domain"]["extension"]}`,
                        telephone: (_current_["project"]["telephone"]),
                        social: (_current_["project"]["social"]?.map((u,k) => {
                            const metadata: {i:string,n:string}[] = [
                                {
                                    i: "facebook",
                                    n: "fb"
                                },
                                {
                                    i: "twitter",
                                    n: "tt"
                                },
                                {
                                    i: "github",
                                    n: "gb"
                                }
                            ];return ({
                                name: metadata[k]["n"],
                                icon: metadata[k]["i"],
                                url: "https://" + u
                            });
                        })),
                        alternative: (_current_["project"]["alternative"]),
                        location: (_current_["project"]["location"] ? ({
                            street: (_current_["project"]["location"][0]),
                            outside: Number((_current_["project"]["location"][1])),
                            colony: (_current_["project"]["location"][2]),
                            postal: Number((_current_["project"]["location"][3])),
                            city: (_current_["project"]["location"][4]),
                            state: (_current_["project"]["location"][5]),
                            country: (_current_["project"]["location"][6])
                        }) : undefined),
                        project: (_current_["project"]["name"]),
                        language: (__language__["map"](({label,iso}) => ({
                            label,
                            iso
                        }))),
                        endpoint: (__endpoint__["map"](({suffix,name,domain:{extension},loader}) => ({
                            path: `https://${suffix}.${extension}`,
                            type: loader,
                            name
                        })))
                    } as ApplicationObject);
                break;
                default:
                    throw new Error("GlobalApplicationContextTypeNotFoundOnContext");
            }return ({
                dt: (Date["now"]()),
                rf: Keyword(8),
                st: true,
                rs: {
                    tt: 1,
                    pp: 1,
                    ob: [
                        _objected_
                    ]
                }
            } as ResponseAPI);
        }else throw new Error("GlobalApplicationContextNotFoundOnDatabase");
    }, {
        query: t["Object"]({
            context: t["String"]()
        })
    }
);

export default Global;