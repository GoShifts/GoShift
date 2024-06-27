import express from "express";
import { addRoom, allRooms } from "../controllers/Room.js";

const router = express.Router();

router.post("/add", addRoom);
router.get("/all/:id", allRooms);
// router.get("/:id", verifyToken);

export default router;
