import express from "express";
import Transaction from "../models/Transaction.js";
import { asyncHandler } from "../middleware/errorHandler.js";

const router = express.Router();

/**
 * GET /transaction/transactions
 * Fetch recent transactions with pagination support
 * Query params: limit (default: 50), page (default: 1)
 */
router.get("/transactions", asyncHandler(async (req, res) => {
    const limit = parseInt(req.query.limit) || 50;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;

    const transactions = await Transaction.find()
        .sort({ createdOn: -1 })
        .limit(limit)
        .skip(skip);

    const total = await Transaction.countDocuments();

    res.status(200).json({
        data: transactions,
        pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
        },
    });
}));

export default router;