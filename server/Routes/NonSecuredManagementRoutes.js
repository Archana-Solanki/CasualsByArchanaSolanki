const express = require("express");
const router = express.Router();
const Product = require("../Models/productModel");
const Category = require("../Models/CategoryModel");

// Get all products
router.get("/all-products", async (req, res) => {
  try {
    const products = await Product.find({}).populate("productCategory", "name");
    res.json(products);
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Get all categories
router.get("/all-categories", async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Get product by ID
router.get("/displayByID/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(400).json({ success: false, message: "Product Not Found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
