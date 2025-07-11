import React, { useEffect, useState } from "react";
import axios from "axios";

const TaskCard = ({ taskId, onClose, onUpdate }) => {
  const [task, setTask] = useState({});
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    const fetchTask = async () => {
      const auth = JSON.parse(localStorage.getItem("auth"));
      if (!auth?.token || !taskId) return;

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/task/gettask/${taskId}`,
          {
            headers: { Authorization: `Bearer ${auth.token}` },
          }
        );

        if (res.data.success) {
          setTask(res.data.task);
          setForm(res.data.task);
        }
      } catch (err) {
        console.error("Error fetching task:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/task/edittask/${taskId}`,
        form,
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      if (res.data.success) {
        onUpdate?.();
        setEditing(false);
        setTask(res.data.task);
      }
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const handleDelete = async () => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/task/removetask/{taskId}`,
        {},
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      if (res.data.success) onClose();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  if (loading) return <div className="fixed right-0 w-[80%] h-full bg-white p-6">Loading...</div>;

return (
  <div className="fixed top-20 right-20 w-[70%] h-[80%] bg-white rounded-2xl z-50 overflow-auto p-6 shadow-2xl border border-gray-300 font-sans text-gray-800">
    <button onClick={onClose} className="absolute top-2 right-4 text-2xl text-gray-500 hover:text-red-500">✕</button>

    <h1 className="text-3xl font-bold mb-6 border-b pb-2 text-blue-800">Task Details</h1>

    {editing ? (
      <div className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="border p-2 rounded-md text-lg"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 rounded-md text-md"
        />

        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="border p-2 rounded-md"
        />

        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="border p-2 rounded-md"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border p-2 rounded-md"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Overdue">Overdue</option>
        </select>

        <div className="flex gap-4">
          <input
            type="date"
            name="startDate"
            value={form.startDate?.split("T")[0]}
            onChange={handleChange}
            className="border p-2 rounded-md w-1/2"
          />
          <input
            type="date"
            name="endDate"
            value={form.endDate?.split("T")[0]}
            onChange={handleChange}
            className="border p-2 rounded-md w-1/2"
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold">Edit Subtasks:</h3>
          {form.subtasks.map((sub, i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={sub.title}
                onChange={(e) => {
                  const newSubs = [...form.subtasks];
                  newSubs[i].title = e.target.value;
                  setForm({ ...form, subtasks: newSubs });
                }}
                className="border p-2 rounded w-full"
              />
              <input
                type="checkbox"
                checked={sub.isCompleted}
                onChange={(e) => {
                  const newSubs = [...form.subtasks];
                  newSubs[i].isCompleted = e.target.checked;
                  setForm({ ...form, subtasks: newSubs });
                }}
              />
              <span className="text-sm">Done</span>
            </div>
          ))}
        </div>

        <button
          onClick={handleUpdate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-lg"
        >
          Save
        </button>
      </div>
    ) : (
      <div className="flex flex-col gap-2 text-lg">
        <h2 className="text-2xl font-semibold text-blue-700">{task.title}</h2>
        <p>{task.description}</p>
        <p>Category: {task.category}</p>
        <p>Priority: {task.priority}</p>
        <p>Status: {task.status}</p>
        <p>Start: {task.startDate?.split("T")[0]}</p>
        <p>End: {task.endDate?.split("T")[0]}</p>

        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-1">Subtasks:</h3>
          {task.subtasks?.map((sub) => (
            <div key={sub._id} className="pl-2 border-l-2 border-gray-400 mb-1">
              <p> {sub.title}</p>
              <p>Status: {sub.isCompleted ? 'Completed' : 'Incomplete'}</p>
            </div>
          ))}
        </div>
      </div>
    )}

    <div className="flex gap-4 mt-6">
      <button
        onClick={() => setEditing(!editing)}
        className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded text-white text-md"
      >
        {editing ? "Cancel" : "Edit"}
      </button>
      <button
        onClick={handleDelete}
        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white text-md"
      >
        Delete
      </button>
    </div>
  </div>
);

};

export default TaskCard;