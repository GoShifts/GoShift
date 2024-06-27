import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/Auth.js";
import buildingRouter from "./routes/Building.js";
import roomRouter from "./routes/Room.js";
import staffRouter from "./routes/Staff.js";
import shiftRouter from "./routes/Shift.js";
import cors from "cors";
import environment from "./utils/environment.js";

const app = express();
dotenv.config();

// middleware
app.use(express.json());
app.use(cors(['http://avoda.ai/','https://avoda.ai/', 'http://www.avoda.ai/']));

// db connection
connectDb().catch((err) => console.log(err));
async function connectDb() {
  await mongoose.connect(environment.MONGO_URI);
  console.log("Database Connected");
}

app.use("/auth", authRouter);
app.use("/building", buildingRouter);
app.use("/room", roomRouter);
app.use("/staff", staffRouter);
app.use("/shift", shiftRouter);

const port = environment.PORT || 8000;
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
