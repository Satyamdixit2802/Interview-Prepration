import api from '../../../config/api.js';

export async function register({fullName ,username , email, password}){
    const response = await api.post( '/api/v1/auth/register',{
        fullName,
        username,
        email,
        password
    })
    return response.data
 }

export async function login({ email, password}){
    const response = await api.post( '/api/v1/auth/login',{
        email,
        password
    })
    return response.data
}

export async function logout(){
    const response = await api.get('/api/v1/auth/logout')
    return response.data
}

export async function getMe () {
    const response = await api.get('/api/v1/auth/get-me')
    return response.data
}
