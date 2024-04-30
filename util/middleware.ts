/*
@author LxingA
@version 1.0.0
@project SocASF
@description Definición del Middleware Global para la API
@date 26/04/24 07:30PM
*/
import {AppConfig,Structure} from './configuration';
import {Keyword} from '../util/random';
import type Response from '../types/response';

/** Instanciamos la Configuración Global de la Aplicación */
const configuration = (AppConfig());

/** Checador de Seguridad en el Middleware de la API */
export const Security = (r:Request,s:Record<string,(any)>): Response | void => {
    if(configuration["server"]["context"] == "production"){
        let objected: any = {
            dt: (Date["now"]()),
            rf: Keyword(8),
            st: false
        };if(!configuration["security"]["method"]["includes"](r["method"]["toUpperCase"]())){
            s["status"] = 405;
            objected["ms"] = Structure["replace"]("%",("SecureHTTPMethodNotAllowed"));
            return (objected as Response);
        }else if(!configuration["security"]["origin"]["includes"](r["referrer"]["toLowerCase"]())){
            s["status"] = 403;
            objected["ms"] = Structure["replace"]("%",("SecureHTTPOriginNotAllowed"));
            return (objected as Response);
        }
    }
}

/** Definición del Middleware Global de la Aplicación */
const Middleware = ({headers,set}:{
    /** Objeto con las Cabeceras HTTP de la API */
    headers: Record<string,(string | undefined)>,
    /** Definir un Nuevo Contexto en el Rutador */
    set: Record<string,(any)>
}): void => {
    if(!(configuration["security"]["header"][0]["toLowerCase"]() in headers)) throw new Error("MidCheckerHeaderNotSended");
    else if(!(/^[a-z0-9]{8}\-(([a-z0-9]+\-){3,})[a-z0-9]+$/["test"](headers[configuration["security"]["header"][0]["toLowerCase"]()] ?? ""))) throw new Error("MidCheckerHeaderNotValid");
};

export default Middleware;