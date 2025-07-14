import {React, useState, useEffect} from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import AddTask from '../components/AddTask'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Taskcard from '../components/Taskcard';
import axios from 'axios';

const Calendar = () => {
const [panelopen, setpanelopen] = useState(true)
 const [showform, setshowform] = useState(false)
 const [events, setEvents] = useState([]);
 const [taskId, settaskId] = useState('')

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (!auth?.token) return;

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/task/Alltasks`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then(res => {
        const tasks = res.data.tasks;

        // Convert tasks to FullCalendar format
        const formattedEvents = tasks.map(task => ({
          id: task._id,
          title: task.title,
          date: task.endDate.split("T")[0],
          backgroundColor: task.priority === "High" ? "#EF4444" : task.priority === "Medium" ? "#FBBF24" : "#10B981",
          borderColor: "#111",
        }));

        setEvents(formattedEvents);
      })
      .catch(err => console.error("Calendar Fetch Error", err));
  }, []);

 return (
   <div className='w-screen h-screen box-border flex flex-col'>
    <Navbar openform={() => setshowform(true)} />
   <div className='w-full h-full flex bg-black text-white'>
    {panelopen ? (<Sidebar onClose={() => setpanelopen(false)} />):(<img onClick={() => setpanelopen(true)} className="w-8 h-8 m-2 mt-4 cursor-pointer" src='/sidebar.svg'></img>) }
     <div className='w-full h-full bg-gray-950  overflow-x-scroll  p-5 '>

       {/* <h1 className="text-2xl m-2 font-bold mb-4 text-white">📅 Task Calendar</h1> */}
<div className=" h-[calc(100vh-5rem)] min-w-[600px] md:min-w-full px-2 md:px-6">
  <FullCalendar
    plugins={[dayGridPlugin, interactionPlugin]}
    initialView="dayGridMonth"
    headerToolbar={{
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay',
    }}
    events={events}
    eventClick={(info) => {
      settaskId(info.event.id);
    }}
    height="auto"
  />
</div>
     </div>
   
     {taskId && <Taskcard
         taskId={taskId}
         onClose={() => settaskId(null)}
       />}

     {showform && <AddTask onClose={() => setshowform(false)}/>}
     </div>
  </div>
 )
}

export default Calendar