import {  useContext ,useEffect } from "react";
import { AuthContext } from "../Auth.context";
import { register,login,logout,getMe } from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext)
   const {user,setUser,loading,setLoading} = context
   
   const handleLogin = async ({email,password}) => {
    setLoading(true)
      try {
        
      const data = await login({email,password})
      setUser(data.user)
      } catch (error) {
        console.log(error);
        
      }finally{
        setLoading(false)
      }
      
   }

   const handleRegister = async ({fullName,username,email,password}) => {

    setLoading(true)
    try {
        const data = await register({fullName,username,email,password})
    setUser(data.user)
  
    
    } catch (error) {
        console.log(error);
        throw error
    }finally {
    setLoading(false)
    
    
   }
   }

   const handleLogout = async () => {
    setLoading(true)
    try {
        await logout()
    setUser(null)
    } catch (error) {
        console.log(error);
    }finally {
        setLoading(false)
    }
    
    
   }

   
  useEffect(()=>{
    const getAndSetUser = async ()=> {
       const data = await getMe()
       setUser(data.user)
       setLoading(false)
    }
    getAndSetUser()
  },[])
return {user ,loading ,handleLogin,handleRegister,handleLogout }
}