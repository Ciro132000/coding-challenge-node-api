import dotenv from "dotenv";
import { env } from "./config/env.js";
import { PostgresDatabase } from "./data/postgres/postgress-database.js";
import { AppRoutes } from "./presentation/routes.js";
import { ServerApp } from "./app.js";


// Función anónima autoejecutable que inicia el flujo principal de la aplicación
(
    () => {
        main();
    }
)();

/**
 * Función principal que orquesta la inicialización de los servicios y dependencias.
 * Se encarga de cargar variables de entorno, conectar a la base de datos y arrancar el servidor.
 */
async function main() {

    // Carga las variables de entorno desde el archivo .env
    dotenv.config();

    // Establece la conexión con la base de datos PostgreSQL usando Prisma
    await PostgresDatabase.connect({
        databaseUrl: env.DATABASE_URL
    });

    // Inicializa y arranca el servidor Express con las rutas y el puerto configurado
    new ServerApp({
        port: env.port,
        routes: AppRoutes.routes
    }).start();
}