    import {Router} from 'express'
    import {authUser} from '../middlewares/auth.middleware.js'
    import { generateInterviewController, generateInterviewReportById, getAllInterviewReportsController } from '../contollers/interview.controller.js'  
    import upload from '../middlewares/file.middleware.js'

    const interviewRouter = Router()

/**
 * @route POST /api/v1/interview/
 * @description Generate interview report for candidate based on resume , self description and job description
 * @access Private  
 */
    interviewRouter.post('/',authUser,upload.single('resume'),generateInterviewController)
   
       export default interviewRouter



/**
 * @route POST /api/v1/interview/report/:interview:id
 * @description get interview report by interviewId
 * @access Private  
 */

interviewRouter.get("/report/:interviewId",authUser,generateInterviewReportById)



/**
 * @route POST /api/v1/interview/report/
 * @description get interview report by interviewId
 * @access Private  
 */

interviewRouter.get("/",authUser,getAllInterviewReportsController)