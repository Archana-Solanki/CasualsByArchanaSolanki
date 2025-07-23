const mongoose = require("mongoose");
const orderCounterModel = require("./orderCounter");

const productSchema = new mongoose.Schema({
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  productName: {
    type: String, 
    required: true,
  },
  productCategory: {
    type: String,
  },
  productColour: {
    type: String,
  },
  size: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  productDiscount: {
    type: Number,
    default: 0,
  },
});

const orderSchema = new mongoose.Schema({
  orderID: {
    type: String,
    unique: true,
  },

  customerName: {
    type: String,
  },

  customerEmail: {
    type: String,
    match: /.+\@.+\..+/,
  },

  customerPhone: {
    type: String,
    required: true,
  },

  productsBought: {
    type: [productSchema],
    required: true,
  },

  orderTotal: {
    type: Number,
  },

  paymentType: {
    type: String,
    enum: ["Cash", "UPI", "Other"],
    required: true,
  },

  razorpayOrderID: {
    type: String,
  },

  razorpayPaymentId: {
    type: String,
  },

  razorpaySignature: {
    type: String,
  },

  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending",
  },

  orderStatus: {
    type: String,
    enum: ["pending", "delivered", "cancelled"],
    default: "pending",
  },

  deliveryAddress: {
    type: String,
    required: true,
  },

  deliveryInstructions: {
    type: String,
  },

  orderDate: {
    type: Date,
    default: Date.now,
  },
});

orderSchema.pre("save", async function (next) {
  if (this.isNew) {
    const orderCounter = await orderCounterModel.findOneAndUpdate(
      { id: "orderID" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.orderID = `ORD${orderCounter.seq}`;
  }
  next();
});

module.exports = mongoose.model("Order", orderSchema);
