import Shift from "../models/Shift.js";

export const addShift = async (req, res) => {
  const { date, time, buildingId, roomId, staff } = req.body;

  try {
    // Check if there's already a shift in the same building and room at the specified date and time
    const existingShift = await Shift.findOne({
      date: { $eq: date },
      time: { $eq: time },
      buildingId: { $eq: buildingId },
      roomId: { $eq: roomId },
    });
    
    // return res.status(400).json({ error: date + time + buildingId + roomId});

    if (existingShift) {
      return res.status(400).json({ error: "Room is already allocated at that date and time in this building." });
    }

    // Check staff availability
    for (const member of staff) {
      const existingStaffShift = await Shift.findOne({
        date: { $eq: date },
        time: { $eq: time },
        "staff.staffId": { $eq: member.staffId },
      }).populate('staff.staffId', 'name');

      if (existingStaffShift) {
          const staffMember = existingStaffShift.staff.find(staffEntry => staffEntry.staffId._id.equals(member.staffId));
      const staffName = staffMember.staffId.name;
        return res.status(400).json({ error: `${staffName} is already allocated at that date and time.` });
      }
    }

    // All checks passed, create the shift
    const newShift = await new Shift(req.body).save();
    res.status(200).json(newShift);
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
      .populate("roomId", "number -_id")
      .populate({
        path: "staff.staffId",
        select: "name role",
      })
      .exec();

    //   extract building name from object
    const modifiedShifts = shifts.map((shift) => ({
      ...shift.toObject(),
      buildingId: shift.buildingId.name,
      roomId:shift.roomId? shift.roomId.number : "No Specified",
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
