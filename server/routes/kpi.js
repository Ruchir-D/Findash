import express from "express";
import KPI from "../models/KPI.js";
import { asyncHandler } from "../middleware/errorHandler.js";

const router = express.Router();

/**
 * GET /kpi/kpis
 * Fetch all KPI records with related data
 */
router.get("/kpis", asyncHandler(async (_req, res) => {
    const kpis = await KPI.find()
        .sort({ createdAt: -1 })
        .limit(100);

    res.status(200).json(kpis);
}));

export default router;