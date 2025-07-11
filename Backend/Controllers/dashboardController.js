import taskModel from "../models/task.js";

export const getTaskDetails = async (req, res) => {
const allTasks = await taskModel.find({ user: req.user._id });

try {
 const summary = {
  total: allTasks.length,
  completed: allTasks.filter(t => t.status === "Completed").length,
  inProgress: allTasks.filter(t => t.status === "In Progress").length,
  pending: allTasks.filter(t => t.status === "Pending").length,
  overdue: allTasks.filter(t => 
    t.status !== "Completed" && new Date(t.endDate) < new Date()
  ).length,
 }

 return res.status(201).json({success: true, summary})
} catch (error) {
  return res.status(500).json({ success: false, message: error.message });
}
}

export const getTodaystasks = async (req, res) => {
  try {
    const userId = req.user._id;
    const today = new Date().toISOString().split("T")[0];

    // Fetch all tasks for the user
    const tasks = await taskModel.find({ user: userId });

    // Filter tasks where task.endDate is today OR any subtask.dueDate is today
    const todayTasks = tasks.filter(task => {
      const taskDueToday = task.endDate &&
        !isNaN(new Date(task.endDate)) &&
        new Date(task.endDate).toISOString().split("T")[0] === today;

      const subtaskDueToday = Array.isArray(task.subtasks) &&
        task.subtasks.some(sub =>
          sub.dueDate &&
          !isNaN(new Date(sub.dueDate)) &&
          new Date(sub.dueDate).toISOString().split("T")[0] === today
        );

      return taskDueToday || subtaskDueToday;
    });

    return res.status(200).json({
      success: true,
      tasks: todayTasks,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};



export const getprogress = async (req, res) => {
  try {
    const userId = req.user._id;
    const allTasks = await taskModel.find({ user: userId });

    const todayStr = new Date().toISOString().split("T")[0];
    const today = new Date(todayStr);
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const getPercentage = (tasks) => {
      const total = tasks.length;
      const completed = tasks.filter(t => t.status === "Completed").length;
      return total === 0 ? 0 : Math.round((completed / total) * 100);
    };

    const todayTasks = allTasks.filter(t =>
      new Date(t.endDate).toISOString().split("T")[0] === todayStr
    );

    const thisMonthTasks = allTasks.filter(t => {
      const end = new Date(t.endDate);
      return end.getMonth() === currentMonth && end.getFullYear() === currentYear;
    });

    return res.status(200).json({
      success: true,
      progress: {
        today: getPercentage(todayTasks),
        thisMonth: getPercentage(thisMonthTasks),
        overall: getPercentage(allTasks),
      },
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

