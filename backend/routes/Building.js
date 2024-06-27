import express from "express";
import { addBuilding, allBuildings } from "../controllers/Building.js";

const router = express.Router();

router.post("/add", addBuilding);
router.get("/all/:id", allBuildings);
// router.get("/:id", verifyToken);

export default router;
