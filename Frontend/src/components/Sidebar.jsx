import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Sidebar = () => {

const [data, setdata] = useState({firstname:'', lastname:'', email:''})

  const navigate = useNavigate();

 useEffect(() => {

   const auth = JSON.parse(localStorage.getItem("auth"));
   if(!auth || !auth.token)
    return
   
   if(auth){
    axios.get(`$import.meta.env.VITE_BASE_URL/api/auth/getprofile`,{
      headers: {
      Authorization: `Bearer ${auth.token}`,
    },
    })
    .then(res => setdata(res.data))
    .catch(err => console.log(err))
   }

 }, [])
 
  return (
    <div className='lg:w-[20%] sm:w-[25%] h-screen bg-black text-white border-2 border-gray-800'>

      <div className='w-full h-24 p-5 flex justify-start items-center border-b-1 border-gray-600 gap-4'>
        <img className='w-6 h-6 md:w-10 md:h-10' src="icon.svg" alt="icon" />
        <h1 className='text-2xl md:text-3xl font-bold'>TaskFlow</h1>
      </div>

      <div className='w-full h-60 flex flex-col justify-center items-start pl-6 gap-8'>
        <div onClick={() => navigate('/Dashboard')} className='flex gap-2 cursor-pointer hover:text-blue-600'>
          <img className='cursor-pointer' src="dashboard.svg" />
          <h1 className='md:text-xl text-lg font-medium'>Dashboard</h1>
        </div>
        <div onClick={() => navigate('/AllTasks')} className='flex gap-2 cursor-pointer hover:text-blue-600'>
          <img src="task.svg" />
          <h1 className='md:text-xl text-lg font-medium'>All Tasks</h1>
        </div>
          <div onClick={() => navigate('/Calendar')}  className='flex gap-2 cursor-pointer hover:text-blue-600'>
          <img src="calendar.svg" />
          <h1 className='md:text-xl text-lg font-medium'>Calendar</h1>
        </div>
        <div onClick={() => navigate('/Team')}  className='flex gap-2 cursor-pointer hover:text-blue-600'>
          <img src="team.svg" />
          <h1 className='md:text-xl text-lg font-medium'>Team</h1>
        </div>
      </div>

      <div className='w-full h-96 flex flex-col justify-start items-start gap-4 p-5 mt-8'>
        <div className='flex justify-around gap-3'>
          <h1 className='md:text-2xl text-2xl font-semibold '>Categories</h1>
          <img src="category.svg" />
        </div>
      
      <div className='w-full overflow-y-auto fex flex-col font-medium p-2'>
        <h2>Development</h2>
        <h2>Major project</h2>
      </div>
       
      </div>

      <div className='w-full h-20 text-white border'>
        <h1></h1>
       <h1>{data.email}</h1>
      </div>
    </div>
  )
}

export default Sidebar