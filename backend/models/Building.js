import mongoose from "mongoose";
const { Schema } = mongoose;
import User from "./User.js";

const buildingSchema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    zip: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
  }
  //   { timestamps: true }
);

// buildingSchema.index({ email: 1 }, { unique: true });

// const virtual = buildingSchema.virtual("id");
// virtual.get(function () {
//   return this._id;
// });
// buildingSchema.set("toJSON", {
//   virtuals: true,
//   versionKey: false,
//   transform: function (doc, ret) {
//     delete ret._id;
//   },
// });

const Building = mongoose.model("Building", buildingSchema);

// User.init()
//   .then(() => console.log("Indexes are created successfully"))
//   .catch((err) => console.error("Index creation error:", err));

export default Building;
