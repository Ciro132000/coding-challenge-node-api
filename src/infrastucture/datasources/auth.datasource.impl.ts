import { BcryptAdapter } from "../../config/bcrypt.js";
import { PostgresDatabase } from "../../data/postgres/postgress-database.js";
import type { RegisterUserDto } from "../../domain/dtos/auth/register.user.dto.js";
import { CustomError, type AuthDatasource, type LoginUserDto, type UserEntity } from "../../domain/index.js";
import { UserMapper } from "../mappers/user.mapper.js";

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthDataSourceImp implements AuthDatasource {

    constructor(
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare         
    ){}

    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {

        const { email, password } = loginUserDto;

        try {
            const user = await PostgresDatabase.prisma.user.findUnique({
                where: {
                    email,
                },
            });

            if(!user) throw CustomError.badRequest('Incorrect credentials');

            if(!this.comparePassword(password, user.password)) throw CustomError.badRequest('Incorrect credentials');

            return UserMapper.userEntityFromObject(user);
        } catch (error) {
            if(error instanceof CustomError) {
                throw error;
            }

            throw CustomError.internalServer();
        }
    }

    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        
        const { name, email, password } = registerUserDto;

        try {

            const exist = await PostgresDatabase.prisma.user.findUnique({
                where: {
                    email,
                },
            });

            if(exist) throw CustomError.badRequest('User already exist');

            const user = await PostgresDatabase.prisma.user.create({
                data: {
                    name,
                    email,
                    password: this.hashPassword(password),
                },
            });


            return UserMapper.userEntityFromObject(user);
        } catch (error) {
            if(error instanceof CustomError) {
                throw error;
            }

            throw CustomError.internalServer();
        }
    }

}