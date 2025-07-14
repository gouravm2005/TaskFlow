import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  content: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
})

export default mongoose.model('Note', noteSchema);
