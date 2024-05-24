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
import Database from "../../bin/database";
import type {Schedule,ScheduleObject,Category,CategoryObject,ConstructorParams} from '../../types/database/service/iexpressmty';
import type {Policy,PolicyObject,Product,ProductObject} from '../../types/database/service/iexpressmty';
import type {File,ManyToAny} from '../../types/database';
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

/** Utilidad para la Aplicación de la Formúla Matemática para la Obtención del Total de Piezas de una Hoja en un Producto [Grou Hayabusa] */
const ProductMath = ({parent,children}:{
    /** Número Real del Padre */
    parent: number,
    /** Número Real del Hijo */
    children: number
}): number => (Math["floor"](parent / children));

/** Utilidad para la Conversión de un Contenedor de ManyToAny en un Formato Legible para la Aplicación */
const ManyToAnyConversor = (property:ManyToAny[],reference:any): void => (property["forEach"](({collection,item}) => {
    if(reference[collection]){
        let __: string[] = reference[collection];
        __["push"](item);
        reference[collection] = __;
    }else reference[collection] = [item];
}));

/** Objeto con los Handlers Esenciales para la Aplicación */
export default {
    /** Integración del Escalar JSON para el Contexto */
    JSON: GraphQLJSON,
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
                return (GraphQLResponse({
                    tt: (pagination ? _instance_["length"] : 1),
                    pp: (pagination ? Math["floor"](_instance_["length"] / pagination["perPage"]) : 1),
                    ob: (_instance_["map"](({gallery,cover,identified,translation}) => {
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
                            title: translation[0]["title"]
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
                                _obj_["extra"] = [];
                                (await Promise["all"](
                                    (c["map"](async(key) => {
                                        let _ = (await _db_["one"]("iexgmtMaterial",key,{
                                            fields: [
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
                                                                                    price: _["price"]
                                                                                }
                                                                            });
                                                                        }))
                                                                    ));
                                                                break;
                                                            }_obj_["extra"]["push"](_loc_);
                                                        }))
                                                    ));
                                                }_obj_["value"]["push"]({
                                                    key: v8a90aba9["iexgmtVariant_identified"]["identified"],
                                                    label: `${_["translation"][0]["label"]} ${v8a90aba9["iexgmtVariant_identified"]["translation"][0]["label"]}`,
                                                    extra: {
                                                        message: `${_["translation"][0]["message"]} ${v8a90aba9["iexgmtVariant_identified"]["translation"][0]["message"] ?? ""}`,
                                                        price: (_["price"] + v8a90aba9["iexgmtVariant_identified"]["price"])
                                                    }
                                                });
                                            }))
                                        ))
                                    }))
                                ));
                            break;
                            case "iexgmShape":
                                _obj_["label"] = "Forma";
                                (await Promise["all"](
                                    (c["map"](async(key) => {
                                        let _ = (await _db_["one"]("iexgmShape",key,{
                                            fields: [
                                                "identified",
                                                "name",
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
                                        _obj_["value"]["push"]({
                                            key: _["identified"],
                                            label: _["translation"][0]["label"],
                                            extra: {
                                                figure: _["name"]
                                            }
                                        });
                                    }))
                                ));
                            break;
                            case "iexgmSize":
                                _obj_["label"] = "Tamaño";
                                (await Promise["all"](
                                    (c["map"](async(key) => {
                                        let _ = (await _db_["one"]("iexgmSize",key,{
                                            fields: [
                                                "identified",
                                                "height",
                                                "width"
                                            ],
                                            filter: {
                                                active: {
                                                    _eq: true
                                                }
                                            },
                                            sort: ["height"]
                                        }));
                                        let __: string = "tabloide";
                                        if(_["height"] >= 2 && _["height"] <= 4) __ = "letter";
                                        else if(_["height"] >= 5 && _["height"] <= 7) __ = "midtab";
                                        else if(_["height"] >= 8 && _["height"] <= 12) __ = "tabloide";
                                        let _s_ = ((await _db_["get"]("iexgmPaper",{
                                            fields: [
                                                "price",
                                                "identified"
                                            ],
                                            filter: {
                                                active: {
                                                    _eq: true
                                                },
                                                name: {
                                                    _eq: __
                                                }
                                            }
                                        }))!)[0];
                                        _obj_["value"]["push"]({
                                            key: _["identified"],
                                            label: `${_["height"]}cm x ${_["width"]}cm`,
                                            extra: {
                                                paper: _s_["identified"],
                                                price: _s_["price"]
                                            }
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
        }
    }
};