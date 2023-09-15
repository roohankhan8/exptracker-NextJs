import mongoose from "mongoose";

const expSchema = new mongoose.Schema({
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
  //   userId: {
  //     type: String,
  //     required: true,
  //   },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  //   updatedAt: {
  //     type: Date,
  //   },
});

const Expense = mongoose.models.exps || mongoose.model("exps", expSchema);

export default Expense;
