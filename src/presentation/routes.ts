import { Router } from "express";
import { AuthRoutes } from "./auth/routes.js";
import { MatrixRoutes } from "./matrix/routes.js";
import { GeneralRoutes } from "./general/routes.js";


/**
 * Clase principal que define y agrupa las rutas de toda la aplicación.
 */
export class AppRoutes {

    /**
     * Obtiene el enrutador principal con todas las sub-rutas configuradas.
     * @returns {Router} Instancia de Router de Express configurada.
     */
    static get routes(): Router {
        const router = Router();
        
        // Definir todas mis rutas principales divididas por dominio/módulo
        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/statistics', MatrixRoutes.routes);
        router.use('/api/', GeneralRoutes.routes);

        return router;
    }

}