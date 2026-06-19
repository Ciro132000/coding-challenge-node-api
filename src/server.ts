import dotenv from "dotenv";
import app from "./app.js";
import { env } from "./config/env.js";

dotenv.config();

app.listen(env.port, () => {
  console.log(
    `Node API running on port ${env.port}`,
  );

  console.log(
    `Environment: ${env.nodeEnv}`,
  );
});