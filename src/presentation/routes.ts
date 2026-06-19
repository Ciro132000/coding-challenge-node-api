import { Router } from "express";
import { AuthRoutes } from "./auth/routes.js";
import { MatrixRoutes } from "./matrix/routes.js";


export class AppRoutes {

    static get routes(): Router {
        const router = Router();
        
        // Definir todas mis rutas principales
        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/statistics', MatrixRoutes.routes)

        return router;
    }

}