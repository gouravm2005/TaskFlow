import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

const Calendar = () => {
 return (
  <div className='w-screen h-screen box-border flex'>
   <Sidebar />
    <div className='w-[80%]  h-full flex flex-col'>
     <Navbar/>
     <div className='w-full h-full bg-red-700'></div>
     </div>
  </div>
 )
}

export default Calendar