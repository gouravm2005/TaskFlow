import {React, useState, useEffect} from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import AddTask from '../components/AddTask'
import axios from 'axios'

const QuickNotes = () => {
 const [panelopen, setpanelopen] = useState(true)
 const [showform, setshowform] = useState(false)
 const [add, setadd] = useState(false)
 const [form, setform] = useState({title:'', content:'', _id:''})
 const [notes, setnotes] = useState([''])
 const [noteId, setnoteId] = useState('')
 const [isedit, setisedit] = useState(false)

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

useEffect(() => {
  fetchNotes();
}, []);
  
const fetchNotes = async () => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  if (!auth?.token) return;

  try {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/note/notes`, {
      headers: { Authorization: `Bearer ${auth.token}` }
    });
    setnotes(res.data.notes);
  } catch (err) {
    console.log(err);
  }
};

const addnote = async () => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  if (!auth || !auth.token) return;

  if (isedit && noteId) {
    // Edit note
    await axios
      .put(`${import.meta.env.VITE_BASE_URL}/api/note/editnote/${form._id}`, form, {
        headers: { Authorization: `Bearer ${auth.token}` }
      })
      .then(res => {
        console.log("Note updated");
        setadd(false);
        setisedit(false);
        fetchNotes();
      })
      .catch(err => console.log(err));
  } else {
    // Create new note
    await axios
      .post(`${import.meta.env.VITE_BASE_URL}/api/note/addnote`, form, {
        headers: { Authorization: `Bearer ${auth.token}` }
      })
      .then(res => {
        console.log("Note added");
        setadd(false);
        fetchNotes();
      })
      .catch(err => console.log(err));
  }
};

//  const getnote = async () => {
//   const auth = JSON.parse(localStorage.getItem("auth"))
//   if(!auth || !auth.token) return;

//   await axios.get(`${import.meta.env.VITE_BASE_URL}/api/note/notes`, {
//     headers: { Authorization: `Bearer ${auth.token}` }
//   })
//   .then(res => setform(res.data.note))
//   .catch(err => console.log(err))

//   editnote()
//  }

//  const editnote = async () => {
//   setnoteId(form._id)
//   const auth = JSON.parse(localStorage.getItem("auth"))
//   if(!auth || !auth.token) return;

//   await axios.post(`${import.meta.env.VITE_BASE_URL}/api/note/editnote/${noteId}`,form, {
//     headers: { Authorization: `Bearer ${auth.token}` }
//   })
//   .then(res => setform(res.data))
//   .catch(err => console.log(err))

//   setadd(false)
//  }

 return (
   <div className='w-screen h-screen box-border flex flex-col'>
    <Navbar openform={() => setshowform(true)} />
   <div className='w-full h-full flex bg-black'>
    {panelopen ? (<Sidebar onClose={() => setpanelopen(false)} />):(<img onClick={() => setpanelopen(true)} className="w-8 h-8 m-2 mt-4" src='sidebar.svg'></img>) }
<div className='w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 p-5 bg-gray-950 text-white relative'>

  {notes.map(note => (
    <div
      key={note._id}
      onClick={() => {
        setadd(true);
        setisedit(true);
        setform({ title: note.title, content: note.content, _id: note._id });
        setnoteId(note._id);
      }}
      className='w-full h-36 p-3 bg-yellow-200 text-black rounded-md shadow-md cursor-pointer hover:scale-105 transition-all duration-300 overflow-hidden'
    >
      <h1 className='font-bold text-lg truncate'>{note.title}</h1>
      <p className='text-sm mt-2 line-clamp-4 overflow-hidden'>
        {note.content}
      </p>
    </div>
  ))}

  <div
    onClick={() => {
      setadd(true);
      setisedit(false);
      setform({ title: '', content: '', _id: '' });
    }}
    className='w-full h-36 p-3 flex items-center justify-center bg-slate-700 text-white rounded-md shadow-md cursor-pointer hover:bg-slate-600 transition-all duration-300'
  >
    + Add Note
  </div>
</div>

     {add && 
       (<div className=" w-full absolute top-22 left-0 right-2 h-[90%] z-50 flex flex-col justify-center items-center p-6 bg-slate-700 text-white">

         <div className='w-full h-12 flex justify-between items-center mb-10 p-4'>
          <h1 className='text-xl font-semibold pt-1'>{form.title}</h1>
          <div className='flex h-8 gap-5 justify-center items-center'>
          <img onClick={addnote} className='w-4 md:w-6 h-6 pt-1 cursor-pointer' src="save.svg" alt="" />
          <h1 onClick={() => setadd(false)} className='text-lg md:text-1xl font-semibold mt-1 cursor-pointer'>✕</h1>
          </div>
        </div>

      <div className=' w-[80%] md:w-[60%] h-[90%] flex flex-col'>
       
      <input name='title' type='text' value={form.title} onChange={handleChange} placeholder='Title' className='w-full h-28 pl-5 text-2xl md:text-3xl font-medium bg-slate-700 text-white border rounded-md focus:outline-none shadow-slate-300'/>
      <textarea
        name='content'
        value={form.content}
        onChange={handleChange}
        rows={10} 
        cols={50} 
        placeholder="Start typing..."
        className='w-full h-full pl-5 pt-8 mt-6 text-xl bg-slate-700 text-white border rounded-md focus:outline-none'/> 
      </div>
      </div>)}
    </div>
    
    {showform && <AddTask onClose={() => setshowform(false)}/>}
   </div>
 )
}

export default QuickNotes