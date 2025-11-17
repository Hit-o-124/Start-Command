import mongoose from "mongoose"; 
const SupportSchema = new mongoose.Schema({ 
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
  message: String, 
  status: { type: String, default: "open" } 
}); 
export default mongoose.model("Support", SupportSchema); 
