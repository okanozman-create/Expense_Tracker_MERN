const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
