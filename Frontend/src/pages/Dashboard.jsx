import {React, useState} from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import AddTask from '../components/AddTask'

const Dashboard = () => {
  const [showform, setshowform] = useState(false)

 return (
 <div className='w-screen h-screen box-border flex'>
     <Sidebar/>
     <div className='w-[80%]  h-full flex flex-col'>
     <Navbar openform={() => setshowform(true)}/>
     <div className='w-full h-full bg-red-700'></div>
      {showform && <AddTask onclose={() => setshowform(false)}/>}
     </div>
   </div>
  )
}

export default Dashboard