import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

import { Navigate, Link, useNavigate } from 'react-router'

const LogIn = () => {

  const navigate = useNavigate();
const {loading , handleLogin} = useAuth()
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

 async function handleSubmit(e)  {
      e.preventDefault()
      handleLogin({email,password})
     navigate('/')
}



  

  return (
   <div className='h-screen w-full flex justify-center items-center bg-gray-700 '>
        
       {loading ? (
        <div className="flex justify-center items-center h-screen">
  <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
</div>
       ):(
          <div className='bg-white  w-full max-w-md rounded-2xl shadow-lg py-10 px-10 flex flex-col gap-6' >
            
          
          <h1 className='text-3xl font-bold text-center'>
            LogIn
          </h1>
  
          <form className='flex flex-col gap-4  font-md' onSubmit={handleSubmit}>
            
          
           
            <div className='flex flex-col gap-2'>
              <label>Email</label>
              <input type="email" name='email' id='email' placeholder='Enter your Email Address' className='border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
               onChange={(e)=>{setEmail(e.target.value)}} />
            </div>
            <div className='flex flex-col gap-2'>
              <label>password</label>
              <input type="password" name='pass' id='pass' placeholder='Enter Password' className='border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400' onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>
          
            <button className='bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition active:scale-95'>LogIn</button>
          </form>
          <p className='text-lg font-md'>Don't have an account? <Link to='/register' className='text-gray-600 font-md active:text-color-blue-200'>Register</Link></p>
        </div>
       )}
      </div>
  )
}

export default LogIn
