import express from "express";
import { addRoom, allRooms, allRoomsByBId } from "../controllers/Room.js";

const router = express.Router();

router.post("/add", addRoom);
router.get("/all/:id", allRooms);
router.get("/bid/:id", allRoomsByBId);
// router.get("/:id", verifyToken);

export default router;
