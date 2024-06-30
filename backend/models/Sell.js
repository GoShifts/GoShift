
import mongoose from "mongoose";
const { Schema } = mongoose;
import Building from "./Building.js";
import User from "./User.js";

const roomSchema = new Schema(
  {
    itemName: { type: String, required: true },
    pricePerUnit: { type: Number, required: true },
    quantity: { type: Number, required: true },
    saleDate: { type: Date, required: true },
    staff: { type: String, required: true }, // Assuming staff name for simplicity
  room: { type: String, required: true }, // Assuming room name for simplicity
  buildingname: { type: String, required: true }, // Assuming room name for simplicity
  }
  //   { timestamps: true }
);

const Sale = mongoose.model("Sale", roomSchema);

export default Sale;
