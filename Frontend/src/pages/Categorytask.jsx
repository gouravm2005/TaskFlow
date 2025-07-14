import {React, useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import AddTask from '../components/AddTask'
import Taskcard from '../components/Taskcard'

const Categorytask = () => {
  const [panelopen, setpanelopen] = useState(true)
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
  <div className='w-screen h-screen box-border flex flex-col'>
    <Navbar openform={() => setshowform(true)} />
   <div className='w-full h-full flex bg-black'>
    {panelopen ? (<Sidebar onClose={() => setpanelopen(false)} />):(<img onClick={() => setpanelopen(true)} className="w-8 h-8 m-2 mt-4 cursor-pointer" src='/sidebar.svg'></img>) }
    <div className='w-full h-full p-3 bg-gray-950'>
   {istask ? (
  <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
   {tasks.map(task => (
      <div onClick={(e) => settaskId(task._id)} key={task._id} className='min-w-[160px] border rounded-md bg-gray-900 text-white p-4 shadow-md cursor-pointer overflow-auto'>
        <h1 className='text-2xl font-semibold pb-2'>{task.title}</h1>
        {/* <p className='text-sm font-medium'>{task.description}</p> */}

          <p><span className='text-md font-medium'>Category : </span>{task.category}</p>
          <p><span className='text-md font-medium'>Priority : </span>{task.priority || "Medium"}</p>
          <p><span className='text-md font-medium'>Status : </span>{task.status}</p>
        
          <p><span className='text-md font-medium'>End : </span>{task.endDate?.slice(0, 10)}</p>
        

        {/* {task.subtasks?.length > 0 && (
          <div className='mt-2 text-sm'>
          <p className='font-semibold'>Subtasks:</p>
         {task.subtasks.map((sub, i) => (
         <div key={sub._id}>
         <p>Title: {sub.title}</p>
         <p>Status: {sub.isCompleted ? 'Completed' : 'Incomplete'}</p>
         </div>
         ))}
        </div>
        )} */}
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