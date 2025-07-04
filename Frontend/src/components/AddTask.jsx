import React, { useState } from "react";
import axios from "axios";

const AddTask = ({ onClose }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    startdate: "",
    enddate: "",
    subtasks: [""], 
  });

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
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/task/createtask`,
        form,
        { withCredentials: true }
      );
      console.log("Task created:", res.data);
      onClose(); 
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="w-[50%] h-[80%] md:w-[50%] md:h-[80%] flex flex-col justify-center items-center rounded-md bg-white text-black font-bold p-5">
        <h1 className="text-xl mb-4">Add Task</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full items-center">
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
            className="text-sm text-blue-500"
          >
            + Add Another Subtask
          </button>

          <div className="flex gap-2 w-3/4">
            <input
              type="date"
              name="startdate"
              value={form.startdate}
              onChange={handleChange}
              className="border p-2 w-1/2"
            />
            <input
              type="date"
              name="enddate"
              value={form.enddate}
              onChange={handleChange}
              className="border p-2 w-1/2"
            />
          </div>

          <button type="submit" className="bg-blue-600 text-white p-2 rounded">
            Submit
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 text-sm text-red-500 underline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddTask;
