import { useContext } from "react";
import { AuthContext } from "../Auth.context";
import { register,login,logout } from "../services/auth.api";
import { clearAuthToken, setAuthToken } from "../../../config/api";

export const useAuth = () => {
    const context = useContext(AuthContext)
   const {user,setUser,loading,setLoading} = context
   
   const handleLogin = async ({email,password}) => {
    setLoading(true)
       try {
         
      const data = await login({email,password})
      if (!data?.user) {
        throw new Error("Login failed");
      }
      setAuthToken(data.token)
      setUser(data.user)
      return data.user
       } catch (error) {
         clearAuthToken()
         setUser(null)
         throw error
       }finally{
         setLoading(false)
       }
      
   }

   const handleRegister = async ({fullName,username,email,password}) => {

    setLoading(true)
    try {
        const data = await register({fullName,username,email,password})
    if (!data?.user) {
        throw new Error("Registration failed");
    }
    setAuthToken(data.token)
    setUser(data.user)
    return data.user
    
    } catch (error) {
        clearAuthToken()
        setUser(null)
        throw error
    }finally {
    setLoading(false)
    
    
   }
   }

   const handleLogout = async () => {
    setLoading(true)
    try {
        await logout()
    } catch {
        return null
    }finally {
        clearAuthToken()
        setUser(null)
        setLoading(false)
    }
    
    
   }
 return {user ,loading ,handleLogin,handleRegister,handleLogout }
}
