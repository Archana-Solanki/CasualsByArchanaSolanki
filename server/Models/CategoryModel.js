const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  gender: { type: String, enum: ["Men", "Women", "Unisex"], default: "Unisex" },
});

module.exports = mongoose.model("Category", CategorySchema);
