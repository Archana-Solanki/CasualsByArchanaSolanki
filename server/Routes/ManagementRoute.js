const express = require("express");
const multer = require("multer");
const router = express.Router();
const Product = require("../Models/productModel");
const Order = require("../Models/OrderModel");
const Category = require("../Models/CategoryModel");
const { storage } = require("../config/cloudinaryConfig");
const upload = multer({ storage });
const authenticateToken = require("../Middleware/auth");
const User = require("../Models/userModel");

// Admin check middleware
async function requireAdmin(req, res, next) {
  try {
    const userId = req.user && req.user.id ? req.user.id : req.user && req.user._id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });
    const user = await User.findById(userId);
    if (!user || user.userRole !== "admin") {
      return res.status(403).json({ error: "Admin access required" });
    }
    next();
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

// 🔸 Add Product Route
router.post("/addProduct", authenticateToken, requireAdmin, upload.array("productImages", 5), async (req, res) => {
  try {
    const {
      productName,
      productCost,
      productCategory,
      productGender,
      productSize,
      productColour,
      isBestseller,
      originalPrice,
      productDescription,
      productStock,
      productDiscount,
      exchangePolicy,
      displayAt,
    } = req.body;

    // Convert productStock to Map of Maps
    function objectToMapOfMaps(obj) {
      const outer = new Map();
      for (const color in obj) {
        const sizes = obj[color];
        outer.set(color, new Map(Object.entries(sizes)));
      }
      return outer;
    }

    const parsedStock = typeof productStock === "string" ? JSON.parse(productStock) : productStock;
    const stockMap = objectToMapOfMaps(parsedStock);

    const productData = {
      productName,
      productCost,
      productCategory,
      productGender,
      productSize: Array.isArray(productSize) ? productSize : [productSize],
      productColour: Array.isArray(productColour) ? productColour : [productColour],
      isBestseller: isBestseller === "true" || isBestseller === true,
      originalPrice,
      productDescription,
      productDiscount,
      exchangePolicy: exchangePolicy === "true" || exchangePolicy === true,
      displayAt,
      productStock: stockMap,
      productImages: req.files ? req.files.map((file) => file.path) : [],
    };

    const product = new Product(productData);
    await product.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error("Error in adding product: ", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});


// 🔸 Update Product Route
router.put(
  "/update/:id",
  authenticateToken,
  requireAdmin,
  upload.array("productImages", 5),
  async (req, res) => {
    try {
      const {
        productName,
        productCost,
        productCategory,
        productGender,
        productSize,
        productColour,
        isBestseller,
        originalPrice,
        productDescription,
        productStock,
        productDiscount,
        exchangePolicy,
        displayAt,
        existingImages,
      } = req.body;

      // Convert productStock to Map of Maps
      function objectToMapOfMaps(obj) {
        const outer = new Map();
        for (const color in obj) {
          const sizes = obj[color];
          outer.set(color, new Map(Object.entries(sizes)));
        }
        return outer;
      }

      const parsedStock = typeof productStock === "string" ? JSON.parse(productStock) : productStock;
      const stockMap = objectToMapOfMaps(parsedStock);

      const updateData = {
        productName,
        productCost,
        productCategory,
        productGender,
        productSize: Array.isArray(productSize) ? productSize : [productSize],
        productColour: Array.isArray(productColour)
          ? productColour
          : [productColour],
        isBestseller: isBestseller === "true" || isBestseller === true,
        originalPrice,
        productDescription,
        productDiscount,
        exchangePolicy: exchangePolicy === "true" || exchangePolicy === true,
        displayAt,
        productStock: stockMap,
      };

      // 🔸 Handle productImages
      if (req.files && req.files.length > 0) {
        updateData.productImages = req.files.map((file) => file.path);
      } else if (existingImages) {
        updateData.productImages = JSON.parse(existingImages);
      }

      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      if (!updatedProduct) {
        return res
          .status(404)
          .json({ success: false, error: "Product not found" });
      }

      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } catch (error) {
      console.error("Error in updating product: ", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

// 🔸 Delete Product Route
router.delete("/delete/:id", authenticateToken, requireAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res
      .status(201)
      .json({ success: true, message: "Product deleted succesfully" });
  } catch (error) {
    console.log("Error in Updating product: ", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// 🔸 Get User Route
router.get("/all-users", authenticateToken, requireAdmin, async(req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.log("Error in displaying products: ", error);
    res.status(500).json({ success: false, error: "Internal Server Error" }); 
  }
});

// Add Category Route
router.post("/add-category", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { name, gender } = req.body;

    // Optional: validate fields if needed
    if (!name) {
      return res.status(400).json({ success: false, message: "Name is required" });
    }

    const existing = await Category.findOne({name});
    if (existing) {
      return res.status(400).json({ success: false, message: "Category already exists" });
    }

    const newCategory = new Category({ name, gender});
    await newCategory.save();

    res.status(201).json({ success: true, category: newCategory });
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

//Delete Order Route
router.delete("/orders/delete/:id", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const orderId = req.params.id;

    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Update order status

router.post("/update-order-status", authenticateToken, requireAdmin, async (req, res) => {
  const { orderID, orderStatus } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderID,
      { orderStatus },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, message: "Order status updated", order: updatedOrder });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// 🔸 Get Order Route
router.get("/all-orders", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const orders = await Order.find();

    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Orders not found" });
    }
    res.json({ success: true, data: orders });

  } catch (error) {
    console.log(`Error in fetching orders`, error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;