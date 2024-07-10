import Staff from "../models/Staff.js";
import controller_constants from "./constants.js";
export const addStaff = async (req, res) => {
  console.log(req.body);
  try {
    const staff = await new Staff(req.body).save();
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).send({ message: controller_constants.addStaff500 + error });
  }
};
export const allStaff = async (req, res) => {
  // console.log("all staff");
  const { id } = req.params;
  try {
    const staff = await Staff.find({ userId: id }).select("name role");
    // console.log(staff);
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).send({ message: controller_constants.getStaff500 + error });
  }
};
