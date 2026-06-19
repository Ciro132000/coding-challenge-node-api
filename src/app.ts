import express, { Router } from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { errorMiddleware } from './presentation/middlewares/error.middleware.js';

interface Options {
    port?: number;
    routes: Router;
}

export class ServerApp {
    
    public readonly app = express();
    private readonly port: number;
    private readonly routes: Router;


    constructor(options: Options) {
        const { port = 3100, routes} = options;

        this.port = port;
        this.routes = routes;
    }

    async start() {
        // Middlewares
        this.app.use(
          cors({
            origin: env.corsOrigin,
          }),
        );
        this.app.use( express.json() );
        this.app.use( express.urlencoded({ extended: true }));
        this.app.use(errorMiddleware);
                
        // Definir las rutas
        this.app.use(this.routes);

        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`)
            console.log(`Environment: ${env.nodeEnv}`,);
        })
    }
}