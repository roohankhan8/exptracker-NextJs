import mongoose from "mongoose";

const expSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  typeOfExp: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Expense = mongoose.models.exps || mongoose.model("exps", expSchema);

export default Expense;
