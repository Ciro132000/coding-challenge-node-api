import dotenvFlow from "dotenv-flow";

dotenvFlow.config();

function getEnv(
  key: string,
  defaultValue?: string,
): string {

  const value = process.env[key];

  if (!value) {

    if (defaultValue !== undefined) {
      return defaultValue;
    }

    throw new Error(
      `Missing environment variable: ${key}`,
    );
  }

  return value;
}

export const env = {
  nodeEnv: getEnv(
    "NODE_ENV",
    "development",
  ),

  port: Number(
    getEnv("PORT", "3001"),
  ),

  corsOrigin: getEnv(
    "CORS_ORIGIN",
    "*",
  ),

  isDevelopment:
    getEnv("NODE_ENV", "development") === "development",

  isProduction:
    getEnv("NODE_ENV", "development") === "production",
};