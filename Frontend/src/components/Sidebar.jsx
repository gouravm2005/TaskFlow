import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Sidebar = () => {

const [data, setdata] = useState({firstname:'', lastname:'', email:''})
const [clicked, setclicked] = useState(false)

const [categories, setCategories] = useState([]);
const [newCat, setNewCat] = useState("");

const navigate = useNavigate();

 useEffect(() => {

   const auth = JSON.parse(localStorage.getItem("auth"));
   if(!auth || !auth.token)
    return
   
   if(auth){
    console.log(auth.token)
    axios.get(`${import.meta.env.VITE_BASE_URL}/api/auth/profile`,{
      headers: {
      Authorization: `Bearer ${auth.token}`,
    },
    })
    .then(res => setdata(res.data))
    .catch(err => console.log({"profileError" : err}))
   }

    axios.get("http://localhost:3000/api/category/all", {
    headers: { Authorization: `Bearer ${auth.token}` }
  }).then(res => {
    if (res.data.success) setCategories(res.data.categories);
  });

 }, [])

 const handleAddCategory = async (e) => {
  if (e.key === "Enter" && newCat) {
    await axios.post("http://localhost:3000/api/category/create", { name: newCat }, {
      headers: { Authorization: `Bearer ${auth.token}` }
    });
    setNewCat("");
    setclicked(false);
    // refresh list
  }
};
 
  return (
    <div className='lg:w-[20%] sm:w-[25%] h-screen bg-black text-white border-2 border-gray-800 box-border overflow-hidden relative'>

      <div className='w-full h-24 p-5 flex justify-start items-center border-b-1 border-gray-600 gap-4'>
        <img className='w-6 h-6 md:w-10 md:h-10' src="icon.svg" alt="icon" />
        <h1 className='text-2xl md:text-3xl font-bold'>TaskFlow</h1>
      </div>

      <div className='w-full h-60 flex flex-col justify-center items-start pl-6 gap-8'>
        <div onClick={() => navigate('/Dashboard')} className='flex gap-2 cursor-pointer hover:text-blue-600'>
          <img className='cursor-pointer' src="dashboard.svg" />
          <h1 className='md:text-xl text-lg font-medium'>Dashboard</h1>
        </div>
        <div onClick={() => navigate('/AllTasks')} className='flex gap-2 cursor-pointer hover:text-blue-600'>
          <img src="task.svg" />
          <h1 className='md:text-xl text-lg font-medium'>All Tasks</h1>
        </div>
          <div onClick={() => navigate('/Calendar')}  className='flex gap-2 cursor-pointer hover:text-blue-600'>
          <img src="calendar.svg" />
          <h1 className='md:text-xl text-lg font-medium'>Calendar</h1>
        </div>
        <div onClick={() => navigate('/Team')}  className='flex gap-2 cursor-pointer hover:text-blue-600'>
          <img src="team.svg" />
          <h1 className='md:text-xl text-lg font-medium'>Team</h1>
        </div>
      </div>

      <div className='w-full flex flex-col justify-start items-start gap-4 p-5 mt-8'>
        <div className='flex justify-around gap-3'>
          <h1 className='md:text-2xl text-2xl font-semibold '>Categories</h1>
          <img className='w-5 md:w-8' src="category.svg" />
        </div>
      
       <div className='w-full h-full flex flex-col text-sm font-medium p-2 gap-2'>
        {categories.map(cat => (
          <div key={cat._id} onClick={() => navigate(`/Categorytask/${cat._id}`)}>{cat.name}</div>
         ))}

       {clicked ? (
         <input
          className="w-28 h-6 p-2 rounded bg-gray-600"
          type="text"
          placeholder="New Category"
          value={newCat}
          onChange={(e) => setNewCat(e.target.value)}
          onKeyDown={handleAddCategory}
         />
       ) : (
        <div onClick={() => setclicked(true)} className='w-full text-md font-medium ml-2'>+ Add</div>
       )}
     </div>

      <div className='w-full h-16 text-white border border-gray-800 absolute bottom-0'>
        <div className='w-full p-0 md:p-3 flex justify-start items-center gap-1 md:gap-4'>
          <div className='w-10 h-10 md:w-12 md:h-12 text-sm md:text-md rounded-full flex justify-center items-center bg-slate-500'>{data.firstname.charAt(0)}{data.lastname.charAt(0)}</div>
          <div className='w-10 flex flex-col'>
            <div className='flex text-md md:text-lg'><h1>{data.firstname}</h1> <h1>{data.lastname}</h1></div>
           <h1 className='text-sm md:text-md'>{data.email}</h1>
          </div>
          </div>
        </div>
       
    </div>
  </div>
  )
}

export default Sidebar