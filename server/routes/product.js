import express from "express";
import products from "../models/products.js";

const router = express.Router();

router.get("/products", async (req, res) => {
    try{
        const products = await products.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
});


export default router;