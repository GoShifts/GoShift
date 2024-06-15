import express from "express";
import {
  loginUser,
  registerUser,
  verifyToken,
  forgotPassword,
  resetPassword,
} from "../controllers/User.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id/verify/:token/", verifyToken);
router.post("/forgot", forgotPassword);
router.post("/reset/:id/:token", resetPassword);

export default router;
