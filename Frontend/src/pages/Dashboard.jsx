import { React, useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import AddTask from '../components/AddTask'
import axios from 'axios'

const Dashboard = () => {
   const [panelopen, setpanelopen] = useState(true)
  const [showform, setshowform] = useState(false)
  const [todaytasks, settodaytasks] = useState([{ _id: '', title: '', status: '' }])
  const [progress, setprogress] = useState({ today: 0, thisMonth: 0, overall: 0 })
  const [taskdetails, settaskdetails] = useState({
    total: '', completed: '', inProgress: '', pending: '', overdue: ''
  })

  useEffect(() => {

    const fetchData = async () => {
      const auth = JSON.parse(localStorage.getItem('auth'));
      if (!auth?.token) return;

      try {
        const headers = {
          headers: {
            Authorization: `Bearer ${auth.token}`
          }
        };

        const [taskdetails, todaytasks, progress] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BASE_URL}/api/dashboard/taskdetails`, headers),
          axios.get(`${import.meta.env.VITE_BASE_URL}/api/dashboard/todaystasks`, headers),
          axios.get(`${import.meta.env.VITE_BASE_URL}/api/dashboard/progress`, headers)
        ]);

   
        if (taskdetails.data.success) settaskdetails(taskdetails.data.summary)
        if (todaytasks.data.success)  settodaytasks(todaytasks.data.tasks)
        if (progress.data.success) setprogress(progress.data.progress);

      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchData();
  }, [])


  return (
    <div className='w-screen h-screen box-border flex flex-col'>
    <Navbar openform={() => setshowform(true)} />
   <div className='w-full h-full flex bg-black'>
    {panelopen ? (<Sidebar onClose={() => setpanelopen(false)} />):(<img onClick={() => setpanelopen(true)} className="w-8 h-8 m-2 mt-4 cursor-pointer" src='/sidebar.svg'></img>) }
        <div className='w-full h-full bg-gray-950 overflow-y-auto text-blue-800'>

          <div className='w-full md:h-32 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 text-white text-2xl m-5 md:m-5 lg:m-12 gap-2'>
            <div className='border rounded-md flex flex-col gap-2 p-4 w-28 h-24 md:h-28 md:w-52 lg:h-32 lg:w-60 bg-gray-900'><h1 className=' text-sm md:text-lg font-semibold text-center'>Total Tasks</h1><h1 className=' text-2xl md:text-2xl lg:text-4xl font-bold text-center'>{taskdetails.total}</h1></div>
            <div className='border rounded-md flex flex-col gap-2 p-4 w-28 h-24 md:h-28 md:w-52 lg:h-32 lg:w-60 bg-gray-900'><h1 className=' text-sm md:text-lg font-semibold text-center'>Completed</h1><h1 className='text-2xl md:text-2xl lg:text-4xl font-bold text-center'>{taskdetails.completed}</h1></div>
            <div className='border rounded-md flex flex-col gap-4 p-4 w-28 h-24 md:h-28 md:w-52 lg:h-32 lg:w-60 bg-gray-900'><h1 className=' text-sm md:text-lg font-semibold text-center'>In Progress</h1><h1 className='text-2xl md:text-2xl lg:text-4xl font-bold text-center'>{taskdetails.inProgress}</h1></div>
            <div className='border rounded-md flex flex-col gap-4 p-4 w-28 h-24 md:h-28 md:w-52 lg:h-32 lg:w-60 bg-gray-900'><h1 className=' text-sm md:text-lg font-semibold text-center'>Overdue</h1><h1 className='text-2xl md:text-2xl lg:text-4xl font-bold text-center'>{taskdetails.overdue}</h1></div>
          </div>

        

        <div className='w-full h-full flex md:flex-row flex-col gap-5 bg-black text-white'>
          <div className=' w-full md:w-[60%] m-2 ml-4 p-2 md:p-5 rounded-md bg-gray-900'>
            <h1 className='w-full text-center p-2 text-2xl font-bold'>Today's Task</h1>
            <div className='w-full text-lg flex flex-col gap-3'>
              {todaytasks.map(task => {
                return (
                  <div key={task._id} className='w-full border rounded-md flex justify-between pl-10 pr-10'>
                    <h1>{task.title}</h1>
                    <p>{task.status}</p>
                  </div>
                );
              })}
            </div>
          </div>


          <div className=' w-full md:w-[40%] h-[400px] mt-2 ml-3 flex flex-col p-8 rounded-md bg-gray-900'>
            <div className="w-full mb-4">
              <h2 className='w-full text-2xl font-semibold pb-4'>Progress Overview</h2>
              <h2 className="text-sm font-semibold mb-1">Today's Progress: {progress.today}%</h2>
              <div className="w-full bg-gray-300 h-4 rounded">
                <div
                  className="bg-blue-500 h-4 rounded"
                  style={{ width: `${progress.today}%` }}
                ></div>
              </div>
            </div>

            <div className="w-full mb-4">
              <h2 className="text-sm font-semibold mb-1">This Month: {progress.thisMonth}%</h2>
              <div className="w-full bg-gray-300 h-4 rounded">
                <div
                  className="bg-green-500 h-4 rounded"
                  style={{ width: `${progress.thisMonth}%` }}
                ></div>
              </div>
            </div>

            <div className="w-full mb-4">
              <h2 className="text-sm font-semibold mb-1">Overall Progress: {progress.overall}%</h2>
              <div className="w-full bg-gray-300 h-4 rounded">
                <div
                  className="bg-purple-500 h-4 rounded"
                  style={{ width: `${progress.overall}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        {showform && <AddTask onClose={() => setshowform(false)} />}



    </div>

      </div>
    </div>
  )
}

export default Dashboard