import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  balance: { type: Number, default: 0 },
  totalEarned: { type: Number, default: 0 },
  paypalEmail: String,
  coinbaseWallet: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);
