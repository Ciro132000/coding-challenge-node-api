import { Router } from "express";
import { AuthDataSourceImp } from "../../infrastucture/datasources/auth.datasource.impl.js";
import { AuthRepositoryImpl } from "../../infrastucture/repositories/auth.respository.impl.js";
import { AuthController } from "./controller.js";

export class AuthRoutes {

    static get routes(): Router {
        const router = Router();
        const datasource = new AuthDataSourceImp();
        const authRepository = new AuthRepositoryImpl(datasource);
        const controller = new AuthController(authRepository);
        
        // Definir todas mis rutas principales
        router.post('/login', controller.loginUser);

        router.post('/register', controller.registerUser);

        return router;
    }

}