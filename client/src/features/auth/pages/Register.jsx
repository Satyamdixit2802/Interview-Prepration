import React, {  useState } from 'react'
import toast, { Toaster } from "react-hot-toast";
import {Link, useNavigate} from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Register = () => {
  const navigate = useNavigate();

const {loading, handleRegister} = useAuth();

  const [fullName ,setFullname] = useState("")
  const [username,setUsername] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [cnpassword,setcnPassword] = useState("")

  
async function handleSubmit(e) {
  e.preventDefault();

  
  if (!password || !cnpassword) {
    toast.error("Please enter both passwords")
    return;
  }

  
  if (password !== cnpassword) {
   
     toast.error("Password does not match");
    return; 
  }

 
  await handleRegister({
    fullName,
    username,
    email,
    password
  });

  navigate('/')
}

  return (
    <div className='h-screen w-full flex justify-center items-center bg-gray-700'>
      <Toaster/>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
  <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
</div>
      ):(<div className='bg-white  w-full max-w-md rounded-2xl shadow-lg py-10 px-6 flex flex-col gap-6'>
        
        <h1 className='text-3xl font-bold text-center'>
          Create Account
        </h1>

        <form className='flex flex-col gap-2  font-md' onSubmit={handleSubmit}>
          
          <div className='flex flex-col gap-1'>
            <label >Full Name</label>
            <input type="text" name='fullname' id='fullname' placeholder='Enter your name' className='border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 autofocus'
             onChange={(e)=>setFullname(e.target.value)}/>
          </div>
          <div className='flex flex-col gap-2'>
            <label>Username</label>
            <input type="text" name='username' id='username' placeholder='Enter your username' className='border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
             onChange={(e)=>setUsername(e.target.value)}/>
          </div>
          <div className='flex flex-col gap-2'>
            <label>Email</label>
            <input type="email" name='email' id='email' placeholder='Enter your Email Address' className='border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
             onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <div className='flex flex-col gap-2'>
            <label>password</label>
            <input type="password" name='pass' id='pass' placeholder='Enter Password' className='border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
             onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <div className='flex flex-col gap-2'>
            <label>password</label>
            <input type="password" name='cnpass' id='cnpass' placeholder='Confirm password' className='border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
             onChange={(e)=>setcnPassword(e.target.value)}/>
          </div>
          <button className='bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition active:scale-95'>Register</button>
        </form>
        <p className='text-lg font-md'>Already have an account? <Link to='/login' className='text-gray-600 font-md active:text-color-blue-200'>Login</Link></p>
      </div>)}
      
    </div>
  )
}

export default Register