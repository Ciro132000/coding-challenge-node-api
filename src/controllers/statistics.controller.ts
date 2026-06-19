
import type { NextFunction, Request, Response } from "express";
import type { StatisticsRequest } from "../dtos/statistics.dto.js";
import statisticsService from "../services/statistics.service.js";

class StatisticsController {
  public calculate(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {

    try {

      const body = req.body as StatisticsRequest;

      const result = statisticsService.calculate(body);

      res.status(200).json(result);

    } catch (error) {
      next(error);
    }
  }
}

export default new StatisticsController();