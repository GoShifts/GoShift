import express from 'express';
import Building from '../models/Building.js';
import Room from '../models/Room.js';
import Sale from '../models/Sell.js';
import Shift from '../models/Shift.js';
import Staff from '../models/Staff.js';

const dashRoutes = express.Router();

// Route to get the required statistics
dashRoutes.get('/api/statistics/1', async (req, res) => {
    // res.json({msg:"here"});
    
  try {
    // Total number of staff
    const totalStaff = await Staff.countDocuments();

    // Total number of rooms
    const totalRooms = await Room.countDocuments();

    // Total number of shifts in the current month
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
    const totalShifts = await Shift.countDocuments({
      date: {
        $gte: startOfMonth,
        $lt: endOfMonth,
      },
    });

    // Total number of buildings
    const totalBuildings = await Building.countDocuments();

    // Total number of sales
    const totalSales = await Sale.countDocuments();

    // Return the statistics
    res.json({
      totalStaff,
      totalRooms,
      totalShifts,
      totalBuildings,
      totalSales,
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ error: 'Error fetching statistics' });
  }
});


dashRoutes.get('/shifts/weekly', async (req, res) => {
  try {
    const endOfWeek = new Date(); // Today
    const startOfWeek = new Date();
    startOfWeek.setDate(endOfWeek.getDate() - 6); // 7 days ago

    const weeklyShifts = await Shift.aggregate([
      { $match: { date: { $gte: startOfWeek, $lte: endOfWeek } } }, // Adjusted match stage
      { 
        $group: { 
          _id: { $dayOfWeek: "$date" }, 
          count: { $sum: 1 } 
        } 
      },
      { $sort: { "_id": 1 } },
      {
        $project: {
          dayOfWeek: "$_id",
          count: 1,
          _id: 0,
        }
      }
    ]);

    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    // Initialize result array with all days of the week set to 0
    const result = dayNames.map((day, index) => ({
      day,
      count: 0
    }));

    // Update result array with actual counts
    weeklyShifts.forEach(shift => {
      result[shift.dayOfWeek - 1].count = shift.count;
    });

    res.json(result);
  } catch (error) {
    console.error('Error fetching weekly shifts:', error);
    res.status(500).json({ error: 'Error fetching weekly shifts' });
  }
});



// Get sales distribution by building
dashRoutes.get('/sales/building-distribution', async (req, res) => {
  try {
    const salesData = await Sale.aggregate([
      { $group: { _id: "$buildingname", totalSales: { $sum: { $multiply: ["$quantity", "$pricePerUnit"] } } } }
    ]);

    const formattedData = salesData.map((sale, index) => ({
      title: sale._id,
      value: sale.totalSales,
      color: `rgba(${index * 30}, ${index * 60}, ${index * 90}, 0.5)`, // Lighter color
    }));

    res.json(formattedData);
  } catch (error) {
    console.error('Error fetching sales distribution:', error);
    res.status(500).json({ error: 'Error fetching sales distribution' });
  }
});

// Get shifts distribution by staff
dashRoutes.get('/shifts/staff-distribution', async (req, res) => {
  try {
    const shiftData = await Shift.aggregate([
      { $unwind: "$staff" },
      { $group: { _id: "$staff.staffId", totalShifts: { $sum: 1 } } },
      {
        $lookup: {
          from: 'staffs', // The collection name for Staff model
          localField: '_id',
          foreignField: '_id',
          as: 'staffDetails'
        }
      },
      { $unwind: "$staffDetails" },
      { $project: { totalShifts: 1, "staffDetails.name": 1 } }
    ]);

    const formattedData = shiftData.map((shift, index) => ({
      title: shift.staffDetails.name,
      value: shift.totalShifts,
      color: `rgba(${index * 50}, ${index * 100}, ${index * 150}, 0.5)`, // Lighter color
    }));

    res.json(formattedData);
  } catch (error) {
    console.error('Error fetching shifts distribution:', error);
    res.status(500).json({ error: 'Error fetching shifts distribution' });
  }
});



export default dashRoutes;