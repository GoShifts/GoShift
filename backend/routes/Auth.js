import express from "express";
import { loginUser, registerUser, verifyToken } from "../controllers/User.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get('/:id/verify/:token/', verifyToken)

export default router;
