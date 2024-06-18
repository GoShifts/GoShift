import Building from "../models/Building.js";

export const addBuilding = async (req, res) => {
  console.log(req.body);
  try {
    const building = await new Building(req.body).save();
    res.status(200).json(building);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const allBuildings = async (req, res) => {
  console.log("all buildings");
  try {
    const buildings = await Building.find({}).select("name type city");
    // const buildings = await doc.JSON();
    // console.log(typeof buildings);
    res.status(200).json(buildings);
  } catch (error) {
    res.status(500).send(error);
  }
};
