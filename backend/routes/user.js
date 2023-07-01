import express from "express";

const router = express.Router();

import { deleteUser, getUser } from "../controllers/user.js";
import { verifyToken } from "../middleware/verifyToken.js";

router.delete("/:id", verifyToken, deleteUser);
router.get("/:id",  getUser);

export default router;
