/*
@author LxingA
@version 1.0.0
@project SocASF
@description Definición del Contexto "Global" para el Rutador de la Aplicación
@date 26/04/24 08:00PM
*/
import {AppConfig} from '../../util/configuration';
import {ResponseObject} from '../../util/response';
import Database from '../../bin/database';
import type {Application as ApplicationObject} from '../../types/router/global';
import type {Response,Request} from 'express';
import type {File} from '../../types/database';
import type DBApplication from '../../types/database/global/application';
import type DBEndPoint from '../../types/database/global/endpoint';
import type DBLanguage from '../../types/database/global/language';
import type DBEmail from '../../types/database/global/mail';

/** Instanciamos la Configuración Global de la Aplicación */
const configuration = (AppConfig());

/** Definición del Contexto Global para el Rutador de la Aplicación */
const Global = async(rq:Request,rs:Response): Promise<void> => {
    const __initial__ = (new Database(rq["header"](configuration["security"]["header"][1])));
    const __application__ = (await __initial__["get"]("application",{
        fields: [
            "version",
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
                    "keyword",
                    "slogan"
                ],
                asset: [
                    {
                        directus_files_id: [
                            "id",
                            "filename_download",
                            "type",
                            "filesize"
                        ]
                    }
                ]
            }
        ],
        filter: {
            key: {
                _eq: rq["header"](configuration["security"]["header"][0])
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
    const __email__ = (await __initial__["get"]("mail",{
        fields: [
            "name",
            {
                domain: [
                    "extension"
                ]
            }
        ],
        filter: {
            name: {
                _eq: "soporte"
            }
        }
    }))![0] as DBEmail;
    if (__application__["length"] > 0) {
        let _objected_: any = {};
        const _current_ = (__application__[0]);
        switch(rq["query"]["context"]){
            case "application":
                const social: ApplicationObject["social"] = [];
                for(let o = 0; o <= (_current_["project"]["social"]!["length"] - 1); o++){
                    let j: any = {url:(_current_["project"]["social"]![o])};
                    switch(o){
                        case 0:
                            j["icon"] = "facebook-f";
                            j["name"] = "fb";
                            social["push"](j);
                        break;
                        case 1:
                            j["icon"] = "twitter";
                            j["name"] = "tt";
                            social["push"](j);
                        break;
                        case 2:
                            if(!(_current_["project"]["social"]![o]["includes"]("marketplace"))) continue;
                            else{
                                j["icon"] = "store";
                                j["name"] = "fm";
                                social["push"](j);
                            }
                        break;
                        case 3:
                            if(!(_current_["project"]["social"]![o]["startsWith"]("github"))) continue;
                            else{
                                j["icon"] = "github";
                                j["name"] = "gb";
                                social["push"](j);
                            }
                        break;
                        case 4:
                            if(!(_current_["project"]["social"]![o]["startsWith"]("youtube"))) continue;
                            else{
                                j["icon"] = "youtube";
                                j["name"] = "yt";
                                social["push"](j);
                            }
                        break;
                    }
                }_objected_ = ({
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
                        ...((_current_["project"]["resource"] ?? [])["map"]((f:File) => {
                            f = (f as any)["directus_files_id"];
                            return ({
                                key: f["id"],
                                mime: f["type"],
                                size: f["filesize"],
                                name: f["filename_download"]
                            })
                        })),
                        ...((_current_["asset"] ?? [])["map"]((a:File) => {
                            a = (a as any)["directus_files_id"];
                            return ({
                                key: a["id"],
                                mime: a["type"],
                                size: a["filesize"],
                                name: a["filename_download"]
                            });
                        }))
                    ],
                    version: _current_["version"],
                    description: ((_current_["translation"] as any)[0]["description"]),
                    keywords: ((_current_["translation"] as any)[0]["keyword"]),
                    email: `${_current_["project"]["email"]["name"]}@${_current_["project"]["email"]["domain"]["extension"]}`,
                    telephone: (_current_["project"]["telephone"]),
                    social,
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
                    }))),
                    slogan: (_current_["translation"] as any)[0]["slogan"],
                    support: `${__email__["name"]}@${__email__["domain"]["extension"]}`
                } as ApplicationObject);
                break;
            default:
                ResponseObject({
                    response: rs,
                    status: false,
                    object: {}
                });
        };
        ResponseObject({
            response: rs,
            status: true,
            object: {
                tt: 1,
                pp: 1,
                ob: [
                    _objected_
                ]
            }
        });
    }else ResponseObject({
        response: rs,
        status: false,
        object: {}
    });
}

export default Global;