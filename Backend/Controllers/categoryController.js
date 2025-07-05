import Category from "../models/category.js";

export const createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ success: false, message: "Name is required" });

  try {
    const existing = await Category.findOne({ name, user: req.user._id });
    if (existing) return res.status(409).json({ success: false, message: "Category already exists" });

    const category = new Category({ name, user: req.user._id });
    await category.save();
    res.status(201).json({ success: true, category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const editCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const category = await Category.findByIdAndUpdate(id, { name }, { new: true });
    res.json({ success: true, category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    await Category.findByIdAndDelete(id);
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user._id });
    res.json({ success: true, categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
