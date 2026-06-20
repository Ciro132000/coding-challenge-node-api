import type { Request, Response, NextFunction } from "express";
import { AuthRepository, CustomError, LoginUserDto } from "../../domain/index.js";
import { RegisterUserDto } from "../../domain/dtos/auth/register.user.dto.js";
import { JwtAdapter } from "../../config/jwt.js";

export class AuthController {

    constructor(
        private readonly authRepository: AuthRepository
    ) {}



    registerUser = (req: Request, res: Response, next: NextFunction) => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body);

        if(error) return res.status(400).json({ error });

        this.authRepository.register(registerUserDto!)
            .then(async user => res.json({user}))
            .catch(next)
    }

    loginUser = (req: Request, res: Response, next: NextFunction) => {
        const [error, loginUserDto] = LoginUserDto.create(req.body);

        if(error) return res.status(400).json({ error });

        this.authRepository.login(loginUserDto!)
            .then(async user => res.json({token: await JwtAdapter.generateToken({id: user.id})}))
            .catch(next)

    }

}