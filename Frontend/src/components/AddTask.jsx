import React, { useState, useEffect } from "react";
import axios from "axios";

const AddTask = ({ onClose }) => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    priority: "",
    startDate: "",
    endDate: "",
    subtasks: [""],
  });

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"))

    if (!auth || !auth.token)
      return

    axios.get("http://localhost:3000/api/category/all", {
      headers: { Authorization: `Bearer ${auth.token}` }
    }).then(res => {
      if (res.data.success) setCategories(res.data.categories);
    });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubtaskChange = (index, value) => {
    const updatedSubtasks = [...form.subtasks];
    updatedSubtasks[index] = value;
    setForm({ ...form, subtasks: updatedSubtasks });
  };

  const addSubtaskField = () => {
    setForm({ ...form, subtasks: [...form.subtasks, ""] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = JSON.parse(localStorage.getItem("auth"))
      if (!auth || !auth.token)
        return;

      console.log(auth.token)

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/task/createtask`,
        form,
        {
          withCredentials: true,
          headers: {
            authorization: `Bearer ${auth.token}` // Required if using token in headers
          }
        }
      );
      console.log("Task created:", res.data);
      onClose();
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="w-[60%] md:w-[40%]  flex flex-col justify-start items-center rounded-md bg-white text-black font-medium p-5">
        <h1 className="text-xl font-bold mb-4">Add Task</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full justify-start items-center">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className="border p-2 w-3/4"
          />

          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="border p-2 w-3/4"
          />

          <select name="category" value={form.category}
            onChange={(e) => {
              const selected = e.target.value;
              if (selected === "__new__") {
                setForm({ ...form, category: "" });
              } else {
                setForm({ ...form, category: selected });
              }
            }} className="border p-2 w-3/4" >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat.name}>{cat.name}</option>
            ))}
            <option value="__new__">+ Create New...</option>
          </select>

          {form.category === "" && (
            <input
              type="text"
              placeholder="New Category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setForm({ ...form, category: newCategory });
                  setNewCategory("");
                }
              }}
            />
          )}

          <select name="priority" value={form.priority} onChange={handleChange} className="border p-2 w-3/4">
            <option value="">Select Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          {form.subtasks.map((sub, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Subtask ${index + 1}`}
              value={sub}
              onChange={(e) => handleSubtaskChange(index, e.target.value)}
              className="border p-2 w-3/4"
            />
          ))}

          <button
            type="button"
            onClick={addSubtaskField}
            className="w-28 h-8 md:w-32 md:h-8 text-sm text-white bg-blue-500 rounded"
          >
            +  Add Subtask
          </button>

          <div className="flex gap-2 w-3/4">
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              className="border p-2 w-1/2"
            />
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              className="border p-2 w-1/2"
            />
          </div>

          <div className="flex w-40 justify-around">
            <button
              onClick={onClose}
              className="w-16 h-8 text-sm text-white bg-red-500 rounded"
            >
              Cancel
            </button>

            <button type="submit" onSubmit={handleSubmit} className="bg-blue-600 w-16 h-8 text-sm text-white rounded">
              Submit
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
