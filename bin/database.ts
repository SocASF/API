/*
@author LxingA
@version 1.0.0
@project SocASF
@description Integración de Directus como Base de Datos para la API
@date 26/04/24 01:00AM
*/
import {createDirectus,rest,staticToken,readItems} from '@directus/sdk';
import {AppConfig} from '../util/configuration';
import type {DirectusClient,RestClient,StaticTokenClient} from '@directus/sdk';
import type {Schema} from '../types/database';

/** Prototipo Estático para la Instancia de la Clase en el "Initial()" */
type CodeInkClient = (DirectusClient<Schema> & RestClient<Schema> & StaticTokenClient<Schema>);

/** Instanciamos la Configuración de la Base de Datos Global */
const configuration = (AppConfig()["database"]);

/** Definición de la Clase Global para la Aplicación */
class Database {
    /**
     * Inicialización de la Clase "Base de Datos"
     * @param language Definición del Lenguaje Predeterminado para el Contexto de la Base de Datos
     */
    constructor(private readonly language?: string){}
    /** Instancia de la Base de Datos para los Métodos de la Clase */
    #client(): CodeInkClient {
        /** Definimos la Instancia de Directus como Interprete de la Base de Datos de la Aplicación */
        const instance = (createDirectus<Schema>(configuration["hostname"]))["with"](rest())["with"](staticToken(configuration["tokenAccess"]));
        return (instance as CodeInkClient);
    }
    /** Obtención de Información de una Colección en la Base de Datos */
    public async get(collection:(keyof Schema),query?:any): Promise<any[] | void> {
        try{
            return (await this.#client()["request"](readItems(collection,{
                deep: ({
                    translation: {
                        _filter: {
                            _and: [
                                {
                                    language_iso: {
                                        _eq: this.language
                                    }
                                }
                            ]
                        }
                    }
                }) as any,
                ...query
            })));
        }catch(_){
            throw new Error("DatabaseErrGettedRequestedByOperation");
        }
    }
};

export default Database;