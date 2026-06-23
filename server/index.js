import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import kpiRoutes from "./routes/kpi.js";
import transactionRoutes from "./routes/transactionRoutes.js"
import KPI from "./models/KPI.js";
import { kpis, products, transactions } from "./data/data.js";
import productRoutes from "./routes/product.js"
import Product from "./models/Product.js";
import Transaction from "./models/Transaction.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import { apiLimiter, sanitizeInput } from "./middleware/security.js";

// CONFIGURATIONS
dotenv.config();
const app = express();

// Security middleware
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin'}));
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
    credentials: true,
}));
app.use(apiLimiter);
app.use(sanitizeInput);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));

// Logging middleware
app.use(morgan("combined"));


// Health check endpoint
app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// API Routes
app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);
app.use("/transaction", transactionRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// MONGOOSE SETUP
const PORT = process.env.PORT || 9000;

mongoose
    .connect(process.env.MONGO_URL)
    .then(async ()=> {
        app.listen(PORT, ()=> console.info(`✓ Server running on port ${PORT}`));
        console.info('✓ Database connected successfully');

        // ADDING THE SEED DATA FOR PRODUCTION
        // await mongoose.connection.db.dropDatabase();
        // KPI.insertMany(kpis);
        // Product.insertMany(products);
        // Transaction.insertMany(transactions);
    })
    .catch((error)=> {
        console.error('✗ Database connection failed:', error.message);
        process.exit(1);
    });