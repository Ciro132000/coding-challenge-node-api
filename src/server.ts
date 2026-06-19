
import dotenv from "dotenv";
import { env } from "./config/env.js";
import { PostgresDatabase } from "./data/postgres/postgress-database.js";
import { AppRoutes } from "./presentation/routes.js";
import { ServerApp } from "./app.js";


// app.use("/api/statistics", statisticsRoutes);

(
    () => {
        main();
    }
)();

async function main() {

    dotenv.config();

    await PostgresDatabase.connect({
        databaseUrl: env.DATABASE_URL
    });

    // TODO: Init server
    new ServerApp({
        port: env.port,
        routes: AppRoutes.routes
    }).start();
}