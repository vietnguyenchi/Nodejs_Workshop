import express from "express";
import authRouter from "./auth";
import categoryRouter from "./category";
import cartRouter from "./cart";
import productRouter from "./product";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use("/cart", cartRouter);

export default router;