import type { LoginUserDto } from "../dtos/auth/login.user.dto.js";
import type { RegisterUserDto } from "../dtos/auth/register.user.dto.js";
import type { UserEntity } from "../entities/user.entity.js";


export abstract class AuthDatasource {

    abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;

    abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;

}