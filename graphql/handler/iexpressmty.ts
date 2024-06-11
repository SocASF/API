/*
@author LxingA
@version 2.0.0
@project SocASF
@description Handlers para la Aplicación "IExpressMTY" del Proyecto
@date 07/05/24 11:30PM
*/
import {GraphQLCatch,GraphQLResponse} from '../../util/graphql';
import {GraphQLJSON} from 'graphql-type-json';
import {Days} from '../../util/configuration';
import {ZeroHour} from '../../util/random';
import {reCaptcha} from '../../util/configuration';
import {HTTPreCaptcha} from '../../util/http';
import {AppConfig} from '../../util/configuration';
import Database from "../../bin/database";
import type {Schedule,ScheduleObject,Category,CategoryObject,ConstructorParams} from '../../types/database/service/iexpressmty';
import type {Policy,PolicyObject,Product,ProductObject,Paper,MaterialVariant} from '../../types/database/service/iexpressmty';
import type {File,ManyToAny} from '../../types/database';
import type Application from '../../types/database/global/application';
import type Response from '../../types/response';
import type GraphQLContext from "../../types/context";

/** Definición del Enumérador del Filtro para el Orden de los Productos en las Categorías */
enum CategoryFilter {
    "b5eb17e1a772" = "clear",
    "126fee836110" = "",
    "e8964d084549" = "",
    "7dacfe3bcd25" = "",
    "3f51cb4191f5" = ""
};

/** Definición del Enumerador para la Pregunta "¿Impresión por Ambos Lados?" en un Producto */
enum ProductPrintPerPage {
    "0805fd75" = "No",
    "75e735a9" = "Sí"
};

/** Utilidad para la Conversión de un Contenedor de ManyToAny en un Formato Legible para la Aplicación */
const ManyToAnyConversor = (property:ManyToAny[],reference:any): void => (property["forEach"](({collection,item}) => {
    if(reference[collection]){
        let __: string[] = reference[collection];
        __["push"](item);
        reference[collection] = __;
    }else reference[collection] = [item];
}));

/** Instancia de la Configuración Global del Servidor */
const configuration = (AppConfig());

/** Objeto con los Handlers Esenciales para la Aplicación */
export default {
    /** Integración del Escalar JSON para el Contexto */
    JSON: GraphQLJSON,
    /** Contenedor con los Tipos de Handlers Mutables para GraphQL */
    Mutation: {
        /** Envío de un Correo Electrónico mediante el Formulario de Contacto de la Aplicación */
        async sac76de82(_,{body,captchaKey}:{
            /** Objeto con los Valores Definidos en el Formulario */
            body: Record<string,string>,
            /** Código de Respuesta del reCaptcha en el Cliente */
            captchaKey: string
        },{appID,language}:GraphQLContext): Promise<{
            /** Definición de un Mensaje Descriptivo en Caso de Error */
            message?: string,
            /** Estado Actual de la Solicitud para la Mutación */
            state: boolean
        }> {
            const _reCaptchaInstance_ = reCaptcha();
            const _database_ = (new Database(language));
            try{
                const _checkedResponsereCaptcha_ = (await HTTPreCaptcha({
                    secretKey: _reCaptchaInstance_["iexpressmty"]["formContactKey"],
                    responseKey: captchaKey
                }));
                if(_checkedResponsereCaptcha_["success"]){
                    const _app_: Application = (await _database_["get"]("application",{
                        fields: [
                            "title",
                            {
                                project: [
                                    "name",
                                    {
                                        email: [
                                            "name",
                                            {
                                                domain: [
                                                    "extension"
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        filter: {
                            active: {
                                _eq: true
                            },
                            key: {
                                _eq: appID
                            }
                        }
                    }))![0];
                    if((await fetch("https://api.brevo.com/v3/smtp/email",{
                        method: "post",
                        body: (JSON["stringify"]({
                            sender: {
                                name: decodeURIComponent(body["ckinkputname"]),
                                email: `${_app_["project"]["email"]["name"]}@${_app_["project"]["email"]["domain"]["extension"]}`
                            },
                            to: [
                                {
                                    name: _app_["project"]["name"],
                                    email: "poletcreativedsgn@gmail.com"
                                }
                            ],
                            subject: `${decodeURIComponent(body["ckinkputname"])} se comunica desde el sitio web [${_app_["title"]}]`,
                            htmlContent: `
                                <html>
                                    <body>
                                        <h3>
                                            ${decodeURIComponent(body["ckinkputissue"])}
                                        </h3>
                                        <p>
                                            ${decodeURIComponent(body["ckinkputmessage"])}
                                        </p>
                                        <strong>
                                            ${decodeURIComponent(body["ckinkputname"])}
                                        </strong>
                                        </br>
                                        <strong>
                                            ${decodeURIComponent(body["ckinkputemail"])}
                                        </strong>
                                    </body>
                                </html>
                            `
                        })),
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                            "Api-Key": configuration["smtpKey"]
                        }
                    }))["ok"]) return ({
                        state: true
                    });else return ({
                        message: "obtuvo un error a enviar el mensaje. Intentelo de nuevo",
                        state: false
                    });
                }else return ({
                    message: "obtuvo un error debido que el reCaptcha es inválido. Intentelo de nuevo",
                    state: false
                });
            }catch(_){
                return ({
                    message: "obtuvo un error a realizar su solicitud. Intentelo de nuevo",
                    state: false
                });
            }
        }
    },
    /** Contenedor con los Tipos de Handlers para GraphQL */
    Query: {
        /** Definición de los Horarios Esenciales para la Aplicación */
        async sf45d2f49(_,{name}:{
            /** Obtener el Horario con el Nombre Identificable */
            name?: string
        },{language}:GraphQLContext): Promise<Response | void> {
            try{
                const _instance_ = (await (new Database(language))["get"]("iexgSchedule",{
                    fields: [
                        "icon",
                        "startHourRange",
                        "endHourRange",
                        "startDayRange",
                        "endDayRange",
                        {
                            translation: [
                                "title",
                                "description"
                            ]
                        }
                    ],
                    filter: {
                        active: {
                            _eq: true
                        },
                        ...(name ? {
                            name: {
                                _eq: name
                            }
                        } : {})
                    }
                })) as Schedule[];
                return (GraphQLResponse({
                    tt: _instance_["length"],
                    pp: 1,
                    ob: (_instance_["map"](({icon,startDayRange,startHourRange,endDayRange,endHourRange,translation}) => ({
                        ...({icon}),
                        range: {
                            day: [
                                Days[language][startDayRange],
                                Days[language][endDayRange]
                            ],
                            hour: [
                                (ZeroHour(startHourRange)),
                                (ZeroHour(endHourRange))
                            ]
                        },
                        title: (translation[0]["title"]),
                        description: (translation[0]["description"])
                    })) as ScheduleObject[])
                }));
            }catch(e){
                GraphQLCatch(e);
            }
        },
        /** Definición de las Políticas de la Aplicación */
        async af3bdaea(_,{name}:{
            /** Nombre de la Política */
            name?: string
        },{language}:GraphQLContext): Promise<Response | void> {
            try{
                const _instance_: Policy[] = (await (new Database(language))["get"]("iexgPolicy",{
                    fields: [
                        "validityAt",
                        {
                            translation: [
                                "title",
                                "description",
                                "rules"
                            ]
                        }
                    ],
                    filter: {
                        active: {
                            _eq: true
                        },
                        ...(name ? {
                            name: {
                                _eq: name
                            }
                        } : {})
                    }
                }))!;
                return (GraphQLResponse({
                    tt: 1,
                    pp: 1,
                    ob: (_instance_["map"](({validityAt,translation}) => ({
                        dateAt: validityAt,
                        title: translation[0]["title"],
                        description: translation[0]["description"],
                        rule: translation[0]["rules"]
                    })) as PolicyObject[])
                }));
            }catch(e){
                GraphQLCatch(e);
            }
        },
        /** Definición de las Categorías para la Aplicación */
        async sa8292773(_,{perPage,currentPage,name}:{
            /** Total de Categorías a Retornar */
            perPage: number,
            /** Página Currente de la Solicitud */
            currentPage: number,
            /** Nombre Identificable de la Categoría a Retornar */
            name?: string
        },{language}:GraphQLContext): Promise<Response | void> {
            try{
                const _instance_: Category[] = (await (new Database(language))["get"]("iexgCategory",{
                    fields: [
                        "cover",
                        "name",
                        "color",
                        {
                            translation: [
                                "title",
                                "description"
                            ]
                        }
                    ],
                    filter: {
                        active: {
                            _eq: true
                        },...(name ? {
                            name: {
                                _eq: name
                            }
                        } : {})
                    },
                    page: currentPage,
                    offset: (perPage * currentPage)
                }))!;
                return (GraphQLResponse({
                    tt: _instance_["length"],
                    pp: Math["floor"](_instance_["length"] / perPage),
                    ob: (_instance_["map"](({cover,color,name,translation}) => ({
                        cover,
                        color,
                        name,
                        title: (translation[0]["title"]),
                        description: (translation[0]["description"])
                    })) as CategoryObject[])
                }));
            }catch(e){
                GraphQLCatch(e);
            };
        },
        /** Obtención de Información de los Productos para la Aplicación */
        async sb79e4c68(_,{id,categoryID,pagination,sort}:{
            /** Obtener un Producto en Especifico mediante su Identificador */
            id?: string,
            /** Identificador de la Categoría para el Filtro de los Productos */
            categoryID?: string,
            /** Objeto con el Paginador para la División de los Productos en la Aplicación */
            pagination?: {
                /** Total de Productos a Mostrar por Página */
                perPage: number,
                /** Página Actual en la Vista de la Aplicación */
                currentPage: number
            },
            /** Identificador Único del Ordenamiento para la Retornación de los Productos */
            sort?: string
        },{language}:GraphQLContext): Promise<Response | void> {
            const _db_ = (new Database(language));
            let _filter_: any = {};
            let _paginator_: any = {};
            let _sorted_: any = {};
            if(id) _filter_["identified"] = {
                _eq: id
            };
            if(categoryID) _filter_["category"] = {
                name: {
                    _eq: categoryID
                }
            };
            if(pagination) _paginator_ = {
                page: (pagination["currentPage"]),
                offset: (pagination["perPage"] * pagination["currentPage"])
            };
            if(sort){
                const _sortedRef_: string[] = ["sort"];

                _sorted_["sort"] = _sortedRef_;
            }
            try{
                const _instance_: Product[] = (await _db_["get"]("iexgProduct",{
                    fields: [
                        "identified",
                        "printPerPage",
                        {
                            cover: [
                                "id",
                                "filename_download",
                                "type"
                            ],
                            gallery: [
                                {
                                    directus_files_id: [
                                        "id",
                                        "filename_download",
                                        "type"
                                    ]
                                }
                            ],
                            translation: [
                                "title"
                            ],
                            prop: [
                                "collection",
                                {
                                    item: [
                                        "*"
                                    ]
                                }
                            ]
                        }
                    ],
                    filter: {
                        active: {
                            _eq: true
                        },
                        ..._filter_
                    },
                    ..._paginator_,
                    ..._sorted_
                }))!;
                const _paper_: Paper[] = (await (_db_["get"]("iexgmPaper",{
                    fields: [
                        "identified",
                        "height",
                        "width"
                    ],
                    filter: {
                        active: {
                            _eq: true
                        }
                    }
                })))!;
                return (GraphQLResponse({
                    tt: (pagination ? _instance_["length"] : 1),
                    pp: (pagination ? Math["floor"](_instance_["length"] / pagination["perPage"]) : 1),
                    ob: (_instance_["map"](({gallery,cover,identified,translation,printPerPage}) => {
                        return ({
                            image: [
                                {
                                    key: cover["id"],
                                    name: cover["filename_download"]["split"](".")[0],
                                    type: cover["type"]
                                },
                                ...(gallery["map"]((f:File) => {
                                    f = (f as any)["directus_files_id"];
                                    return ({
                                        key: f["id"],
                                        name: f["filename_download"]["split"](".")[0],
                                        type: f["type"]
                                    });
                                }))
                            ],
                            identified,
                            title: translation[0]["title"],
                            paper: _paper_["map"](({width,height,identified}) => ({
                                identified,
                                height,
                                width
                            })),
                            allowPrintPerPage: printPerPage
                        } as ProductObject);
                    }))
                }));
            }catch(e){
                GraphQLCatch(e);
            }
        },
        /** Definición de las Propiedades Esenciales de los Productos para el Constructor de la Aplicación */
        async s1b0ecf0b(_,{productID}:{
            /** Identificador Único (UUID) del Producto a Definir */
            productID: string
        },{language}:GraphQLContext): Promise<Response | void> {
            const _db_ = (new Database(language));
            try{
                const _instance_: Product[] = (await _db_["get"]("iexgProduct",{
                    fields: [
                        {
                            prop: [
                                "*"
                            ]
                        }
                    ],
                    filter: {
                        active: {
                            _eq: true
                        },
                        identified: {
                            _eq: productID
                        }
                    }
                }))!;
                const ob: ConstructorParams[] = [];
                let _def_: any = {};
                _instance_["forEach"](({prop}) => (ManyToAnyConversor(prop,_def_)));
                (await Promise["all"](
                    (Object["keys"](_def_)["map"](async(k,i) => {
                        const c = (Object["values"](_def_)[i] as string[]);
                        let _obj_: any = {
                            name: k,
                            value: []
                        };switch(k){
                            case "iexgmtMaterial":
                                _obj_["label"] = "Material";
                                _obj_["priority"] = 3;
                                _obj_["extra"] = [];
                                (await Promise["all"](
                                    (c["map"](async(key) => {
                                        let _ = (await _db_["one"]("iexgmtMaterial",key,{
                                            fields: [
                                                "identified",
                                                "price",
                                                {
                                                    translation: [
                                                        "label",
                                                        "message"
                                                    ],
                                                    variant: [
                                                        {
                                                            iexgmtVariant_identified: [
                                                                "identified",
                                                                "price",
                                                                {
                                                                    translation: [
                                                                        "label",
                                                                        "message"
                                                                    ],
                                                                    extra: [
                                                                        "*"
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ],
                                            filter: {
                                                active: {
                                                    _eq: true
                                                }
                                            }
                                        }));
                                        let ___: any = {};
                                        (await Promise["all"](
                                            (_["variant"]["map"](async(v8a90aba9:any) => {
                                                if(v8a90aba9["iexgmtVariant_identified"]["extra"]["length"] > 0){
                                                    (ManyToAnyConversor(v8a90aba9["iexgmtVariant_identified"]["extra"],___));
                                                    (await Promise["all"](
                                                        (Object["keys"](___)["map"](async(k,i) => {
                                                            const _c_ = (Object["values"](___)[i] as string[]);
                                                            let _loc_: any = {
                                                                name: k,
                                                                value: []
                                                            };switch(k){
                                                                case "iexgmLaminate":
                                                                    _loc_["label"] = "Laminado";
                                                                    (await Promise["all"](
                                                                        (_c_["map"](async(key) => {
                                                                            let _ = (await _db_["one"]("iexgmLaminate",key,{
                                                                                fields: [
                                                                                    "identified",
                                                                                    "price",
                                                                                    {
                                                                                        translation: [
                                                                                            "label"
                                                                                        ]
                                                                                    }
                                                                                ],
                                                                                filter: {
                                                                                    active: {
                                                                                        _eq: true
                                                                                    }
                                                                                }
                                                                            }));
                                                                            _loc_["value"]["push"]({
                                                                                key: _["identified"],
                                                                                label: _["translation"][0]["label"],
                                                                                extra: {
                                                                                    show: k
                                                                                }
                                                                            });
                                                                        }))
                                                                    ));
                                                                break;
                                                            }_obj_["extra"]["push"](_loc_);
                                                        }))
                                                    ));
                                                }let _obj2_: any = {};
                                                if(v8a90aba9["iexgmtVariant_identified"]["extra"]["length"] > 0) _obj2_["show"] = v8a90aba9["iexgmtVariant_identified"]["extra"][0]["collection"];
                                                _obj_["value"]["push"]({
                                                    key: `${_["identified"]}+${v8a90aba9["iexgmtVariant_identified"]["identified"]}`,
                                                    label: `${_["translation"][0]["label"]} ${v8a90aba9["iexgmtVariant_identified"]["translation"][0]["label"]}`,
                                                    extra: {
                                                        message: v8a90aba9["iexgmtVariant_identified"]["translation"][0]["message"] ?? _["translation"][0]["message"],
                                                        ..._obj2_
                                                    }
                                                });
                                            }))
                                        ))
                                    }))
                                ));
                            break;
                            case "iexgmShape":
                                _obj_["label"] = "Forma";
                                _obj_["priority"] = 1;
                                let _objv_: any = {};
                                (await Promise["all"](
                                    (c["map"](async(key) => {
                                        let _ = (await _db_["one"]("iexgmShape",key,{
                                            fields: [
                                                "identified",
                                                "name",
                                                {
                                                    measure: [
                                                        {
                                                            iexgmSize_identified: [
                                                                "identified",
                                                                "height",
                                                                "width"
                                                            ]
                                                        }
                                                    ],
                                                    translation: [
                                                        "label"
                                                    ]
                                                }
                                            ],
                                            filter: {
                                                active: {
                                                    _eq: true
                                                }
                                            }
                                        }));
                                        _["measure"]["forEach"]((_k_:any) => {
                                            if(_k_["iexgmSize_identified"]["identified"] in _objv_){
                                                let _c_s_: string[] = (_objv_[_k_["iexgmSize_identified"]["identified"]]["_f_"]);
                                                _c_s_["push"](_["name"]);
                                                _objv_[_k_["iexgmSize_identified"]["identified"]]["_f_"] = _c_s_;
                                            }else _objv_[_k_["iexgmSize_identified"]["identified"]] = {
                                                _l_: `${_k_["iexgmSize_identified"]["height"]}cm x ${_k_["iexgmSize_identified"]["width"]}cm`,
                                                _f_: [_["name"]]
                                            };
                                        });
                                        _obj_["value"]["push"]({
                                            key: _["identified"],
                                            label: _["translation"][0]["label"],
                                            extra: {
                                                figure: _["name"]
                                            }
                                        });
                                    }))
                                ));
                                _obj_["extra"] = [{
                                    name: "iexgmSize",
                                    label: "Tamaño",
                                    value: (Object["keys"](_objv_)["map"]((_l_,_i_) => {
                                        let _v_: any = (Object["values"](_objv_)[_i_]);
                                        return ({
                                            key: _l_,
                                            label: _v_["_l_"],
                                            extra: {
                                                figure: _v_["_f_"]
                                            }
                                        });
                                    }))
                                }];
                            break;
                            case "iexgmModel":
                                _obj_["label"] = "Modelo";
                                _obj_["priority"] = 2;
                                (await Promise["all"](
                                    (c["map"](async(key) => {
                                        let _ = (await _db_["one"]("iexgmModel",key,{
                                            fields: [
                                                "identified",
                                                "seal"
                                            ],
                                            filter: {
                                                active: {
                                                    _eq: true
                                                }
                                            }
                                        }));
                                        _obj_["value"]["push"]({
                                            key: _["identified"],
                                            label: `Figura #${_["seal"]}`,
                                            extra: {}
                                        });
                                    }))
                                ));
                            break;
                        };ob["push"](_obj_);
                    }))
                ));
                return (GraphQLResponse({
                    tt: ob["length"],
                    pp: 1,
                    ob
                }));
            }catch(e){
                GraphQLCatch(e);
            }
        },
        /** Definición del Precio Base con los Parámetros Esenciales Definidos en el Constructo de la Aplicación */
        async sf826fc26(_,{currentContext:{current,product}}:{
            /** Objeto con la Información del Contexto Actual del Constructor con los Valores Definidos por el Cliente */
            currentContext: {
                /** Objeto con el Contexto Actual del Constructor de la Aplicación */
                current: {
                    /** Nombre de la Columna en la Base de Datos de la Propiedad */
                    name: string,
                    /** Identificador Único del Valor a Buscar en la Base de Datos de la Propiedad */
                    value: string
                }[],
                /** Identificador Único del Producto Actual de la Aplicación */
                product: string
            }
        },{language}:GraphQLContext): Promise<Response | void> {
            const _db_ = (new Database(language));
            const _available_: string[] = [];
            current["forEach"](({name}) => (_available_["push"](name)));
            let price: number = 0;
            try{
                const _material_: string[] = (current["filter"](({name}) => (name == "iexgmtMaterial"))[0]["value"]["split"]("+"));
                price += Number((await _db_["one"]("iexgmtMaterial",_material_[0],{
                    fields: [
                        "price"
                    ]
                }))["price"]);
                const _variant_: MaterialVariant = (await _db_["one"]("iexgmtVariant",_material_[1],{
                    fields: [
                        "price",
                        {
                            extra: [
                                "item",
                                "collection"
                            ]
                        }
                    ]
                }));
                price += Number(_variant_["price"]);
                const _piecev_: string = (current["filter"](({name}) => (name == "iexgmtPiece"))[0]["value"]);
                let _piecef_: any = (_piecev_ == "") ? {
                    name: {
                        _eq: "letter"
                    }
                } : {
                    identified: {
                        _eq: _piecev_
                    }
                };
                price += Number((await _db_["get"]("iexgmPaper",{
                    fields: [
                        "price"
                    ],
                    filter: {
                        active: {
                            _eq: true
                        },
                        ..._piecef_
                    }
                }))[0]["price"]);
                if(_variant_["extra"]) (await Promise["all"](
                    _variant_["extra"]["map"]((async({item,collection}) => {
                        if(_available_["includes"](collection) && (current["filter"](({name}) => (name == collection))[0]["value"] == item)) price += Number((await _db_["one"]((collection as any),item,{
                            fields: [
                                "price"
                            ]
                        }))["price"]);
                    }))
                ));
                return (GraphQLResponse({
                    tt: 2,
                    pp: 1,
                    ob: [
                        {
                            price
                        }
                    ]
                }));
            }catch(e){
                GraphQLCatch(e);
            }
        }
    }
};