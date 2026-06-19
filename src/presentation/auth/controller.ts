import type { Request, Response } from "express";
import { AuthRepository, CustomError, LoginUserDto } from "../../domain/index.js";
import { RegisterUserDto } from "../../domain/dtos/auth/register.user.dto.js";
import { JwtAdapter } from "../../config/jwt.js";

export class AuthController {

    constructor(
        private readonly authRepository: AuthRepository
    ) {}

    private handleError = (error: unknown, res: Response) => {
        if(error instanceof CustomError) {
            return res.status(error.statusCode).json({error: error.message});
        }

        res.status(500).json({ error: 'Internal Server Error' })
    }

    registerUser = (req: Request, res: Response) => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body);

        if(error) return res.status(400).json({ error });

        this.authRepository.register(registerUserDto!)
            .then(async user => res.json({user}))
            .catch(err => this.handleError(err, res))
    }

    loginUser = (req: Request, res: Response) => {
        const [error, loginUserDto] = LoginUserDto.create(req.body);

        if(error) return res.status(400).json({ error });

        this.authRepository.login(loginUserDto!)
            .then(async user => res.json({token: await JwtAdapter.generateToken({id: user.id})}))
            .catch(err => this.handleError(err, res))

    }

}