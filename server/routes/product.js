import express from "express";
import Product from "../models/Product.js";
import { asyncHandler } from "../middleware/errorHandler.js";

const router = express.Router();

/**
 * GET /product/products
 * Fetch all products with transaction references
 */
router.get("/products", asyncHandler(async (_req, res) => {
    const products = await Product.find()
        .sort({ createdAt: -1 })
        .limit(100);

    res.status(200).json(products);
}));

export default router;