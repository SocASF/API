/*
@author LxingA
@version 1.0.0
@project SocASF
@description Configuración Inicial de la Aplicación
@date 25/04/24 11:20PM
*/
import {AppConfig} from './util/configuration';
import {createServer} from 'https';
import {json,urlencoded} from 'body-parser';
import {hidePoweredBy} from 'helmet';
import {readFileSync} from 'fs';
import {join} from 'path';
import Files from 'multer';
import Engine from 'express';
import Secure from 'cors';
import IP from 'request-ip';

/** Instanciamos la Configuración Global de la Aplicación */
const configuration = (AppConfig());

/** Instancia de Express como Servidor para la API */
const Server = (Engine());

/** Instancia del Gestor de los Archivo Subidos a la API */
const Uploader = (Files());

/** Inicializamos la Configuración Esencial para el Servidor API */
if(configuration["server"]["context"] == "production") Server["use"](Secure({
    exposedHeaders: configuration["security"]["header"],
    methods: configuration["security"]["method"],
    origin: "*"
}));
Server["use"](json());
Server["use"](urlencoded({extended:true}));
Server["use"](hidePoweredBy());
Server["use"](IP["mw"]());
Server["use"](Uploader["any"]());

/** Instancia del Servidor HTTP en Modo SSL para el Acceso a la API */
const HTTP = (createServer({
    passphrase: readFileSync(join(__dirname,"./bin/certificate.pwd"),"utf8")["toString"]()["trim"](),
    cert: readFileSync(join(__dirname,"./bin/certificate.pem")),
    key: readFileSync(join(__dirname,"./bin/certificate.key"))
},Server));

export {
    Server,
    HTTP
};