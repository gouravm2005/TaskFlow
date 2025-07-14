import {React, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import SearchCard from "./SearchCard";
import Taskcard from "./Taskcard";
import NotificationCard from './NotificationCard';

const Navbar = ({openform}) => {
  const navigate = useNavigate();
  const [isactive, setisactive] = useState(false)
  const [searchText, setSearchText] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [search, setsearch] = useState(false)

  useEffect(() => {
   console.log("Taskcard mounted");
}, []);
  
  return (
    <div className='w-full h-[100px] flex justify-between gap-2 bg-black text-white border border-gray-800'>
        <div className='w-28 h-24 p-5 flex justify-center items-center border-b-1 ml-14 border-gray-600 gap-4'>
        <img className='w-6 h-6 md:w-10 md:h-10 mt-2 md:mt-0' src="/icon.svg" alt="icon" />
        <h1 className='text-2xl md:text-3xl font-bold mt-1 md:mt-0'>TaskFlow</h1>
      </div>

     {search ? (<div className='w-44 md:w-[80%] flex justify-end items-center gap-4 mr-2'>
      <div className='w-full md:w-60 h-8 flex bg-gray-700 rounded-md justify-around relative cursor-pointer'>

        <input className='md:w-52 h-6 w-full border-none focus:outline-none md:bg-gray-700 bg-black text-white p-4' 
        type="text" 
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => {setTimeout(() => setShowSuggestions(false), 200), setsearch(false)}}
        placeholder='Search Taks..'/>

        {showSuggestions && (
        <SearchCard
          query={searchText}
          onSelectTask={(id) => {
            setSelectedTaskId(id);
            setShowSuggestions(false);
            setSearchText("");
          }}
        />
      )}


      {selectedTaskId && (
        <Taskcard
          taskId={selectedTaskId}
          onClose={() => setSelectedTaskId(null)}
        />
      )}

        <img onClick={() => {setsearch(true), setShowSuggestions(true)}} className='w-6 mr-2' src="/search.svg" alt="" />
      </div> 
     </div>)
      :
      (<div className='w-44 md:w-[80%] flex justify-end items-center gap-4 mr-2'>
      <div className='w-8 md:w-60 h-8 flex bg-gray-700 rounded-md justify-around relative cursor-pointer'>

        <input className='md:w-52 h-6 w-0 border-none focus:outline-none md:bg-gray-700 bg-black text-white p-4' 
        type="text" 
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        placeholder='Search Taks..'/>

        {showSuggestions && (
        <SearchCard
          query={searchText}
          onSelectTask={(id) => {
            setSelectedTaskId(id);
            setShowSuggestions(false);
            setSearchText("");
          }}
        />
      )}
    
      {selectedTaskId && (
        <Taskcard
          taskId={selectedTaskId}
          onClose={() => setSelectedTaskId(null)}
        />
      )}

        <img onClick={() => setsearch(true)} className='w-6 mr-2' src="/search.svg" alt="" />
      </div> 
      <img onClick={() => setisactive(true)} className='w-6 ml-6 cursor-pointer' src="/Notification.svg" />
      {isactive && <NotificationCard onClose={() => setisactive(false)}/>}
      <button onClick={openform} className='md:w-28 md:h-8 w-20 h-8 bg-blue-600 text-white text-sm md:text-md rounded-md cursor-pointer'>Add Task</button>
     </div>)}

    </div>
  )
}

export default Navbar