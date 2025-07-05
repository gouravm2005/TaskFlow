import {React, useState, useEffect} from 'react'
import axios from 'axios'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import category from '../../../Backend/models/category'

const AllTasks = () => {
 const [tasks, settasks] = useState([
  {title:'', description:'', startdate:'', enddate:'', subtask:[""], category:'', priority:''}
 ])

 useEffect(() => {
 const auth = JSON.parse(localStorage.getItem("auth"))

 if(!auth || !auth.token){
  return;
 }

 axios.get(`${import.meta.env.VITE_BASE_URL}/api/auth/task/getAlltask`, {
    headers: { Authorization: `Bearer ${auth.token}` }
  }).then(res => {
    if (res.data.success) settasks(res.data);
  })
  .catch(err => console.log(err))
 }, [])
 
 return (
  <div className='w-screen h-screen box-border flex'>
   <Sidebar />
   <div className='w-[80%]  h-full flex flex-col'>
    <Navbar />
    <div className='w-full h-full p-20 bg-gray-600'>
     <div className='w-[30%] h-[50%] p-6 flex flex-col gap-2 border rounded-md bg-blue-950 text-white'>
      {/* {tasks.map(task => (
      `<h1 className='text-2xl font-semibold'>${task.title}</h1>
      <p className='text-sm font-medium'>${task.description}</p>
      <div className='text-md flex gap-2'>
       <h1>${task.category}</h1>
       <h1>${task.priority}</h1>
       </div>
       <div className='text-md flex gap-2'>
        <h1>${task.setdate}</h1>
        <h1>${task.enddate}</h1>
       </div>`
      ))} */}
    
     </div>
    </div>

   </div>
  </div>
 )
}

export default AllTasks