
import { RouterProvider } from 'react-router'
import { router } from './app.router'
import { AuthProvider } from './features/auth/Auth.context';


const App = () => {
  
  
  return (
    <AuthProvider>
      <RouterProvider router = {router} /> 
    </AuthProvider>
   
  )
}

export default App
