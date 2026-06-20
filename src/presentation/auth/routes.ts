import { Router } from "express";
import { AuthDataSourceImp } from "../../infrastucture/datasources/auth.datasource.impl.js";
import { AuthRepositoryImpl } from "../../infrastucture/repositories/auth.respository.impl.js";
import { AuthController } from "./controller.js";

/**
 * Clase encargada de configurar y proveer las rutas relacionadas con la autenticación.
 */
export class AuthRoutes {

    /**
     * Obtiene el enrutador configurado con las rutas de autenticación (login, register).
     * Aplica inyección de dependencias para enlazar el controlador con el repositorio y el datasource.
     * @returns {Router} Instancia de Router de Express configurada para autenticación.
     */
    static get routes(): Router {
        const router = Router();
        
        // Inyección de dependencias manual
        const datasource = new AuthDataSourceImp();
        const authRepository = new AuthRepositoryImpl(datasource);
        const controller = new AuthController(authRepository);
        
        // Definir las rutas específicas del módulo de autenticación
        router.post('/login', controller.loginUser);
        router.post('/register', controller.registerUser);

        return router;
    }

}