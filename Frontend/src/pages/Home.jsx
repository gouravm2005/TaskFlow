import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  return (
  <div className='w-screen h-screen bg-black text-white'>
    <div className='w-full h-20 flex justify-between items-center'>
       <div className='w-28 h-24 p-5 flex justify-center items-center border-b-1 ml-14 border-gray-600 gap-4'>
        <img className='w-6 h-6 md:w-10 md:h-10 mt-2 md:mt-0' src="/icon.svg" alt="icon" />
        <h1 className='text-2xl md:text-3xl font-bold mt-1 md:mt-0'>TaskFlow</h1>
      </div>
      <div className='w-52 h-20 mt-1 flex gap-4 justify-center items-center mr-2'>
      <button onClick={() => navigate('/Register')} className='w-20 h-8 bg-blue-700 text-white rounded-md cursor-pointer text-md font-medium'>Sign up</button>
      <button onClick={() => navigate('/Login')} className='w-20 h-8 border border-white text-white rounded-md cursor-pointer text-md font-medium'>Login</button> 
      </div>

      </div>
    <div className='w-full flex flex-col justify-center items-center'>
     <div className='flex align-middle justify-center pt-24'><img className='w-12 border-none rounded-xl' src="icon.svg"/></div>
     <div className='text-5xl font-bold w-full h-12 align-middle flex justify-center mt-6'> TaskFlow</div>
     <div className='text-md font-medium w-full flex flex-col justify-center items-center mt-5 sm:pl-20'>
      <p className='w-full text-center text-lg'>The ultimate task management solution, Organize your work,</p>
      <p className='w-full text-center text-lg'>track progress with an intuitive dashboard, manage tasks by categories, and capture ideas with Quick Notes</p></div>
    <div onClick={() => navigate('/Login')} className='w-48 md:w-52 h-10 bg-blue-700 flex md:text-xl text-lg font-bold p-2 justify-center mt-10 rounded-md gap-2 cursor-pointer'>
      <button>Get Started</button>
     <svg className='ml-4' xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="ffffff" class="injected-svg" data-src="https://cdn.hugeicons.com/icons/arrow-right-02-solid-sharp.svg" xmlns:xlink="http://www.w3.org/1999/xlink" role="img" color="#ffffff">
<path d="M14.5267 18L13.1187 16.5858L16.6882 13.0006L3.5 13.0006L3.5 11.0006L16.6886 11.0006L13.1186 7.41422L14.5266 6L20.5 12.0003L14.5267 18Z" fill="#ffffff"></path>
</svg>
  </div>
   </div>

    <div className='w-full bg-black text-white flex flex-col justify-center items-center gap-12'>
      <div className='w-full h-60 flex flex-col justify-center items-center sm:pl-5'>
        <h1 className='text-3xl text-center  sm:text:lg font-medium'>Everything you need to stay productive</h1>
        <h2 className='text-md  text-center font-medium mt-5'>powerfull features design for manage tasks</h2>
        <h2 className='text-md  text-center font-medium'>and track your progress like never before</h2>
      </div>
      <div className='w-full bg-black text-white grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 md:gap-x-10 p-4 place-items-center justify-items-center'>
        <div className='w-72 h-60 border-2 rounded-md border-blue-950 p-8 flex flex-col justify-start items-start gap-3'>
         <p className='text-2xl font-semibold'>Smart Task Management</p>
          <p className='text-sm font-medium'>Organize, prioritize, and track your tasks with intelligent categorization and due date management.</p>
          </div>
        <div className='w-72 h-60 border-2 rounded-md border-blue-950 p-8 flex flex-col justify-start items-start gap-3'>         
          <p className='text-2xl font-semibold'>Progress Analytics</p>
          <p className='text-sm font-medium'>Track your productivity with detailed analytics and progress reports.</p></div>
        <div className='w-72 h-60 border-2 rounded-md border-blue-950 p-8 flex flex-col justify-start items-start gap-3'>  
          <p className='text-2xl font-semibold'>Calender Integration</p>
          <p className='text-sm font-medium'>View all your deadlines and scheduled tasks in a beautiful calendar interface.</p></div>
        <div className='w-72 h-60 border-2 rounded-md border-blue-950 p-8 flex flex-col justify-start items-start gap-3'>
          <p className='text-2xl font-semibold'>Quick Notes</p>
          <p className='text-sm font-medium'>Quickly write down ideas, reminders, and short notes effortlessly</p>
        </div>
      </div>
      <div className='w-full bg-black text-white flex flex-col justify-center items-center font-medium pb-10'>
      <p className='text-2xl font-semibold'>Ready to boost you productivity ?</p>
      <p>join to manage you task more efficienty</p>
      <div onClick={() => navigate('/Login')} className='w-48 md:w-52 h-10 bg-blue-700 flex md:text-xl text-lg font-bold p-2 justify-center mt-5 rounded-md gap-4 cursor-pointer'>
      <button>Continue</button>
      <svg className=' ml-6' xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="ffffff" class="injected-svg" data-src="https://cdn.hugeicons.com/icons/arrow-right-02-solid-sharp.svg" xmlns:xlink="http://www.w3.org/1999/xlink" role="img" color="#ffffff">
<path d="M14.5267 18L13.1187 16.5858L16.6882 13.0006L3.5 13.0006L3.5 11.0006L16.6886 11.0006L13.1186 7.41422L14.5266 6L20.5 12.0003L14.5267 18Z" fill="#ffffff"></path>
</svg>
    </div>
      </div>
    </div>

  </div>
  )
}

export default Home