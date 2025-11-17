import mongoose from "mongoose";

const WithdrawSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: Number,
  method: String, 
  status: { type: String, default: "pending" }
}, { timestamps: true });

export default mongoose.model("Withdraw", WithdrawSchema);
