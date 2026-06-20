import type { LoginUserDto } from "../dtos/auth/login.user.dto.js";
import type { RegisterUserDto } from "../dtos/auth/register.user.dto.js";
import type { UserEntity } from "../entities/user.entity.js";


/**
 * Clase abstracta que define el contrato para el origen de datos (Data Source) de autenticación.
 * Es la abstracción más cercana a la base de datos o servicio externo.
 */
export abstract class AuthDatasource {

    /**
     * Inicia la sesión de un usuario verificando contra la fuente de datos.
     * @param loginUserDto - DTO con las credenciales del usuario.
     * @returns Una promesa que resuelve a la entidad del usuario.
     */
    abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;

    /**
     * Registra un nuevo usuario en la fuente de datos.
     * @param registerUserDto - DTO con la información de registro del usuario.
     * @returns Una promesa que resuelve a la entidad del usuario.
     */
    abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;

}