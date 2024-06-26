/*
@author LxingA
@version 1.0.0
@project SocASF
@description Definición de los Prototipos de los Servicios del Proyecto
@date 08/05/24 02:00AM
*/
import type {Banner,Schedule,Policy,Material,MaterialVariant,Paper,Shape,Size,Color,Grammage,Orientation,Laminate,Category,Product,Model} from './service/iexpressmty';
import type {Game,Character,Video,Comment} from './service/ckvideopub';

/** Prototipo de los Servicios de la Aplicación */
interface Service {
    /** Contenedor con los Banners para la Aplicación "IExpressMTY" */
    iexgBanner: Banner[],
    /** Contenedor con los Horarios Esenciales para la Aplicación "IExpressMTY" */
    iexgSchedule: Schedule[],
    /** Contenedor con las Políticas Internas de la Aplicación "IExpressMTY" */
    iexgPolicy: Policy[],
    /** Contenedor con las Categorías Esenciales de la Aplicación "IExpressMTY" */
    iexgCategory: Category[],
    /** Contenedor con los Productos Esenciales de la Aplicación "IExpressMTY" */
    iexgProduct: Product[],
    /** Contenedor con los Materiales de la Aplicación "IExpressMTY" */
    iexgmtMaterial: Material[],
    /** Contenedor con las Variantes de los Materiales de la Aplicación "IExpressMTY" */
    iexgmtVariant: MaterialVariant[],
    /** Contenedor con los Tipos de Pápeles de la Aplicación "IExpressMTY" */
    iexgmPaper: Paper[],
    /** Contenedor con las Formas Esenciales de la Aplicación "IExpressMTY" */
    iexgmShape: Shape[],
    /** Contenedor con las Medidas ó Tamaños de la Aplicación "IExpressMTY" */
    iexgmSize: Size[],
    /** Contenedor con los Colores Esenciales de la Aplicación "IExpressMTY" */
    iexgmColor: Color[],
    /** Contenedor con los Grosores Esenciales para los Pápeles de la Aplicación "IExpressMTY" */
    iexgmGrammage: Grammage[],
    /** Contenedor con las Orientales Esenciales de los Productos de la Aplicación "IExpressMTY" */
    iexgmOrientation: Orientation[],
    /** Contenedor con los Laminadores Esenciales de los Productos de la Aplicación "IExpressMTY" */
    iexgmLaminate: Laminate[],
    /** Contenedor con los Modelos Esenciales para las Figuras de los Productos de la Aplicación "IExpressMTY" */
    iexgmModel: Model[],
    /** Contenedor con los Juegos Esenciales para los Vídeos Públicos de la Aplicación "CKVideoPub" */
    ckpGame: Game[],
    /** Contenedor con los Personajes Esenciales para los Vídeos Públicos de la Aplicación "CKVideoPub" */
    ckpCharacter: Character[],
    /** Contenedor con los Vídeos Esenciales de la Aplicación "CKVideoPub" */
    ckpVideo: Video[],
    /** Contenedor con los Comentarios Públicos de los Vídeos de la Aplicación "CKVideoPub" */
    ckpComment: Comment[]
};

export default Service;