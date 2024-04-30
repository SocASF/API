/*
@author LxingA
@version 1.0.0
@project SocASF
@description Utilidad para la Generación de un Dato Random para la Aplicación
@date 26/04/24 09:30PM
*/

/** Generar una Clave Aleatorio para la Aplicación */
export const Keyword = (t: number = 48): string => {
    const uk: string[] = [
        "QAZXSWEDCVFRTGBNHYUJMKILOPPOLIKMJUYHNBGTRFVCDEWSXZAQ",
        "polikujmyhntgbrfvedcwsxqazzaqwsxcderfbngtyhnmjuiklop",
        "12345678909876543210"
    ];
    let kw: string = "";
    for(let k: number = 0; k <= (t - 1); k++){
        let z: string = uk[Math["round"](Math["random"]() * (uk["length"] - 1))];
        let o: string = z[Math["round"](Math["random"]() * (z["length"] - 1))];
        kw += o;
    }
    return kw;
};