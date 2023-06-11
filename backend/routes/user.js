import express from "express";

const router = express.Router();

import { deleteUser } from "../controllers/user.js";
import { verifyToken } from "../middleware/verifyToken.js";

router.delete("/:id", verifyToken, deleteUser);

export default router;
