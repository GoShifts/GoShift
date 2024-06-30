// routes/purchaseRoutes.js

import express from "express";
import { addPurchase,getAllPurchasesByUserId } from "../controllers/Purchase.js";

const purchaseRoutes = express.Router();

// POST request to add a new purchase
purchaseRoutes.post("/add", addPurchase);
purchaseRoutes.get("/all/:userId", getAllPurchasesByUserId);


export default purchaseRoutes;
