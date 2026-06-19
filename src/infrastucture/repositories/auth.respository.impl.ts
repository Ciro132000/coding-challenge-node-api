import type { RegisterUserDto } from "../../domain/dtos/auth/register.user.dto.js";
import type { AuthDatasource, AuthRepository, LoginUserDto, UserEntity } from "../../domain/index.js";

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