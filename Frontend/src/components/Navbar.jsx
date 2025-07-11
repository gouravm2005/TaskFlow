import {React, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import SearchCard from "./SearchCard";
import Taskcard from "./Taskcard";

const Navbar = ({openform}) => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  
  return (
    <div className='w-full ml-auto h-20 bg-black text-white border border-gray-800'>
     <div className='h-full flex justify-end items-center gap-4 mr-5'>
      <div className='w-8 md:w-60 h-8 flex bg-gray-700 rounded-md justify-around relative'>

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

        <img className='w-6 mr-2' src="search.svg" alt="" />
      </div> 
      <img className='w-6 ml-6' src="Notification.svg" />
      <button onClick={openform} className='md:w-28 md:h-8 w-20 h-8 bg-blue-600 text-white text-sm md:text-md rounded-md'>Add Task</button>
     </div>
    </div>
  )
}

export default Navbar