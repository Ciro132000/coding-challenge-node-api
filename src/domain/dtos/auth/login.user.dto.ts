import { Validators } from "../../../utils/validators.js";

export class LoginUserDto {
    
    private constructor(
        public email: string,
        public password: string
    ){

    }

    static create(object: {[key: string]: any}): [string | undefined, LoginUserDto?] {

        if(!object) return ['Objeto faltante']

        const { email, password} = object;

        if (!email) return ['Email es requerido'];
        if(!Validators.email.test(email)) return ['Email no es válido use un email válido: correo@ejemplo.com'];
        if(!password) return ['La contraseña es muy corta, debe ser mayor o igual a 6 digitos'];

        return [
            undefined,
            new LoginUserDto(
                email.toLowerCase(), password
            )
        ];
    }
}
