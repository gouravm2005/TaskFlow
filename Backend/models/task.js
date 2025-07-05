import mongoose, { Schema } from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed', 'Overdue'], default: 'Pending' },
  startDate: Date,
  endDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  subtasks: [
    {
      title: String,
      isCompleted: { type: Boolean, default: false },
      dueDate: Date,
    }
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const taskModel = mongoose.models.task|| mongoose.model("task", taskSchema)

export default taskModel;