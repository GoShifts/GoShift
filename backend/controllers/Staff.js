import Staff from "../models/Staff.js";

export const addStaff = async (req, res) => {
  console.log(req.body);
  try {
    const staff = await new Staff(req.body).save();
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).send(error);
  }
};
export const allStaff = async (req, res) => {
  console.log("all staff");
  try {
    const staff = await Staff.find({}).select("name role");
    console.log(staff);
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).send(error);
  }
};
