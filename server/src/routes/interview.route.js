    import {Router} from 'express'
    import {authUser} from '../middlewares/auth.middleware.js'
    import { generateInterviewController } from '../contollers/interview.controller.js'  
    import upload from '../middlewares/file.middleware.js'

    const interviewRouter = Router()

/**
 * @route POST /api/v1/interview/generate
 * @description Generate interview report for candidate based on resume , self description and job description
 * @access Private  
 */
    interviewRouter.post('/',authUser,upload.single('resume'),generateInterviewController)
   
       export default interviewRouter