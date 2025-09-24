const express = require("express");
const { createOrder, generateLabel, trackOrder } = require("../Services/Shiprocket.js");

const router = express.Router();

// Create Order
router.post("/shiprocket-order", async (req, res) => {
  try {
    const orderPayload = req.body; // comes from frontend
    const result = await createOrder(orderPayload);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

// Generate Label
router.post("/label/:shipmentId", async (req, res) => {
  try {
    const { shipmentId } = req.params;
    const result = await generateLabel(shipmentId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

// Track Order
router.get("/track/:awb", async (req, res) => {
  try {
    const { awb } = req.params;
    const result = await trackOrder(awb);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

module.exports = router;
