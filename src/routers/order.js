import express from "express";
import { createOrder, getAllOrder, getOrderById } from "../controllers/order";

const router = express.Router();

router.get("/", getAllOrder);
router.get("/:userId/:orderId", getOrderById);
router.post("/", createOrder);

export default router;
