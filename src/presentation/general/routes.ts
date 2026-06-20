import { Router } from "express";
import { GeneralController } from "./controller.js";


export class GeneralRoutes {

    static get routes(): Router {
        const router = Router();
        const controller = new GeneralController();
        
        router.get('/ping', controller.ping);

        return router;
    }

}