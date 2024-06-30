// controllers/purchaseController.js

import Purchase from "../models/Purchase.js";

// Controller function to add new purchase
const addPurchase = async (req, res) => {
  const { name, numberOfItems, date, pricePerUnit, userId } = req.body;

  try {
    const newPurchase = new Purchase({
      itemName:name,
      quantity:numberOfItems,
      purchaseDate:date,
      pricePerUnit,
      userId,
    });
    // res.status(201).json(newPurchase);

    const savedPurchase = await newPurchase.save();
    res.status(201).json(savedPurchase);
  } catch (error) {
    console.error("Error adding purchase:", error);
    res.status(500).json({ error: "Failed to add purchase" });
  }
};


// Controller function to get all purchases by userId
const getAllPurchasesByUserId = async (req, res) => {
  const userId = req.params.userId;

  try {
    const purchases = await Purchase.find({ userId });
    res.status(200).json(purchases);
  } catch (error) {
    console.error("Error fetching purchases:", error);
    res.status(500).json({ error: "Failed to fetch purchases" });
  }
};

export { addPurchase, getAllPurchasesByUserId };