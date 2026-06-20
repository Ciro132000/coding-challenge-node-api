import type { RegisterUserDto } from "../../domain/dtos/auth/register.user.dto.js";
import type { AuthDatasource, AuthRepository, LoginUserDto, UserEntity } from "../../domain/index.js";

/**
 * Implementación del repositorio de autenticación.
 * 
 * PROPÓSITO:
 * Se utiliza para abstraer el Datasource (origen de datos) de las capas superiores de la aplicación.
 * Gracias a esta abstracción, los casos de uso o controladores NO acceden directamente a los datos
 * ni se acoplan a una base de datos específica. El repositorio simplemente delega la ejecución
 * al Datasource inyectado.
 */
export class AuthRepositoryImpl implements AuthRepository {

    constructor(
        private readonly datasource: AuthDatasource
    ) {

    }
    login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        return this.datasource.login(loginUserDto);
    }

    register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.datasource.register(registerUserDto);
    }

}