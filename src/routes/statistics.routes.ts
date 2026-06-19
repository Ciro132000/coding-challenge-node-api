import { Router } from "express";

import statisticsController from "../controllers/statistics.controller.js";

const router = Router();

router.post(
  "/",
  statisticsController.calculate
);

export default router;