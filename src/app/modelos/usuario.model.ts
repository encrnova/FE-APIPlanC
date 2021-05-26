export class Usuario {
    USU_ID: number;
    USU_TIPO_USUARIO: string
    USU_LOGIN: string;
    USU_CORREO: string;
    USU_CLAVE: string;
    USU_PIN: string;
    USU_CLAVE_TEMP: string;
    USER: string;
}

export class UsuarioInterno {
    USUARIO: string;
    CLAVE: string;
    PIN: string;
    CORREO: string;
    PAS_PROVISIONAL: boolean;
    CLAVE_PROVISIONAL: string;
    INTENTOS_REALIZADOS: number;
    PER_ID: number;
    pref_id: string;
    Nombre_Usuario: string;
    Exito: boolean;
    Mensaje: string;
    TipoResultado: number;
}
