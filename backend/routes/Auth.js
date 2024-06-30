import express from "express";
import {
  loginUser,
  registerUser,
  verifyToken,
  forgotPassword,
  resetPassword,
  staffforgotPassword,
  satffresetPassword
} from "../controllers/User.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id/verify/:token/", verifyToken);
router.post("/forgot", forgotPassword);
router.post("/staffforgot", staffforgotPassword);
router.post("/reset/:id", resetPassword);
router.post("/reset/staff/:id", satffresetPassword);

export default router;
