import type { LoginUserDto } from "../dtos/auth/login.user.dto.js";
import type { RegisterUserDto } from "../dtos/auth/register.user.dto.js";
import type { UserEntity } from "../entities/user.entity.js";

/**
 * Clase abstracta que define el contrato (interfaz) para el repositorio de autenticación.
 * El repositorio actúa como intermediario entre la capa de presentación/casos de uso y la capa de datos.
 */
export abstract class AuthRepository {

    /**
     * Inicia la sesión de un usuario.
     * @param loginUserDto - DTO con las credenciales (email y contraseña) del usuario.
     * @returns Una promesa que resuelve a la entidad del usuario si las credenciales son válidas.
     */
    abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;

    /**
     * Registra un nuevo usuario en el sistema.
     * @param registerUserDto - DTO con los datos necesarios para el registro (nombre, email, contraseña, etc).
     * @returns Una promesa que resuelve a la entidad del usuario recién creado.
     */
    abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;

}