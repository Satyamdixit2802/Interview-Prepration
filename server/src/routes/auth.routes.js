import { Router } from "express";
import { registerUserController , loginUserController, logoutUserController, getMeController } from "../contollers/auth.controller.js";
import {authUser} from '../middlewares/auth.middleware.js'


 const authRoute = Router();

 /**
  * @route GET /api/v1/auth/health
  * @description Health check endpoint
  * @access Public 
  */
 authRoute.get('/health', (req, res) => {
     res.status(200).json({ status: 'OK', message: 'Auth service is running' })
 })

 /**
  * @route POST /api/v1/auth/register
  * @description Register a new user
  * @access Public 
  */

 authRoute.post('/register',registerUserController)
 
 /**
  * @route POST /api/v1/auth/login
  * @description login a  user with email and password
  * @access Public 
  */

 authRoute.post('/login',loginUserController)

 /**
  * @route GET /api/v1/auth/logout
  * @description clear token from user cookie and add the token in blacklist
  * @access Public 
  */
 authRoute.get('/logout',logoutUserController)

 /**
  * @route GET /api/v1/auth/get-me
  * @description get the current logged in user details 
  * @access Private
  */

 authRoute.get('/get-me',authUser,getMeController)

 export default authRoute