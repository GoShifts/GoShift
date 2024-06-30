// models/Purchase.js

import mongoose from "mongoose";
const { Schema } = mongoose;

const purchaseSchema = new Schema({
  itemName: { type: String, required: true },
  quantity: { type: Number, required: true },
  purchaseDate: { type: Date, required: true },
  pricePerUnit: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

const Purchase = mongoose.model("Purchase", purchaseSchema);

export default Purchase;
