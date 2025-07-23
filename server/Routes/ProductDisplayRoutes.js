const express = require("express");
const router = express.Router();
const Product = require("../Models/productModel")

router.get("/home-male-products", async (req, res) => {
  try {
    const products = await Product.find({
      displayAt: "home",
      productGender: { $in: ["Men", "Unisex"] }
    }).populate("productCategory", "name");
    res.json(products);
  } catch (error) {
    console.log("Error in displaying home male products: ", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

router.get("/home-female-products", async (req, res) => {
  try {
    const products = await Product.find({
      displayAt: "home",
      productGender: { $in: ["Women", "Unisex"] }
    }).populate("productCategory", "name");
    res.json(products);
  } catch (error) {
    console.log("Error in displaying home female products: ", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});
module.exports = router;