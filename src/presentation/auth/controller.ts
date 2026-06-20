import type { Request, Response, NextFunction } from "express";
import { AuthRepository, CustomError, LoginUserDto } from "../../domain/index.js";
import { RegisterUserDto } from "../../domain/dtos/auth/register.user.dto.js";
import { JwtAdapter } from "../../config/jwt.js";

/**
 * Controlador para manejar las peticiones HTTP relacionadas con la autenticación de usuarios.
 */
export class AuthController {

    /**
     * @param authRepository - Repositorio de autenticación que maneja la lógica de datos y negocio.
     */
    constructor(
        private readonly authRepository: AuthRepository
    ) {}



    /**
     * Maneja la petición para registrar un nuevo usuario.
     * @param req - Objeto Request de Express.
     * @param res - Objeto Response de Express.
     * @param next - Función para pasar el control al siguiente middleware (manejador de errores).
     */
    registerUser = (req: Request, res: Response, next: NextFunction) => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body);

        if(error) return res.status(400).json({ error });

        this.authRepository.register(registerUserDto!)
            .then(async user => res.json({user}))
            .catch(next)
    }

    /**
     * Maneja la petición para iniciar sesión de un usuario existente.
     * @param req - Objeto Request de Express.
     * @param res - Objeto Response de Express.
     * @param next - Función para pasar el control al siguiente middleware (manejador de errores).
     */
    loginUser = (req: Request, res: Response, next: NextFunction) => {
        const [error, loginUserDto] = LoginUserDto.create(req.body);

        if(error) return res.status(400).json({ error });

        this.authRepository.login(loginUserDto!)
            .then(async user => res.json({token: await JwtAdapter.generateToken({id: user.id})}))
            .catch(next)

    }

}