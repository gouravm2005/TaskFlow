import taskModel from "../models/task.js";
import Category from "../models/category.js";

export const createtask = async (req, res) => {
  try {
    const { title, description, category, priority, startDate, endDate, subtasks  } = req.body;

    // console.log("req body", req.body);
    // console.log("req user", req.user);

    if (!title || !endDate) {
      return res.status(400).json({ success: false, message: "Title and End date are required" });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, message: "Unauthorized user" });
    }

    // const task = await taskModel.create({
    //   title,
    //   description,
    //   category,
    //   priority,
    //   startDate,
    //   endDate,
    //   subtasks,
    //   user: req.user._id, // assuming auth middleware sets req.user
    // });

     const structuredSubtasks = (subtasks || []).map(title => ({
      title,
      isCompleted: false
    }));

    const task = new taskModel({
      title,
      description,
      startDate,
      endDate,
      subtasks: structuredSubtasks,
      category,
      priority,
      user: req.user._id,
    });

    const savedTask = await task.save();
    console.log("Task Saved:", savedTask);

    return res.status(201).json({ success: true, message: "Task created", task });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const gettask = async (req, res) => {
  try {
    const task = await taskModel.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ success: false, message: "Task not found" });

    return res.status(200).json({ success: true, task });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const edittask = async (req, res) => {
  try {
    const updatedTask = await taskModel.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!updatedTask) return res.status(404).json({ success: false, message: "Task not found" });

    return res.status(200).json({ success: true, message: "Task updated", task: updatedTask });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const removetask = async (req, res) => {
  try {
    const deletedTask = await taskModel.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!deletedTask) return res.status(404).json({ success: false, message: "Task not found" });

    return res.status(200).json({ success: true, message: "Task deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAlltasks = async (req, res) => {
  try {
    const tasks = await taskModel.find({ user: req.user._id }).sort({ enddate: 1 });
    return res.status(200).json({ success: true, tasks });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getCategorytasks = async (req, res) => {
  try {
   
    const categoryId = req.params.id;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    const tasks = await taskModel.find({
      user: req.user._id,
      category: category.name
    });

    return res.status(200).json({ success: true, tasks });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getNotifications = async (req, res) => {
 try {
  
  const task = await taskModel.find({
    user: req.user._id,
    status: pending,
  })

  const title = task.title;
  const status = task.status;

  return res.status(200).json({success: true, title, status})
 } catch (error) {
  return res.status(500).json({success:false, message: error.message});
 }
}

