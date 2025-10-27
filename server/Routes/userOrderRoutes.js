const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const Order = require("../Models/OrderModel");
const Product = require("../Models/productModel");
const { buildShiprocketOrder } = require("../utils/shiprocketMapper");
const { createOrder } = require("../Services/Shiprocket");

// Get Order History for a User
router.post("/user-orders", async (req, res) => {
  const { email } = req.body;

  try {
    const orders = await Order.find({ customerEmail: email }).sort({
      orderDate: -1,
    });

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this user.",
      });
    }

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching orders.",
      error: error.message,
    });
  }
});

router.post("/newOrder", async (req, res) => {
  try {
    const {
      customerName,
      customerPhone,
      deliveryAddress,
      deliveryInstructions,
      deliveryCity,
      deliveryState,
      deliveryPincode,
      orderTotal,
      customerEmail,
      productsBought,
      paymentType = "UPI",
      razorpayOrderID,
      razorpayPaymentId,
      razorpaySignature,
      orderDate,
    } = req.body;

    for (const item of productsBought) {
      const product = await Product.findById(item.productID);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.productID}`,
        });
      }
      // Check stock for color and size
      const colorStock = product.productStock.get(item.productColour);
      if (!colorStock) {
        return res.status(400).json({
          success: false,
          message: `Color ${item.productColour} not found for ${product.productName}`,
        });
      }
      const currentStock = colorStock.get(item.size);
      if (!currentStock || currentStock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient Stock for ${product.productName} - Color ${item.productColour} - Size ${item.size}`,
        });
      }
    }

    for (const item of productsBought) {
      const product = await Product.findById(item.productID);
      const colorStock = product.productStock.get(item.productColour);
      colorStock.set(item.size, colorStock.get(item.size) - item.quantity);
      product.productStock.set(item.productColour, colorStock);
      await product.save();
    }

    const formattedProducts = await Promise.all(
      productsBought.map(async (item) => {
        const product = await Product.findById(item.productID);
        return {
          productID: product._id,
          productName: product.productName,
          productCategory: product.productCategory,
          productColour: item.productColour,
          size: item.size,
          quantity: item.quantity,
          price: item.price,
          productDiscount: item.productDiscount || 0,
        };
      })
    );

    const order = await Order.create({
      customerName,
      customerPhone,
      deliveryAddress,
      deliveryCity,
      deliveryState,
      deliveryPincode,
      deliveryInstructions,
      customerEmail,
      productsBought: formattedProducts,
      paymentType,
      orderTotal,
      razorpayOrderID,
      razorpayPaymentId,
      razorpaySignature,
      paymentStatus: "paid",
      orderStatus: "pending",
      orderDate,
    });

    try {
      const payload = buildShiprocketOrder(order);
      const srResponse = await createOrder(payload);

      order.shiprocket.shiprocketorderId = srResponse.order_id;
      order.shiprocket.shipmentId = srResponse.shipment_id;
      order.shiprocket.awbCode = srResponse.awb_code;
      await order.save();

    }catch(err){
      console.log("ShipRocket integration failed:", err.response?.data || err.message)
    }

    // Send order email (call EmailService directly)
    try {
      const {sendOrderEmail} = require("../EmailService");
      sendOrderEmail({
        name: order.customerName,
        id: order.orderID || order.id,
        total: order.orderTotal,
        items: order.productsBought.map((item) => ({
          name: item.productName,
          quantity: item.quantity,
        })),
        customerEmail: order.customerEmail,
        address: order.deliveryAddress,
        phone: order.customerPhone,
      });
    } catch (e) {
      console.error("Order email send failed:", e);
    }

    res.status(201).json({ success: true, message: "Order placed", order });
  } catch (error) {
    console.error("Error in /orderdata route:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
