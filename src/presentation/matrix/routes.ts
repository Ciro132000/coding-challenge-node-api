import { Router } from "express";
import { MatrixController } from "./controller.js";

export class MatrixRoutes {

    static get routes(): Router {
        const router = Router();
        const controller = new MatrixController();
        
        router.post('/', controller.statisticsMatrix);

        return router;
    }

}