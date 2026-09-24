import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
const AUTH_TOKEN_KEY = 'resume-shortner-token'

export const getAuthToken = () => localStorage.getItem(AUTH_TOKEN_KEY)

export const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem(AUTH_TOKEN_KEY, token)
    }
}

export const clearAuthToken = () => localStorage.removeItem(AUTH_TOKEN_KEY)

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
})

api.interceptors.request.use((config) => {
    const token = getAuthToken()

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

export default api
