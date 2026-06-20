import type { ErrorRequestHandler } from "express";
import { CustomError } from "../../domain/index.js";
import { LoggerAdapter } from "../../config/logger.adapter.js";

export const errorMiddleware: ErrorRequestHandler = (
  err,
  _req,
  res,
  _next
) => {

  if (err instanceof CustomError) {
    LoggerAdapter.error(`[CustomError] ${err.statusCode} - ${err.message}`);
    return res.status(err.statusCode).json({ error: err.message });
  }

  LoggerAdapter.error("Internal Server Error", err);

  res.status(500).json({
    error: "Internal server error",
  });
};