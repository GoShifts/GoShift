import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/Auth.js";
import buildingRouter from "./routes/Building.js";
import roomRouter from "./routes/Room.js";
import staffRouter from "./routes/Staff.js";
import cors from "cors";

const app = express();
dotenv.config();

// middleware
app.use(express.json());
app.use(cors());

// db connection
connectDb().catch((err) => console.log(err));
async function connectDb() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Database Connected");
}

app.use("/auth", authRouter);
app.use("/building", buildingRouter);
app.use("/room", roomRouter);
app.use("/staff", staffRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
