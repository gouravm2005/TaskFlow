import {React, useState} from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import AddTask from '../components/AddTask'

const Calendar = () => {
 const [showform, setshowform] = useState(false)
 return (
  <div className='w-screen h-screen box-border flex'>
   <Sidebar />
    <div className='w-[80%]  h-full flex flex-col'>
     <Navbar openform={() => setshowform(true)} />
     <div className='w-full h-full bg-gray-950'></div>
     {showform && <AddTask onClose={() => setshowform(false)}/>}
     </div>
  </div>
 )
}

export default Calendar