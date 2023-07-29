import express from "express";
import {  getOrders, pay } from "../controllers/order.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getOrders);
// router.post("/:id", verifyToken, createOrder);
router.post("/acceptpayment/:id", verifyToken, pay);

export default router;
