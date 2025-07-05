import {React, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import AddTask from './AddTask';

const Navbar = ({openform}) => {
  const navigate = useNavigate();

  return (
    <div className='w-full ml-auto h-20 bg-black text-white border border-gray-800'>
     <div className='h-full flex justify-end items-center gap-4 mr-5'>
      <div className='w-8 md:w-60 h-8 flex bg-gray-700 rounded-md justify-around'>
        <input className='md:w-52 h-6 w-0 md:bg-gray-700 bg-black text-black p-4' type="text" placeholder='Search Taks..'/>
        <img className='w-6 mr-2' src="search.svg" alt="" />
      </div> 
      <img className='w-6 ml-6' src="Notification.svg" />
      <button onClick={openform} className='md:w-28 md:h-8 w-20 h-8 bg-blue-600 text-white text-sm md:text-md rounded-md'>Add Task</button>
     </div>
    </div>
  )
}

export default Navbar