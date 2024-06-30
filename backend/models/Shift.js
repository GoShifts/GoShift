import mongoose from "mongoose";
const { Schema } = mongoose;
import Staff from "./Staff.js";
import Building from "./Building.js";
import Room from "./Room.js";

const shiftSchema = new Schema(
  {
    date: { type: Date, required: true },
    time: { type: String, required: true },
    buildingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Building,
    },
    roomId: { // New field for referencing Room
      type: mongoose.Schema.Types.ObjectId,
      ref: Room,
    },
    staff: [
      {
        staffId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: Staff,
        },
        role: {
          type: "String",
          required: true,
        },
      },
    ],
  }
  //   { timestamps: true }
);

const Shift = mongoose.model("Shift", shiftSchema);

export default Shift;
