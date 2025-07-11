import axios from "axios";
import { useEffect, useState } from "react";

const SearchCard = ({ query = "", onSelectTask }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (!auth?.token) return;

    axios.get(`${import.meta.env.VITE_BASE_URL}/api/task/Alltasks`, {
      headers: { Authorization: `Bearer ${auth.token}` }
    })
    .then(res => setTasks(res.data.tasks || []))
    .catch(err => console.error("Fetch tasks failed:", err));
  }, []);

    const filtered = (tasks || []).filter(
    (task) =>
      task &&
      typeof task.title === "string" &&
      query &&
      task.title.toLowerCase().includes(query.toLowerCase())
   );

  return (
    <div className="absolute top-8 w-60 bg-gray-700 text-white rounded shadow-md z-50 max-h-60 overflow-y-auto">
      {filtered.length > 0 ? (
        filtered.map(task => (
          <div
            key={task._id}
            onClick={() => onSelectTask(task._id)}
            className="p-2 hover:bg-blue-300 cursor-pointer text-sm"
          >
            {task.title}
          </div>
        ))
      ) : (
        <div className="p-2 text-sm text-gray-500">No tasks found</div>
      )}
    </div>
  );
};

export default SearchCard;
