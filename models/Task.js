import mongoose from "mongoose"; 
const TaskSchema = new mongoose.Schema({ 
  title: String, 
  description: String, 
  reward: Number, 
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
  completed: { type: Boolean, default: false } 
}); 
export default mongoose.model("Task", TaskSchema); 
