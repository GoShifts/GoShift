import mongoose from "mongoose";
const { Schema } = mongoose;
import User from "./User.js";

const staffSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
  }
  //   { timestamps: true }
);

const Staff = mongoose.model("Staff", staffSchema);

export default Staff;
