const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  minutesRead: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  image1: {
    type: String,
    required: true,
  },
  blogHeading: {
    type: String,
    required: true,
  },
  blogSubheading1: {
    type: String,
  },
  para1Heading: {
    type: String,
  },
  para1Content: {
    type: String,
  },
  para2Heading: {
    type: String,
  },
  para2Content: {
    type: String,
  },
  image2: {
    type: String,
    required: true,
  },
  closingHeading: {
    type: String,
  },
  closingContent: {
    type: String,
  },
});

module.exports = mongoose.model("Blogs", BlogSchema);
