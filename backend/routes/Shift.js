import express from "express";
import { addShift, allShifts, findShiftById } from "../controllers/Shift.js";

const router = express.Router();

router.post("/add", addShift);
router.get("/all", allShifts);
router.get("/:id", findShiftById);

export default router;
