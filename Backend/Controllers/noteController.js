import NoteModel from "../models/note.js";

// Create Note
export const addNote = async (req, res) => {
  const { title, content } = req.body;
  console.log(req.body.title)
  const note = new NoteModel({ user: req.user._id, title, content });
  await note.save();
  res.status(201).json({ success: true, note });
};

// Get All Notes
export const getNotes = async (req, res) => {
  const notes = await NoteModel.find({ user: req.user._id }).sort({ updatedAt: -1 });
  res.json({ success: true, notes });
};

// Edit Note
export const editNote = async (req, res) => {
  const updated = await NoteModel.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { ...req.body, updatedAt: new Date() },
    { new: true }
  );
  res.json({ success: true, updated });
};

// Delete Note
export const deleteNote = async (req, res) => {
  await NoteModel.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  res.json({ success: true, message: "Note deleted" });
};