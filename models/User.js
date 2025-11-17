import mongoose from "mongoose"; 
const UserSchema = new mongoose.Schema({ 
  email: { type: String, required: true, unique: true }, 
  password: { type: String, required: true }, 
  balance: { type: Number, default: 0 }, 
  tasksCompleted: { type: Number, default: 0 }, 
  createdAt: { type: Date, default: Date.now } 
}); 
export default mongoose.model("User", UserSchema); 
