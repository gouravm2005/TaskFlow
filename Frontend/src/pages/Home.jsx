import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
  <div className='w-screen h-screen bg-black text-white'>
    <div className='w-full flex flex-col justify-center items-center'>
     <div className='flex align-middle justify-center pt-24'><img className='w-12 border-none rounded-xl' src="icon.svg"/></div>
     <div className='text-5xl font-bold w-full h-12 align-middle flex justify-center mt-6'> TaskFlow</div>
     <div className='text-md font-medium w-full flex flex-col justify-center items-center mt-5 sm:pl-20'>
      <p className='w-full text-center text-md'>The ultimate task management solution for team and individual.</p>
      <p className='w-full text-center text-md'>Organize, collaborate and achieve for more with our advance productivity platform</p></div>
    <div className='w-60 h-12 bg-blue-700 flex md:text-2xl sm:text-xl font-bold p-2 justify-center mt-10 rounded-md'>
      <Link to={'/Login'}><button>Get Started</button></Link>
     <svg className=' ml-6' xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="ffffff" class="injected-svg" data-src="https://cdn.hugeicons.com/icons/arrow-right-02-solid-sharp.svg" xmlns:xlink="http://www.w3.org/1999/xlink" role="img" color="#ffffff">
<path d="M14.5267 18L13.1187 16.5858L16.6882 13.0006L3.5 13.0006L3.5 11.0006L16.6886 11.0006L13.1186 7.41422L14.5266 6L20.5 12.0003L14.5267 18Z" fill="#ffffff"></path>
</svg>
    </div>
   </div>

    <div className='w-full bg-black text-white flex flex-col justify-center items-center gap-12'>
      <div className='w-full h-60 flex flex-col justify-center items-center sm:pl-5'>
        <h1 className='text-3xl text-center  sm:text:lg font-medium'>Everything you need to stay productive</h1>
        <h2 className='text-md  text-center font-medium mt-5'>powerfull features design for manage tasks</h2>
        <h2 className='text-md  text-center font-medium'>and collaborate and track your progress like never before</h2>
      </div>
      <div className='w-full bg-black text-white grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 md:gap-x-10 p-4 place-items-center justify-items-center'>
        <div className='w-72 h-60 border-2 rounded-md border-blue-950 p-8 flex flex-col justify-start items-start gap-3'>
          <p className='text-2xl font-semibold'>Smart Task Management</p>
          <p className='text-sm font-medium'>Organize, prioritize, and track your tasks with intelligent categorization and due date management.</p>
          </div>
        <div className='w-72 h-60 border-2 rounded-md border-blue-950 p-8 flex flex-col justify-start items-start gap-3'>  
          <p className='text-2xl font-semibold'>Calender Integration</p>
          <p className='text-sm font-medium'>View all your deadlines and scheduled tasks in a beautiful calendar interface.</p></div>
        <div className='w-72 h-60 border-2 rounded-md border-blue-950 p-8 flex flex-col justify-start items-start gap-3'>         
          <p className='text-2xl font-semibold'>Progress Analytics</p>
          <p className='text-sm font-medium'>Track your productivity with detailed analytics and progress reports.</p></div>
        <div className='w-72 h-60 border-2 rounded-md border-blue-950 p-8 flex flex-col justify-start items-start gap-3'>
          <p className='text-2xl font-semibold'>Team Collaboration</p>
          <p className='text-sm font-medium'>Assign tasks share progress, and collaborate seamlessly with your team members.</p>
        </div>
      </div>
      <div className='w-full bg-black text-white flex flex-col justify-center items-center font-medium pb-10'>
      <p className='text-2xl font-semibold'>Ready to boost you productivity ?</p>
      <p>join to manage you task more efficienty</p>
      <div className='w-60 h-12 bg-blue-700 flex md:text-2xl sm:text-xl font-bold p-2 justify-center mt-5 rounded-md'>
      <Link to={'/Login'}><button>Continue</button></Link>
      <svg className=' ml-6' xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="ffffff" class="injected-svg" data-src="https://cdn.hugeicons.com/icons/arrow-right-02-solid-sharp.svg" xmlns:xlink="http://www.w3.org/1999/xlink" role="img" color="#ffffff">
<path d="M14.5267 18L13.1187 16.5858L16.6882 13.0006L3.5 13.0006L3.5 11.0006L16.6886 11.0006L13.1186 7.41422L14.5266 6L20.5 12.0003L14.5267 18Z" fill="#ffffff"></path>
</svg>
    </div>
      </div>
    </div>

  </div>
  )
}

export default Home