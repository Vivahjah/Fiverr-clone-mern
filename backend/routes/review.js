import express from "express"
import { creatReview, getReviews, deleteReview } from "../controllers/review.js";
import { verifyToken } from "../middleware/verifyToken.js"

const router = express.Router();

router.get("/:id", getReviews)
router.post("/", verifyToken, creatReview)
router.delete("/:id", verifyToken, deleteReview)





export default router