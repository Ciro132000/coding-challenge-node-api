import type { NextFunction, Request, Response } from "express";

export class GeneralController {


    ping = (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200).json({status: "ok"});
        } catch (error) {
            next(error);
        }
    }


}