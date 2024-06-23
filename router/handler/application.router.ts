/*
@author LxingA
@version 1.2.1
@project SocASF
@description Definición del Rutador para las Aplicaciones de la API
@date 22/06/24 12:30AM
*/
import {AppConfig} from '../../util/configuration';
import {ResponseObject} from '../../util/response';
import {uploadFiles,readFolders} from '@directus/sdk';
import {Keyword} from '../../util/random';
import Database from '../../bin/database';
import type {Request,Response} from 'express';

/** Objeto con la Configuración Esencial de la API para el Rutador */
const configuration = (AppConfig());

/** Definición del Rutador para las Aplicaciones de la API */
const Application = async(rq:Request,rs:Response): Promise<void> => {
    const _db_ = (new Database(rq["header"](configuration["security"]["header"][1])))["getClient"]();
    switch(rq["query"]["id"]){
        /** Definición de los Handlers Esenciales para las Mutaciones de la Aplicación "CKVideoPub" */
        case "ckvideopub":
            switch(rq["body"]["handler"]){
                /** Definir el Avatar Generado en el Cliente para el Comentario del Usuario de la Aplicación */
                case "fb6a78d58":
                    try{
                        const folder: string = (await _db_["request"](readFolders({
                            fields: [
                                "id"
                            ],
                            filter: {
                                name: {
                                    _eq: "Comments"
                                }
                            },
                            limit: 1
                        })))[0]["id"];
                        const file = (new FormData());
                        const current = (rq["files"]!);
                        file["append"]("folder",(folder));
                        file["append"]("file",(new File([current[0]["buffer"]],(current[0]["originalname"]),{
                            type: "image/jpeg"
                        })),(Keyword(16)));
                        const {id} = (await _db_["request"](uploadFiles(file,{
                            fields: [
                                "id"
                            ]
                        })));
                        ResponseObject({
                            response: rs,
                            status: true,
                            object: {
                                newAvatarIDContext: id
                            }
                        });
                    }catch(error){
                        ResponseObject({
                            response: rs,
                            status: false,
                            object: error
                        });
                    }
                break;
                default:
                    ResponseObject({
                        response: rs,
                        status: false,
                        object: {}
                    });
                break;
            }
        break;
        default:
            ResponseObject({
                response: rs,
                status: false,
                object: {}
            });
        break;
    }
};

export default Application;