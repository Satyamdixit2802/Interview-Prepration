import {createBrowserRouter} from 'react-router'
import LogIn from './features/auth/pages/LogIn'
import Register from './features/auth/pages/Register'



export const router = createBrowserRouter([
    {
        path:'/login',
       element: <LogIn/>
    },
    {
        path:'/register',
        element:<Register/> 
    },
   { path:'/',
    element: <h1>Home</h1>}
])