
import Sale from "../models/Sell.js";

const addSale = async (req, res) => {
    try {
    const sellData = req.body;
// res.json(sellData);
    
    // Create new inventory instance
    const newInventory = new Sale({
      itemName: sellData.itemName,
      pricePerUnit: sellData.pricePerUnit,
      quantity: sellData.quantity,
      saleDate: sellData.saleDate,
      staff: sellData.staff,
      room: sellData.room,
      buildingname: sellData.buildingId,
    });

    // Save inventory item to the database
    const savedInventory = await newInventory.save();

    res.json(savedInventory);
  } catch (error) {
    console.error('Error selling inventory:', error);
    res.status(500).json({ error: 'Error selling inventory' });
  }
}


const getSale = async (req, res) => {
  try {
    const sales = await Sale.find(); // Fetch all sales data
    res.json(sales);
  } catch (error) {
    console.error('Error fetching sales:', error);
    res.status(500).json({ error: 'Error fetching sales' });
  }
}


export { addSale, getSale };