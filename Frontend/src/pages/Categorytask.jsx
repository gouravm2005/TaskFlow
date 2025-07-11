import {React, useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import AddTask from '../components/AddTask'
import Taskcard from '../components/Taskcard'

const Categorytask = () => {
  const [tasks, settasks] = useState()
  const [istask, setistask] = useState(false)
   const [taskId, settaskId] = useState('')
  const [showform, setshowform] = useState(false)
  
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const auth = JSON.parse(localStorage.getItem("auth"))
    if(!auth || !auth.token)
     return;

   axios.get(`${import.meta.env.VITE_BASE_URL}/api/task/Categorytasks/${id}`,
   {
    headers: { Authorization: `Bearer ${auth.token}` }
   })
  .then(res =>  {if (res.data.tasks){ 
      settasks(res.data.tasks)
      setistask(true)
    }
    else{
      setistask(false)
    }
  })
  .catch(err => console.log(err))

  }, [id])

   const refreshTasks = async () => {
  const res = await axios.get('${import.meta.env.VITE_BASE_URL}/api/task/Alltasks', { headers: { Authorization: `Bearer ${auth.token}` }});
  settasks(res.data.tasks);
};
  
  return (
  <div className='w-screen h-screen box-border flex'>
   <Sidebar />
   <div className='w-[80%] h-full flex flex-col'>
    <Navbar openform={() => setshowform(true)} />
    <div className='w-full h-full p-20 bg-gray-950'>
   {istask ? (
  <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
    {tasks.map(task => (
      <div onClick={(e) => settaskId(task._id)} key={task._id} className='min-w-[160px] border rounded-md bg-gray-900 text-white p-4 shadow-md'>
        <h1 className='text-xl font-semibold'>{task.title}</h1>
        <p className='text-sm font-medium'>{task.description}</p>

        <div className='text-sm flex justify-between mt-2'>
          <span>{task.category}</span>
          <span>{task.priority || "Medium"}</span>
        </div>

        <div className='text-xs mt-1 text-gray-300'>
          <p>Start: {task.startDate?.slice(0, 10)}</p>
          <p>End: {task.endDate?.slice(0, 10)}</p>
        </div>

        {task.subtasks?.length > 0 && (
          <div className='mt-2 text-sm'>
            <p className='font-semibold'>Subtasks:</p>
            {task.subtasks.map((sub, i) => (
          <div key={sub._id}>
           <p>Title: {sub.title}</p>
           <p>Status: {sub.isCompleted ? 'Completed' : 'Incomplete'}</p>
         </div>
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
) : (
  <div className='text-xl text-white'>There are no tasks</div>
)}

</div>
    {showform && <AddTask onClose={() => setshowform(false)}/>}
        {taskId && (
        <Taskcard
          taskId={taskId}
          onClose={() => settaskId(null)}
          onUpdate={refreshTasks}
        />
      )}
  </div>
  </div>
  )
}

export default Categorytask