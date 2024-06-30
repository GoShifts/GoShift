import express from "express";
import { addStaff, allStaff, staffLogin, getStaffShifts, getStaffProfile } from "../controllers/Staff.js";

const router = express.Router();

router.post("/add", addStaff);
router.get("/all/:id", allStaff);
router.post("/login", staffLogin);
router.get('/shifts/:id', getStaffShifts);
router.get('/profile/:id', getStaffProfile);

// router.get("/:id", verifyToken);

export default router;
