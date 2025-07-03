import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
 const [form, setform] = useState({firstname:'', lastname:'', email:'', password:''});
 const [Message, setMessage] = useState('')

   const navigate = useNavigate();
 
  const handleChange = (e) => setform({ ...form, [e.target.name]: e.target.value });

 const handleSubmit = async(e) => {
  e.preventDefault();
  try {
   const res = await axios.post('http://localhost:3000/api/auth/register',  {fullname: {
        firstname: form.firstname,
        lastname: form.lastname,
      },
      email: form.email,
      password: form.password,
    }, { withCredentials: true });

   setMessage(res.data.message);
    console.log(res.data);

    if (res.data.success) {
    localStorage.setItem("auth", JSON.stringify({ token: res.data.token }));
      navigate('/Dashboard');
    } else {
      alert(res.data.message || "Register failed");
    }

  } catch (error) {
   console.log(error.response?.data?.message);
  }
 }

 return (
  <div className="h-screen w-screen bg-blue-300 flex justify-center items-center">
   <div className="w-96 h-[60%] bg-blue-950 flex flex-col rounded-md gap-5">

    <div className="w-full h-20 flex justify-center items-center gap-4">
     <img className="w-8 h-8 " src="icon.svg" alt="logo" />
     <h1 className="text-3xl font-bold text-white">TaskFlow</h1>
    </div>

    <div className="w-full h-10 text-2xl text-white font-bold ml-20 mb-3">Create your Account</div>

    <form onSubmit={handleSubmit}>
     <div className="w-full flex flex-col justify-center items-center gap-4">

      <div className="w-[80%] flex rounded-md justify-center items-center p-2 gap-2 text-white">

        <div className="w-[60%] bg-slate-600 p-2 mr-4 flex gap-2 rounded-md justify-center items-center">
       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlnsXlink="http://www.w3.org/1999/xlink" role="img" color="#000000">
        <path d="M17 8.5C17 5.73858 14.7614 3.5 12 3.5C9.23858 3.5 7 5.73858 7 8.5C7 11.2614 9.23858 13.5 12 13.5C14.7614 13.5 17 11.2614 17 8.5Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M19 20.5C19 16.634 15.866 13.5 12 13.5C8.13401 13.5 5 16.634 5 20.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
     <input className=' bg-slate-600 w-full border-none focus:outline-none pl-2' type="text" name="firstname" value={form.firstname} onChange={handleChange} placeholder="First" required/>
        </div>
 
     <input className=' bg-slate-600 w-[60%] p-2 border-none rounded-md justify-center items-center pl-2' type="text" name="lastname" value={form.lastname} onChange={handleChange} placeholder="Last" required/>
      </div>
      
      <div className="w-[80%] flex bg-slate-600 rounded-md justify-center items-center p-2 gap-2 text-white">
       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlnsXlink="http://www.w3.org/1999/xlink" role="img" color="#000000">
        <path d="M4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6C2 4.89543 2.89543 4 4 4Z" stroke="#000000" strokeWidth="1.5" strokeLinejoin="round"></path>
        <path d="M22 7L12.8944 11.5528C12.3314 11.8343 11.6686 11.8343 11.1056 11.5528L2 7" stroke="#000000" strokeWidth="1.5" strokeLinejoin="round"></path>
       </svg>
       <input className=' bg-slate-600 w-full border-none focus:outline-none pl-2' type="email" name="email" value={form.email} onChange={handleChange}
          required placeholder="Enter your Email" />
      </div>

      <div className="w-[80%] flex bg-slate-600 rounded-md justify-center items-center p-2 gap-2 text-white">
       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlnsXlink="http://www.w3.org/1999/xlink" role="img" color="#000000">
        <path d="M17.9998 9H6C4.89536 9 3.9999 9.89554 4 11.0002L4.00083 20.0002C4.00093 21.1047 4.89633 22 6.00083 22H17.9998C19.1044 22 19.9998 21.1046 19.9998 20V11C19.9998 9.89543 19.1044 9 17.9998 9Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M16.5 8.99805V6.49805C16.5 4.01277 14.4853 1.99805 12 1.99805C9.51472 1.99805 7.5 4.01277 7.5 6.49805V8.99805" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M16 15.49V15.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M12 15.49V15.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M8 15.49V15.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
       </svg>
       <input className=' bg-slate-600 w-full border-none focus:outline-none pl-2' type="password" name="password" value={form.password} onChange={handleChange}
          required placeholder="Enter password" />
      </div>

     </div>
      <button className="w-[80%] rounded-md text-white bg-blue-600 p-2 mt-8 ml-9" type="Submit">Register</button>

     <p className="text-white text-md p-5 ml-9">Already have an account ? <Link to='/Login'><span className='text-blue-600 underline'>Login here</span></Link></p>

    </form>
   </div>
  </div>
 )
}

export default Register;