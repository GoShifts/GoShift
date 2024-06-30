// routes/purchaseRoutes.js

import express from "express";

import { addSale,getSale } from "../controllers/Sell.js";
const sellRoutes = express.Router();

// POST request to add a new purchase
sellRoutes.post("/add", addSale);
sellRoutes.get("/all", getSale);



export default sellRoutes;
