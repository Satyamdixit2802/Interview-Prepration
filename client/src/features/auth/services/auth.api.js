import axios from 'axios';

const api = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true,
    headers : {
        "Content-Type" : "application/json"
    }
})

//Register user
 export async function register({fullname ,username , email, password}){
   try {

    const response = await api.post( 'api/v1/auth/register',{
        fullname,
        username,
        email,
        password
    })
    return response.data;
   }catch (error){
    console.log(error);
    
   }
}
//logn useer 

export async function login({ email, password}){
   try {

    const response = await api.post( '/api/v1/auth/login',{
        
        email,
        password
    })
    return response.data;
   }catch (error){
    console.log(error);
    
   }
}

export async function logout(){
    try {
        const response = await api.get( '/api/v1/auth/logout',)
        return response.data;
        
    } catch (error) {
        console.log(error);
        
    }
}

export async function getMe () {
    try {
         const response = await api.get('/api/v1/auth/get-me',)
         return response.data;
    }catch (error){
        console.log(error);
        
    }
}