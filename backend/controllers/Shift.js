import Shift from "../models/Shift.js";

export const addShift = async (req, res) => {
  console.log(req.body);
  // return
  try {
    const room = await new Shift(req.body).save();

    res.status(200).json(room);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const allShifts = async (req, res) => {
  try {
    const shifts = await Shift.find({})
      .populate("buildingId", "name -_id")
      .exec();

    //   extract building name from object
    const modifiedShifts = shifts.map((shift) => ({
      ...shift.toObject(),
      buildingId: shift.buildingId.name,
    }));

    // modify date to local date format
    const formattedShifts = modifiedShifts.map((shift) => ({
      ...shift,
      date: new Date(shift.date)
        .toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\//g, "-"), // Replace slashes with dashes if needed
    }));

    // console.log(formattedShifts);
    res.status(200).json(formattedShifts);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const findShiftById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  //   return;
  try {
    const shifts = await Shift.find({ _id: id })
      .populate("buildingId", "name -_id")
      .populate({
        path: "staff.staffId",
        select: "name role",
      })
      .exec();

    //   extract building name from object
    const modifiedShifts = shifts.map((shift) => ({
      ...shift.toObject(),
      buildingId: shift.buildingId.name,
    }));

    // modify date to local date format
    const formattedShifts = modifiedShifts.map((shift) => ({
      ...shift,
      date: new Date(shift.date)
        .toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\//g, "-"), // Replace slashes with dashes if needed
    }));

    // Extract staff name and role from the staaf Array
    const modifiedResult = formattedShifts.map((shift) => ({
      ...shift,
      staff: shift.staff.map((member) => ({
        name: member.staffId.name,
        role: member.role,
      })),
    }));

    console.log(modifiedResult);
    res.status(200).json(modifiedResult);
  } catch (error) {
    res.status(500).send(error);
  }
};
