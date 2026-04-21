import api from '../../../config/api.js';

//Register user
 export async function register({fullName ,username , email, password}){
   try {

    const response = await api.post( '/api/v1/auth/register',{
        fullName,
        username,
        email,
        password
    })
     return response.data;
   }catch (error){
     console.error("Register error:", error.response?.data || error.message);
     throw error
   }
 }
//login user 

export async function login({ email, password}){
   try {

    const response = await api.post( '/api/v1/auth/login',{
        
        email,
        password
    })
     return response.data;
   }catch (error){
     console.error("Login error:", error.response?.data || error.message);
     throw error
   }
}

export async function logout(){
    try {
        const response = await api.get( '/api/v1/auth/logout',)
        return response.data;
        
    } catch (error) {
        console.error("Logout error:", error.response?.data || error.message);
        throw error
    }
}

export async function getMe () {
    try {
         const response = await api.get('/api/v1/auth/get-me',)
         return response.data;
    }catch (error){
        console.error("GetMe error:", error.response?.data || error.message);
        throw error
    }
}
