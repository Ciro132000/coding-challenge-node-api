import type { NextFunction, Request, Response } from "express";

import statisticsService from "../../services/statistics.service.js";
import type { StatisticsRequest } from "../../domain/index.js";

export class MatrixController {


    statisticsMatrix = (req: Request, res: Response, next: NextFunction) => {
        try {

            const body = req.body as StatisticsRequest;

            const result = statisticsService.calculate(body);

            res.status(200).json(result);

        } catch (error) {
            next(error);
        }
    }


}