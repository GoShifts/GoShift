import express from "express";
import { addStaff, allStaff } from "../controllers/Staff.js";

const router = express.Router();

router.post("/add", addStaff);
router.get("/all/:id", allStaff);
// router.get("/:id", verifyToken);

export default router;
