
import { RouterProvider } from 'react-router'
import { router } from './app.router'
import { AuthProvider } from './features/auth/Auth.context';

import { InterviewProvider } from './features/interview/Interview.Context';
const App = () => {
  
  
  return (
    <AuthProvider>
      <InterviewProvider>
      <RouterProvider router = {router} /> 
      </InterviewProvider>
    </AuthProvider>
   
  )
}

export default App
