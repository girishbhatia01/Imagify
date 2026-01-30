import mongoose, { Mongoose } from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },    
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  plan: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
     required: true,
  },
  addcredits: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TransactionModel = mongoose.model("Transaction", transactionSchema);

export default TransactionModel;