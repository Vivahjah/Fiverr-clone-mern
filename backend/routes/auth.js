import express from "express";
const router = express.Router();

import {login, register, logout} from "../controllers/auth.js"

//login
router.post("/login", login);

//signup
router.post("/register", register);

//logout
router.post("/logout", logout);

export default router;
