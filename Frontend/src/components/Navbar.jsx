import React from 'react'

const Navbar = () => {
  return (
    <div className='w-[80%] ml-auto h-20 bg-black text-white border-2 border-gray-400'>
     <div className='h-full flex justify-end items-center gap-4 mr-5'>
      <div className=''><input className='w-72 h-8 flex bg-white text-black p-4 rounded-sm' type="text" placeholder='Search Taks..'/></div> 
      <svg className='w-10 h-10' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#D3D3D3" class="injected-svg" data-src="https://cdn.hugeicons.com/icons/notification-01-bulk-rounded.svg" xmlns:xlink="http://www.w3.org/1999/xlink" role="img" color="#D3D3D3">
<path d="M15.75 20C15.0345 21.3387 13.624 22.25 12 22.25C10.376 22.25 8.96548 21.3387 8.25 20H15.75Z" fill="#D3D3D3"></path>
<path opacity="0.4" d="M20.4092 13.8467C19.9872 13.4247 19.75 12.8526 19.75 12.2559V9.5C19.75 5.21979 16.2802 1.75 12 1.75C7.71979 1.75 4.25 5.21979 4.25 9.5V12.2559C4.24999 12.778 4.06829 13.2813 3.74023 13.6816L3.59082 13.8467L2.9873 14.4502C2.51512 14.9225 2.25 15.5635 2.25 16.2314C2.25017 17.6223 3.37767 18.7498 4.76855 18.75H19.2314C20.6223 18.7498 21.7498 17.6223 21.75 16.2314C21.75 15.5635 21.4849 14.9225 21.0127 14.4502L20.4092 13.8467Z" fill="#D3D3D3"></path>
</svg>
      <button className='w-28 h-8 bg-blue-500 text-white rounded-sm'>Add Task</button>
     </div>
    </div>
  )
}

export default Navbar