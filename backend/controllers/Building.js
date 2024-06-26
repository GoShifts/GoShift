import Building from "../models/Building.js";

export const addBuilding = async (req, res) => {
  // console.log(req.body);
  // return;
  try {
    const building = await new Building(req.body).save();
    res.status(200).json(building);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const allBuildings = async (req, res) => {
  // console.log("all buildings");
  const { id } = req.params;
  try {
    const buildings = await Building.find({ userId: id }).select(
      "name type city"
    );
    // console.log(buildings);
    res.status(200).json(buildings);
  } catch (error) {
    res.status(500).send(error);
  }
};
