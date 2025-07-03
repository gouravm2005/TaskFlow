import React from 'react'

const Sidebar = () => {
  return (
    <div className='w-[20%] h-screen bg-black text-white border-2 border-gray-400'>
    <div className='w-full h-28 p-8 border-2 border-gray-700 flex justify-center items-center gap-4'>
      <img className='w-10 h-10' src="icon.svg" alt="icon" />
      <h1 className='text-3xl font-bold'>TaskFlow</h1>
    </div>
    <div className='w-full flex flex-col justify-start items-start p-6 gap-8'>
      <div className='flex '>
       <h1 className='text-xl font-medium'>Dashboard</h1>
      </div>
       <div className='flex'>
       <h1 className='text-xl font-medium'>All Tasks</h1>
      </div>
       <div className='flex'>
       <h1 className='text-xl font-medium'>Team</h1>
      </div>
      </div>

      <div className='w-full h-32 border-b-gray-300'>

      </div>
    </div>
  )
}

export default Sidebar