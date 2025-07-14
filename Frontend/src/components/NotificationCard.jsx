import axios from "axios";
import { useEffect, useState } from "react";

const NotificationCard = ({onClose}) => {
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
      task.status === 'Completed'
   );

  return (
    <div className="absolute top-24 w-[70%] md:w-[40%] p-6 bg-white text-black rounded shadow-md z-50 max-h-80 overflow-y-auto">
     <div className="w-full flex justify-between">
      <h1 className="text-xl md:text-2xl font-bold pb-4">Notifications</h1>
     <button onClick={onClose} className="text-xl md:text-xl font-bold text-gray-600 pb-6">✕</button>
     </div>
    
      {filtered.length > 0 ? (
        filtered.map(task => (
          <div key={task._id} className="w-full flex justify-between border shadow-md shadow-neutral-500 p-3">
            <p>{task.title}</p> <p>{task.status}</p>
          </div>
        ))
      ) : (
        <div className="p-2 text-sm text-gray-500">No tasks found</div>
      )}
    </div>
  );
};

export default NotificationCard;
