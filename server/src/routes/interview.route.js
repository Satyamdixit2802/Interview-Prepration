    import {Router} from 'express'
    import {authUser} from '../middlewares/auth.middleware.js'
    import { generateInterviewController, generateInterviewReportById, getAllInterviewReportsController,generateResumePdfController } from '../contollers/interview.controller.js'  
    import upload from '../middlewares/file.middleware.js'

    const interviewRouter = Router()

/**
 * @route POST /api/v1/interview/
 * @description Generate interview report for candidate based on resume , self description and job description
 * @access Private  
 */
    interviewRouter.post('/',authUser,upload.single('resume'),generateInterviewController)

/**
 * @route POST /api/v1/interview/report/:interview:id
 * @description get interview report by interviewId
 * @access Private  
 */
interviewRouter.get("/report/:interviewId",authUser,generateInterviewReportById)

/**
 * @route GET /api/v1/interview/
 * @description get all interview reports
 * @access Private  
 */
interviewRouter.get("/",authUser,getAllInterviewReportsController)

/** 
 * @route GET /api/v1/interview/resume/Pdf/:interviewId
 * @description Generate a pdf version of the resume based on the interview report data
 * @access Private
 */
interviewRouter.get("/resume/Pdf/:interviewId",authUser,generateResumePdfController)

export default interviewRouter