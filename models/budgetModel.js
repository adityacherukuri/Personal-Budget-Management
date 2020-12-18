const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: false,
    uppercase: true,
  },
  value: {
    type: Number,
    required: true,
    trim: true,
  },
  color: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
    minlength: 6,
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = Budget = mongoose.model("budget", budgetSchema);
