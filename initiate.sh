################################################
#  @author LxingA                              #
#  @date 22/04/24 18:00                        #
#  @desc Creación del SSL para el Servidor H2  #
################################################
#!/bin/bash
certificate=./bin/certificate.pem
private=./bin/certificate.key
signed=./bin/certificate.csr
password=./bin/certificate.pwd
#build=./static
env=/.env
path=$(which openssl)
subject="/emailAddress=contacto@socasf.net/C=MX/ST=NL/L=Monterrey/O=SocASF/OU=CK/CN=service.socasf.net"
declare -a lK=( '_' '?' '=' 1 2 3 4 5 6 7 8 9 0 'H' 'N' 'T' 'G' 'B' 'R' 'F' 'V' 'E' 'D' 'C' 'W' 'S' 'X' 'Q' 'A' 'Z' 'O' 'Y' 'q' 'P' 'a' 'L' 'z' 'I' 'w' 'K' 's' 'U' 'x' 'J' 'e' 'M' 'd' 'c' 'r' 'f' 'v' 't' 'g' 'b' 'y' 'h' 'n' 'u' 'j' 'm' 'i' 'k' 'o' 'l' 'p' )

: '
Generador de un Hash Aleatorio para la Encriptación del Certificado
'
random(){
    total=$(($1 - 1))
    output=""
    for k in $(seq 0 $total)
    do
        rnd=$(($k + $RANDOM % ${#lK[@]}))
        output+="${lK[$rnd]}"
    done
}

: '
Obtener mediante una entorno la clave secreta para la encriptación del certificado
'
environment(){
    if [ ! -f $env ]
    then
        random 48
        CKDefAPIDatabaseTokenAccessKey=$output
    else 
        . $env
        CKDefAPIDatabaseTokenAccessKey=$CKGlobParamDefineAPIDatabaseAccessTokenKey
    fi
}

: '
Inyectar también el certificado en la carpeta de distribución
final(){
    if [ ! -d $build ]
    then
        mkdir -p $build
    fi
    cp $certificate $build
    cp $private $build
    cp $password $build
    echo "Se finalizó los ajustes finales con éxito"
    exit
}
'

: '
Creación del Archivo con la Contraseña para la API
'
file(){
    set -o noclobber
    echo $CKDefAPIDatabaseTokenAccessKey > $password
    rm $signed
}

: '
Proceder con la Generación del Certificado SSL para la Aplicación
'
generate(){
    if [[ $path =~ ^[a-z\/]+$ ]]
    then 
        openssl version
        echo "Generando el Certificado SSL (RSA:2K) con Llave \"${CKDefAPIDatabaseTokenAccessKey}\"..."
        openssl req -newkey rsa:2048 -subj $subject -new -passout pass:$CKDefAPIDatabaseTokenAccessKey -keyout $private -out $signed
        openssl x509 -req -days 365 -passin pass:$CKDefAPIDatabaseTokenAccessKey -in $signed -signkey $private -out $certificate
        echo "Se ha creado con éxito el Certificado para la API. Realizando los últimos ajustes..."
        file
        exit
        #final
    else
        echo "No se encuentra instalado OpenSSL en su sistema operativo. Favor de instalarlo para realizar la ejecución del script..."
        exit
    fi
}

if [ ! -f $certificate -o ! -f $private ] 
then
    environment
    generate
else
    echo "ya existe un certificado en la raíz de la aplicación"
    exit
fi