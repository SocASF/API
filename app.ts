/*
@author LxingA
@version 1.0.0
@project SocASF
@description Inicialización de la API
@date 26/04/24 12:00AM
*/
import {join} from 'path';
import {readFileSync} from 'fs';
import {AppConfig} from './util/configuration';
import HTTP from './main';
import Server from 'bun';

/** Instanciamos la Configuración Global de la Aplicación */
const configuration = (AppConfig());

/** Instancia de Bun como Interprete HTTP del Servidor para la API */
Server["serve"]({
    port: configuration["server"]["port"],
    reusePort: true,
    fetch: request => HTTP["handle"](request),
    tls: configuration["server"]["context"] == "production" ? {
        key: readFileSync(
            join(__dirname, "./bin/certificate.key")
        ),
        cert: readFileSync(
            join(__dirname, "./bin/certificate.pem")
        ),
        passphrase: readFileSync(
            join(__dirname, "./bin/certificate.pwd")
        )["toString"]()
    } : undefined
});