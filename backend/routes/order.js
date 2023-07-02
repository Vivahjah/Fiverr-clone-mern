import express from "express"
import { createOrders, getOrders } from "../controllers/order.js";
import { verifyToken } from "../middleware/verifyToken.js"

const router = express.Router();

router.get("/",verifyToken, getOrders)
router.post("/", verifyToken, createOrders)






export default router