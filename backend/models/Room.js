import mongoose from "mongoose";
const { Schema } = mongoose;
import Building from "./Building.js";
import User from "./User.js";

const roomSchema = new Schema(
  {
    number: { type: String, required: true },
    type: { type: String, required: true },
    status: { type: String, required: true },
    bedType: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
    buildingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Building,
    },
  }
  //   { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;
