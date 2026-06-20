import { Validators } from "../../../utils/validators.js";


export class RegisterUserDto {
    
    private constructor(
        public name: string,
        public email: string,
        public password: string
    ){

    }

    static create(object: {[key: string]: any}): [string | undefined, RegisterUserDto?] {

        if(!object) return ['Objeto faltante']

        const {name, email, password} = object;

        if (!name) return ['Nombre es requerido'];
        if (!email) return ['Email es requerido'];
        if(!Validators.email.test(email)) return ['Email no es válido use un email válido: correo@ejemplo.com'];
        if(!password) return ['Contraseña es requerida'];
        if(password.length < 6) return ['La contraseña es muy corta, debe ser mayor o igual a 6 digitos'];

        return [
            undefined,
            new RegisterUserDto(
                name, email.toLowerCase(), password
            )
        ];
    }
}
