/*
@author LxingA
@version 1.0.0
@project SocASF
@description Definición de los Elementos Esenciales HTML para la Aplicación
@date 26/04/24 02:30AM
*/
import type {Application as AppConfig} from '../types/configuration';

/** Definición de los Parámetros Predeterminados para el Cuerpo HTML */
export const Param = ({allow = false,version}:{
    /** Permitir el Menú Contextual, Selección y el Arrastre en el Contexto del HTML */
    allow?: boolean,
    /** Definición de una Versión a Mostrar en el Contexto del HTML */
    version?: AppConfig["version"]
}): string => `author="LxingA" version="${version ?? "1"}" ondragstart="return ${allow ? "true" : "false"}" onselectstart="return ${allow ? "true" : "false"}" oncontextmenu="return ${allow ? "true" : "false"}"`;

/** Definición de la Cabecera HTTP para la Plantilla HTML */
export const Head = ({title}:{
    /** Definición de un Titulo a Mostrar en la Plantilla */
    title: string
}): string => `
    <head>
        <link rel="preconnect" href="https://resource.socasf.net"/>
        <link rel="dns-prefetch" href="https://static.cloudflareinsights.com"/>
        <link rel="dns-prefetch" href="https://www.googletagmanager.com"/>
        <meta charset="utf8"/>
        <meta name="viewport" content="initial-scale=1,width=device-width,user-scalable=no"/>
        <title>${title} - CodeInk API (LxingA)</title>
        <link rel="icon" href="https://resource.socasf.net/favicon.ico?v=553f2b54b86c" type="image/x-icon"/>
        <link rel="stylesheet" href="https://resource.socasf.net/bootstrap.css?v=553f2b54b86c" type="text/css"/>
        <link rel="stylesheet" href="https://resource.socasf.net/icons.css?v=553f2b54b86c" type="text/css"/>
    </head>
`;

/** Definición del Bloque con los Scripts Esenciales para la Plantilla HTML */
export const Script = (): string => `
    <script type="text/javascript" src="https://www.googletagmanager.com/gtag/js?id=G-JHVKM469B8" async></script>
    <script type="text/javascript" src="https://resource.socasf.net/bootstrap.js?v=553f2b54b86c"></script>
    <script type="text/javascript" src="https://resource.socasf.net/script.js?v=553f2b54b86c"></script>
`;

/** Definición del Objeto con los Componentes Esenciales para la Plantilla HTML */
export const Component = {
    /** Componente con la Plantilla Predeterminada para la API */
    Template: ({title,message,version}:{
        /** Versión Actual de la API */
        version: AppConfig["version"],
        /** Titulo Descriptivo para Mostrar en la Vista */
        title?: string,
        /** Mensaje Descriptivo para Mostrar en la Vista */
        message?: string
    }): string => `
        <html ${Param({
            version
        })}>
            ${Head({
                title: title ?? "CodeInk Service"
            })}
            <body>
                <div class="container col-xxl-8">
                    <div class="row flex-lg-row-reverse align-items-center g-5">
                        <div class="col-10 col-sm-8 col-lg-6">
                            <center>
                                <img loading="lazy" class="d-block mx-lg-auto img-fluid" src="https://resource.socasf.net/illustration.png?v=553f2b54b86c"/>
                            </center>
                        </div>
                        <div class="col-lg-6">
                            <h1 class="display-5 fw-bold text-body-emphasis lh-1 mb-3">
                                ${title ?? "CodeInk Service"}
                            </h1>
                            <p class="lead">
                                ${message ?? "Acceso a la Información de las Aplicaciones del Proyecto"}
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
    `,
    /** Definición del Componente con la Cabecera de la Plantilla */
    Header: (): string => `
        <div class="container">
            <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <div class="col-md-3 mb-2 mb-md-0">
                    <a class="d-inline-flex link-body-emphasis text-decoration-none" href="/">
                        <img class="bi" src="https://resource.socasf.net/logo.png?v=553f2b54b86c" width="48"/>
                    </a>
                </div>
                <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0"/>
                <div class="col-md-3 text-end">
                    <button class="btn btn-outline-primary me-2" id="ckapi_servicebutton_theme">
                        <i class="bi bi-sun" id="ckapi_servicetheme_icon"></i>
                    </button>
                </div>
            </header>
        </div>
    `,
    /** Definición del Componente con el Píe de Página de la Plantilla */
    Footer: (): string => `
        <div class="container">
            <footer class="py-3 my-4">
                <p class="text-center text-body-secondary">
                    &copy; 2012 ~ ${(new Date())["getFullYear"]()} - <b>CodeInk Service</b> mediante <b>SocASF</b> por <b>LxingA</b>
                </p>
            </footer>
        </div>
    `
};