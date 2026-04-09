
import { RouterProvider } from 'react-router'
import { router } from './app.router'


const App = () => {
  console.log("hello");
  
  return (
   <RouterProvider router = {router} /> 
  )
}

export default App
