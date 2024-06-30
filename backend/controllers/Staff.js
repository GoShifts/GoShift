import Staff from "../models/Staff.js";
import Shift from '../models/Shift.js'; // Adjust the path as necessary
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


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
  // console.log("all staff");
  const { id } = req.params;
  try {
    const staff = await Staff.find({ userId: id }).select("name role");
    // console.log(staff);
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).send(error);
  }
};



const generateToken = (id) => {
  return jwt.sign({ id }, "fluffy", {
    expiresIn: '30d',
  });
};

export const staffLogin = async (req, res) => {
    
  const { email, password } = req.body;
  
  try {
    const staff = await Staff.findOne({ email });
    if (!staff) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = (password == staff.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({
      staffId: staff._id,
      name: staff.name,
      role: staff.role,
      token: generateToken(staff._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};






export const getStaffShifts = async (req, res) => {
  const { id } = req.params;
 
  try {
    // Find shifts for the specified staff member
    const shifts = await Shift.find({ 'staff.staffId': id })
      .populate({
        path: 'buildingId',
        select: 'name', // Select the building name
      })
      .populate({
        path: 'roomId',
        select: 'number', // Select the room number
      })
      .populate('staff.staffId'); // Populate staff information

    const currentDate = new Date();
    const upcomingShifts = [];
    const passedShifts = [];
    
    // res.status(200).json(shifts);

    // Separate shifts into upcoming and passed
    shifts.forEach(shift => {
      const shiftDetail = {
        date: shift.date,
        time: shift.time,
        roomNumber: shift.roomId ? shift.roomId.number : 'Not specified',
        buildingName: shift.buildingId ? shift.buildingId.name : 'Not specified',
      };

      if (new Date(shift.date) >= currentDate) {
        upcomingShifts.push(shiftDetail);
      } else {
        passedShifts.push(shiftDetail);
      }
    });

    res.status(200).json({ upcomingShifts, passedShifts });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export const getStaffProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const staff = await Staff.findById(id).select('-password'); // Exclude password field
    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }
    res.status(200).json(staff);
  } catch (error) {
    console.error('Error fetching staff profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

