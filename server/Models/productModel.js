const mongoose = require("mongoose");
const Counter = require("./counter");

const ProductSchema = new mongoose.Schema(
  {
    productID: {
      type: Number,
      unique: true,
    },

    productName: {
      type: String,
      required: true,
    },

    productCost: {
      type: Number,
      required: true,
    },

    productCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    productGender: {
      type: String,
      enum: ["Men", "Women", "Unisex"],
      required: true,
    },

    productSize: {
      type: [String],
      required: true,
    },

    productColour: {
      type: [String],
      default: [],
    },

    isBestseller: {
      type: Boolean,
      default: false,
    },

    originalPrice: {
      type: Number,
    },

    productDescription: {
      type: String,
    },

    productImages: {
      type: [String],
      default: [],
    },

    productStock: {
      type: Map,
      of: {
        type: Map,
        of: Number,
      },
      required: true,
    },

    productDiscount: {
      type: Number,
      default: 0,
    },

    customerReviews: [
      {
        customerName: String,
        review: String,
        rating: {
          type: Number,
          min: 0,
          max: 5,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    displayAt: {
      type: String,
      enum: ["none", "home", "trending", "new-arrivals", "sale"],
      default: "none",
    },

    exchangePolicy: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

ProductSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { id: "productID" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.productID = counter.seq;
  }
  next();
});

module.exports = mongoose.model("Products", ProductSchema);
