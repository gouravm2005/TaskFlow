import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Sidebar = ({ onClose }) => {

  const [data, setdata] = useState({ firstname: '', lastname: '', email: '', id: '' })
  const [clicked, setclicked] = useState(false)

  const [categories, setCategories] = useState([]);
  const [newCat, setNewCat] = useState("");
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [ShowEditForm, setShowEditForm] = useState(false)
  const [editCatId, setEditCatId] = useState(null);
  const [editCatName, setEditCatName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {

    const auth = JSON.parse(localStorage.getItem("auth"));
    if (!auth || !auth.token)
      return

    if (auth) {
      axios.get(`${import.meta.env.VITE_BASE_URL}/api/auth/profile`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
        .then(res => setdata(res.data))
        .catch(err => console.log({ "profileError": err }))
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/api/category/all`, {
      headers: { Authorization: `Bearer ${auth.token}` }
    }).then(res => {
      if (res.data.success) setCategories(res.data.categories);
    })
      .catch(err => console.log("error in get all category", err))

  }, [])

<<<<<<< HEAD
=======
  const handleAddCategory = async (e) => {
    if (e.key === "Enter" && newCat.trim() !== "") {
      const auth = JSON.parse(localStorage.getItem("auth"))
      if (!auth || !auth.token)
        return;

      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/category/create`, { name: newCat }, {
        headers: { authorization: `Bearer ${auth.token}` }
      })
        .then(res => console.log(res))
        .catch(err => console.log("error in create a new category", err))
      setNewCat("");
      setclicked(false);
      // refresh list
    }
  };

>>>>>>> 67fb7f2cba99dcb3bd6060f4f193d6d1917521be
  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });

  };

  const handleLogout = async () => {
    await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/logout`);
    localStorage.removeItem("auth");
    navigate("/login"); // redirect to login

  };

  const handleSubmit = async () => {
    const auth = JSON.parse(localStorage.getItem("auth"))
    if (!auth || !auth.token) return;

    const userId = data.id;

    await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/editprofile/${userId}`, {
      firstname: data.firstname,
      lastname: data.lastname,
    }, {
      headers: { Authorization: `Bearer ${auth.token}` }
    })
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  }

  const handleEditCategory = async (e, id) => {
    if (e.key === "Enter" && editCatName.trim() !== "") {
      const auth = JSON.parse(localStorage.getItem("auth"));
      if (!auth || !auth.token) return;

      await axios.put(`${import.meta.env.VITE_BASE_URL}/api/category/edit/${id}`,
        { name: editCatName },
        { headers: { authorization: `Bearer ${auth.token}` } }
      )
        .then(() => {
          setEditCatId(null);
          useEffect();
        })
        .catch(err => console.log("error in updating category", err));
    }
  };

  const handleDeleteCategory = async (id) => {
    const confirm = window.confirm("Delete this category?");
    if (!confirm) return;

    const auth = JSON.parse(localStorage.getItem("auth"));
    if (!auth || !auth.token) return;

    await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/category/delete/${id}`, {
      headers: { authorization: `Bearer ${auth.token}` }
    })
      .then(() => {
        useEffect();
      })
      .catch(err => console.log("error in deleting category", err));
  };

  const handleCreateCategory = async (e) => {
    if (e.key === 'Enter' && editCatName.trim() !== '') {
      const auth = JSON.parse(localStorage.getItem("auth"));
      if (!auth?.token) return;

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/category/create`,
          { name: editCatName },
          { headers: { Authorization: `Bearer ${auth.token}` } }
        );
        setCategories(prev => [...prev, res.data.category]);
      } catch (err) {
        console.error("Create category failed", err);
      }

      setEditCatId(null);
      setEditCatName('');
      useEffect();
    }
  };

  return (
    <div className='w-[200px] min-w-[200px] lg:w-[20%] lg:min-w-[200px] h-[100%] bg-black text-white border-2 border-gray-800 box-border overflow-hidden relative'>

      <img onClick={onClose} className="w-8 h-8 ml-40 md:ml-36 lg:ml-48 mt-2 cursor-pointer" src="/sideclose.svg" alt="" />

      <div className='w-full h-60 flex flex-col justify-center items-start pl-6 gap-8'>
        <div onClick={() => navigate('/Dashboard')} className='flex gap-2 cursor-pointer hover:text-blue-600'>
          <img className='cursor-pointer' src="/dashboard.svg" />
          <h1 className='md:text-xl text-lg font-medium'>Dashboard</h1>
        </div>
        <div onClick={() => navigate('/AllTasks')} className='flex gap-2 cursor-pointer hover:text-blue-600'>
          <img className='cursor-pointer' src="/task.svg" />
          <h1 className='md:text-xl text-lg font-medium'>All Tasks</h1>
        </div>
        <div onClick={() => navigate('/Calendar')} className='flex gap-2 cursor-pointer hover:text-blue-600'>
          <img className='cursor-pointer' src="/calendar.svg" />
          <h1 className='md:text-xl text-lg font-medium'>Calendar</h1>
        </div>
        <div onClick={() => navigate('/QuickNotes')} className='flex gap-2 cursor-pointer hover:text-blue-600'>
          <img className='w-8 h-8 cursor-pointer' src="/notes.svg" />
          <h1 className='md:text-xl text-lg font-medium'>QuickNotes</h1>
        </div>
      </div>

      <div className='w-full flex flex-col justify-start items-start gap-4 p-5 mt-8'>
        <div className='flex justify-around gap-3 md:gap-6'>
          <h1 className='md:text-2xl text-2xl pl-2 font-semibold '>Categories</h1>
          <img className='w-5 md:w-6 mt-1' src="/category.svg" />
        </div>

        <div className='w-full h-full flex flex-col text-sm font-medium p-2 gap-2'>
          {categories.map(cat => (
            <div
              key={cat._id}
              className="flex items-center justify-between group w-full"
            >
              {editCatId === cat._id ? (
                <input
                  className="w-28 h-6 p-2 rounded bg-gray-600"
                  type="text"
                  value={editCatName}
                  onChange={(e) => setEditCatName(e.target.value)}
                  onKeyDown={(e) => handleEditCategory(e, cat._id)}
                  onBlur={() => setEditCatId(null)}
                  autoFocus
                />
              ) : (
                <div
                  onClick={() => navigate(`/Categorytask/${cat._id}`)}
                  className="text-lg font-semibold cursor-pointer group-hover:underline"
                >
                  {cat.name}
                </div>
              )}

              <div className="opacity-0 group-hover:opacity-100 flex gap-2">
                <img
                  src="/edit.svg"
                  alt="edit"
                  onClick={() => {
                    setEditCatId(cat._id);
                    setEditCatName(cat.name);
                  }}
                  className="w-4 h-4 cursor-pointer"
                />
                <img
                  src="/delete.svg"
                  alt="delete"
                  onClick={() => handleDeleteCategory(cat._id)}
                  className="w-4 h-4 cursor-pointer"
                />
              </div>
            </div>
          ))}

          {editCatId === 'new' ? (
            <input
              className="w-28 h-6 p-2 rounded bg-gray-600"
              type="text"
              value={editCatName}
              onChange={(e) => setEditCatName(e.target.value)}
              onKeyDown={handleCreateCategory}
              onBlur={() => setEditCatId(null)}
              autoFocus
            />
          ) : (
            <div
              onClick={() => {
                setEditCatId('new');
                setEditCatName('');
              }}
              className='w-full h-7 text-center text-md font-medium border rounded-md bg-blue-950 px-2 py-1 mt-2 cursor-pointer hover:bg-blue-800'
            >
              + Add Category
            </div>
          )}
        </div>


        <div onClick={() => setShowProfilePopup(prev => !prev)} className='w-full h-16 text-white border border-gray-800 absolute bottom-0'>
          <div className='w-full p-0 md:p-3 flex justify-start items-center gap-1 md:gap-4 cursor-pointer'>
            <div className='w-10 h-10 md:w-12 md:h-12 text-sm md:text-md rounded-full flex justify-center items-center bg-slate-500'>{data.firstname.charAt(0)}{data.lastname.charAt(0)}</div>
            <div className='w-10 flex flex-col'>
              <div className='flex text-md md:text-lg'><h1>{data.firstname}</h1> <h1>{data.lastname}</h1></div>
              <h1 className='text-sm md:text-md'>{data.email}</h1>
            </div>
          </div>
        </div>

        {showProfilePopup && (
          <div className="absolute bottom-2 left-2 w-40 md:w-44 lg:w-60 bg-white text-black rounded shadow-md z-50">
            <div onClick={() => setShowProfilePopup(false)} className='w-full h-2 pl-[80%] text-sm m-2 cursor-pointer'>✕</div>
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setShowEditForm(true);
                setShowProfilePopup(false);
              }}
            >
              ✏️ Edit Profile
            </button>
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={handleLogout}
            >
              🚪 Logout
            </button>
          </div>
        )}

        {ShowEditForm && (<div className='absolute bottom-2 left-2 w-40 md:w-44 lg:w-60 h-40 p-3 gap-2 flex flex-col bg-white text-black rounded shadow-md z-50'>
          <div onClick={() => setShowEditForm(false)} className='w-full flex justify-between gap-10 mb-2'>
            <h1 className='w-44 md:w-20 test-3xl font-semibold'>Edit Profile</h1> <p className='text-sm cursor-pointer'>✕</p>
          </div>
          <input className='w-32 h-6 text-sm font-medium border' name="firstname" value={data.firstname} onChange={handleChange} />
          <input className='w-32 h-6 text-sm font-medium border' name="lastname" value={data.lastname} onChange={handleChange} />
          <button onClick={handleSubmit} className='w-12 h-6 rounded-md bg-blue-700 text-white text-sm font-semibold mt-2 cursor-pointer'>Save</button>
        </div>)}

      </div>
    </div>
  )
}

export default Sidebar
