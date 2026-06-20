import express, { Router } from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { errorMiddleware } from './presentation/middlewares/error.middleware.js';

/**
 * Interfaz que define las opciones de configuración para inicializar el servidor.
 */
interface Options {
    /** Puerto en el cual el servidor escuchará las peticiones HTTP. */
    port?: number;
    /** Rutas principales de la aplicación. */
    routes: Router;
}

/**
 * Clase que representa la aplicación principal del servidor.
 * Se encarga de configurar Express, los middlewares, las rutas y manejar el ciclo de vida del servidor.
 */
export class ServerApp {
    
    /** Instancia de la aplicación Express. */
    public readonly app = express();
    /** Puerto de escucha del servidor. */
    private readonly port: number;
    /** Enrutador principal de la aplicación. */
    private readonly routes: Router;


    /**
     * Crea una instancia del servidor.
     * @param options - Opciones de configuración del servidor (puerto y rutas).
     */
    constructor(options: Options) {
        const { port = 3100, routes} = options;

        this.port = port;
        this.routes = routes;
    }

    /**
     * Inicia el servidor, configurando los middlewares, rutas y el manejador de errores.
     * También pone a la aplicación a escuchar en el puerto especificado.
     * @returns Una promesa que se resuelve cuando el servidor ha iniciado.
     */
    async start() {
        // Middlewares: Configuraciones que se ejecutan antes de llegar a las rutas
        this.app.use(
          cors({
            origin: env.corsOrigin,
          }),
        );
        // Middleware para parsear el cuerpo de las peticiones a formato JSON
        this.app.use( express.json() );
        // Middleware para parsear datos enviados desde formularios (application/x-www-form-urlencoded)
        this.app.use( express.urlencoded({ extended: true }));
        
        // Definir las rutas principales de la API
        this.app.use(this.routes);

        // Error Middleware: Captura y maneja excepciones globales para dar respuestas consistentes
        this.app.use(errorMiddleware);

        // Levantar el servidor en el puerto asignado
        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`)
            console.log(`Environment: ${env.nodeEnv}`,);
        })
    }
}