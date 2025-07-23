const express = require('express');
const router = express.Router();
const Email = require('../EmailService.js');

router.post("/place-order", (req, res) => {
  const order = req.body;

  // Example order data validation (you can enhance this)
  if (
    !order.name ||
    !order.email ||
    !order.id ||
    !order.total ||
    !order.items
  ) {
    return res.status(400).send({ message: "Missing order data" });
  }

  // Send email
  Email({
    name: order.name,
    id: order.id,
    total: order.total,
    items: order.items,
    customerEmail: order.email,
  });

  // Respond to frontend
  res.status(200).send({ message: "Order placed successfully, email sent!" });
});