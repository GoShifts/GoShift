import Room from "../models/Room.js";

export const addRoom = async (req, res) => {
  console.log(req.body);
  try {
    const room = await new Room(req.body).save();
    res.status(200).json(room);
  } catch (error) {
    res.status(500).send(error);
  }
};


export const allRooms = async (req, res) => {
  // console.log("all rooms");
  const { id } = req.params;

  try {
    const room = await Room.find({ userId: id }).populate("buildingId", "name");
    // const buildings = await doc.JSON();
    // console.log(typeof buildings);
    res.status(200).json(room);
  } catch (error) {
    res.status(500).send(error);
  }
};


export const allRoomsByBId = async (req, res) => {
  // console.log("all rooms");
  const { id } = req.params;

  try {
    const room = await Room.find({ buildingId: id });
    // const buildings = await doc.JSON();
    // console.log(typeof buildings);
    res.status(200).json(room);
  } catch (error) {
    res.status(500).send(error);
  }
};
