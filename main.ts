/*
@author LxingA
@version 1.0.0
@project SocASF
@description Configuración Inicial de la Aplicación
@date 25/04/24 11:20PM
*/
import {apollo} from '@elysiajs/apollo';
import {cors} from '@elysiajs/cors';
import {html} from '@elysiajs/html';
import {jwt} from '@elysiajs/jwt';
import {bearer} from '@elysiajs/bearer';
import {Head,Param,Script,Component} from './util/html';
import {AppConfig,Structure} from './util/configuration';
import {Keyword} from './util/random';
import Engine from 'elysia';
import Documentation from '@elysiajs/swagger';
import GraphQLSchema from './graphql';
import Router from './router';
import type {HTTPMethod} from '@elysiajs/cors';
import type GraphQLContext from './types/context';
import type Response from './types/response';

/** Instanciamos la Configuración Global de la Aplicación */
const configuration = (AppConfig());

/** Inicialización de la Instancia de Elysia como Interprete HTTP para la API */
const Instance = (new Engine())["use"](
    html({
        autoDoctype: true,
        autoDetect: true
    })
)["use"](
    cors(
        configuration["server"]["context"] == "production" ? {
            allowedHeaders: configuration["security"]["header"],
            exposedHeaders: configuration["security"]["header"],
            methods: configuration["security"]["method"] as HTTPMethod[] || undefined,
            origin: configuration["security"]["origin"]
        } : undefined
    )
)["use"](
    bearer()
)["use"](
    jwt({
        name: "jwt",
        secret: configuration["security"]["token"]
    })
)["use"](
    Documentation({
        scalarConfig: {
            layout: "modern"
        }
    })
)["use"](
    apollo({
        status400ForVariableCoercionErrors: true,
        includeStacktraceInErrorResponses: false,
        csrfPrevention: true,
        schema: GraphQLSchema,
        enablePlayground: false,
        persistedQueries: {
            ttl: (60 * 30)
        },
        context: (async({headers}:{
            /** Cabeceras Esenciales de la Solicitud en el Contexto de GraphQL */
            headers: Record<string,(any)>
        }): Promise<GraphQLContext> => {
            return {
                language: headers[configuration["security"]["header"][1]] ?? "es"
            }
        }) as any
    })
)["onError"](
    ({code,error:{message},set}) => {
        let ms: string = "";
        switch(code){
            case "INTERNAL_SERVER_ERROR":
                set["status"] = 500;
                ms = Structure["replace"]("%","ErrContextInternalServer");
            break;
            case "INVALID_COOKIE_SIGNATURE":
                set["status"] = 500;
                ms = Structure["replace"]("%","ErrContextCookieSignature");
            break;
            case "NOT_FOUND":
                set["status"] = 404;
                ms = Structure["replace"]("%","ErrContextNotFound");
            break;
            case "PARSE":
                set["status"] = 500;
                ms = Structure["replace"]("%","ErrContextParseDefining");
            break;
            case "VALIDATION":
                set["status"] = 500;
                ms = Structure["replace"]("%","ErrContextValidate");
                console.log(message);
            break;
            case "UNKNOWN":
                switch(message){
                    case "MidCheckerHeaderNotSended": case "MidCheckerHeaderNotValid":
                        set["status"] = 401;
                    break;
                    default:
                        set["status"] = 500;
                    break;
                }
                ms = Structure["replace"]("%",(message));
            break;
            default:
                ms = Structure["replace"]("%","ErrUnknownContext");
            break;
        }
        return ({
            dt: (Date["now"]()),
            rf: Keyword(8),
            st: false,
            ms
        } as Response);
    }
)["use"](
    Router
)["all"](
    "*", (): string => `
    <html ${Param({
        version: configuration["version"]
    })}>
        ${Head({
            title: "Acceso a los Recursos Globales de las Aplicaciones"
        })}
        <body>
            ${Component["Header"]()}
            <div class="container col-xxl-8">
                <div class="row flex-lg-row-reverse align-items-center g-5">
                    <div class="col-10 col-sm-8 col-lg-6">
                        <center>
                            <img loading="lazy" class="d-block mx-lg-auto img-fluid" src="https://resource.socasf.net/illustration.png?v=553f2b54b86c"/>
                        </center>
                    </div>
                    <div class="col-lg-6">
                        <h1 class="display-5 fw-bold text-body-emphasis lh-1 mb-3">
                            CodeInk Service
                        </h1>
                        <p class="lead">
                            Acceso a la Información de las Aplicaciones del Proyecto
                        </p>
                        <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                            <button class="btn btn-primary btn-lg px-4 me-md-2" id="ckapi_servicebutton_contact">
                                Contacto
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            ${Component["Footer"]()}
            ${Script()}
        </body>
    </html>
`
);

export default Instance;