const mongoose = require("mongoose");

const History = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  suggestedPrice: {
    type: Number,
    required: true,
  },
  finalPrice: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const history = mongoose.model("History", History);
module.exports = history;
