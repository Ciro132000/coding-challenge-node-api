import express from "express";
import cors from "cors";


import statisticsRoutes from "./routes/statistics.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import { env } from "./config/env.js";

const app = express();

app.use(
  cors({
    origin: env.corsOrigin,
  }),
);
app.use(express.json());

app.use("/api/statistics", statisticsRoutes);

app.use(errorMiddleware);

export default app;