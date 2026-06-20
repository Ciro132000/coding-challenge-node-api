import { Router } from "express";
import { AuthRoutes } from "./auth/routes.js";
import { MatrixRoutes } from "./matrix/routes.js";
import { GeneralRoutes } from "./general/routes.js";


export class AppRoutes {

    static get routes(): Router {
        const router = Router();
        
        // Definir todas mis rutas principales
        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/statistics', MatrixRoutes.routes);
        router.use('/api/', GeneralRoutes.routes);

        return router;
    }

}