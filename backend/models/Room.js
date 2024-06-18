import mongoose from "mongoose";
const { Schema } = mongoose;

const roomSchema = new Schema(
  {
    number: { type: String, required: true },
    type: { type: String, required: true },
    status: { type: String, required: true },
    bedType: { type: String, required: true },
    building: { type: String, required: true },
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: User,
    // },
  }
  //   { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;
