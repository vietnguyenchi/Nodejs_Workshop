import express from "express";
import cors from "cors";
import authRouter from "./routers/auth";
import connectDB from "./config/db";
import dotenv from "dotenv";
import morgan from "morgan";
import productRouter from "./routers/product";
import categoryRouter from "./routers/category";
import cartRouter from "./routers/cart";


// Middleware
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

// Connect to database
connectDB(process.env.DB_URI);

// Routers
app.use("/api/v1", authRouter);
app.use("/api/v1", productRouter);
app.use("/api/v1", categoryRouter);
app.use("/api/v1", cartRouter);

export const viteNodeApp = app;