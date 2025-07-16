import Category from "../models/category.js";
import taskModel from "../models/task.js";

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
    const { id } = req.params;

    const deletedCat = await categoryModel.findByIdAndDelete(id);
    if (!deletedCat) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    await taskModel.deleteMany({ categoryId: id });

    res.status(200).json({ success: true, message: "Category and its tasks deleted" });
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
