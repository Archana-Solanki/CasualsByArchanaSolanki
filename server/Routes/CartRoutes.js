const express = require("express");
const router = express.Router();
const Users = require("../Models/userModel");
const Products = require("../Models/productModel");
const authenticateToken = require("../Middleware/auth");

router.get('/', authenticateToken, async(req,res) => {
    try{
        const user = await Users.findById(req.user.id).populate("cartData.productID");
        res.json(user.cartData || [])
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

router.post('/addToCart', authenticateToken, async(req,res) => {
    const {productID, productQuantity, productColor, productSize} = req.body

    try{
        const user = await Users.findById(req.user.id);

        const existingItem = user.cartData.find(
            (item) => 
                item.productID.toString() === productID &&
                item.productSize === productSize &&
                item.productColor === productColor
        );

        if(existingItem){
            existingItem.productQuantity += productQuantity
        }else{
            user.cartData.push({productID, productSize, productColor, productQuantity});
        }

        await user.save();
        await user.populate("cartData.productID");
        res.json(user.cartData);
    }catch(err){
        res.status(500).json({error: err.message})
    }
});

router.put("/updateCart", authenticateToken, async (req, res) => {
  const { productID, productQuantity, productColor, productSize } = req.body;
  try {
    const user = await Users.findById(req.user.id);

    const item = user.cartData.find(
      (i) =>
        i.productID.toString() === productID &&
        i.productColor === productColor &&
        i.productSize === productSize
    );

    if (!item) return res.status(404).json({ message: "Item not found" });

    item.productQuantity = productQuantity;
    await user.save();
    await user.populate("cartData.productID");
    res.json(user.cartData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/deleteItemFromCart", authenticateToken, async (req, res) => {
  const { productID, productColor, productSize } = req.body;
  try {
    const user = await Users.findById(req.user.id);

    user.cartData = user.cartData.filter(
      (i) =>
        !(
          i.productID.toString() === productID &&
          i.productColor === productColor &&
          i.productSize === productSize
        )
    );

    await user.save();
    await user.populate("cartData.productID");
    res.json(user.cartData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/all", authenticateToken, async (req, res) => {
  try {
    const user = await Users.findById(req.user.id);
    user.cartData = [];
    await user.save();
    res.json([]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;