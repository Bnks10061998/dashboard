import express from "express";
import { signup, login } from "../Controllers/auth/authContoller.js";

const router = express.Router();

// POST /api/signup
router.post("/signup", signup);

// POST /api/login
router.post("/login", login);

export default router;
