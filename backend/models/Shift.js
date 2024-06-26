import mongoose from "mongoose";
const { Schema } = mongoose;
import Staff from "./Staff.js";
import Building from "./Building.js";

const shiftSchema = new Schema(
  {
    date: { type: Date, required: true },
    time: { type: String, required: true },
    buildingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Building,
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
