import { PDFParse } from 'pdf-parse';
import {generateInterviewReport , generateResumePdf} from '../services/ai.service.js'
import { InterviewReport } from '../models/interviewReport.model.js'

 async function generateInterviewController(req, res) {
    const { selfDescription, jobDescription } = req.body

    if (!jobDescription?.trim()) {
        return res.status(400).json({
            message: "Job description is required."
        })
    }

    if (!req.file && !selfDescription?.trim()) {
        return res.status(400).json({
            message: "Upload a resume or provide a self-description."
        })
    }

    const resumeContent = req.file
        ? await (new PDFParse(Uint8Array.from(req.file.buffer))).getText()
        : { text: "" }

    const interviewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    })

    const interviewReport = await InterviewReport.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAi
    })

    res.status(201).json({
        message: "Interview report generated successfully.",
        interviewReport
    })

}

async function generateInterviewReportById(req,res) {
    const {interviewId} = req.params
     const interviewFile = await InterviewReport.findOne({_id: interviewId , user : req.user.id})
      
if(!interviewFile){
   return  res.status(404).json({
        message : " Interview Report not found"
    })
}

    res.status(200).json({
        message: "Interview Report fetched Succesfully",
        interviewReport: interviewFile
    })
}


async function getAllInterviewReportsController(req,res){
    const interviewReports = await InterviewReport.find({user : req.user.id}).sort({createdAt:-1}).select("-resume -selfDescription -jobDescription -__v")

    res.status(200).json({
        message: "Interview Report fetched sucessfully",
        interviewReports
    })
}

/**
 * @description : This file contains the controller functions for handling interview report related operations. It includes functions to generate an interview report based on user input, fetch a specific interview report by its ID, and retrieve all interview reports associated with the authenticated user. The controllers interact with the InterviewReport model to perform database operations and utilize the AI service to generate content based on the provided resume, self-description, and job description.
 * 
 */
async function generateResumePdfController(req,res){

    const {interviewId} = req.params
    const interviewReport = await InterviewReport.findOne({_id: interviewId, user: req.user.id})
    if(!interviewReport){
        return res.status(404).json({
            message : "Interview Report not found"
        })
    }
    const {resume,selfDescription,jobDescription} = interviewReport
    const pdfBuffer = await generateResumePdf({resume,selfDescription,jobDescription})
    
    res.set({
        "content-type" : "application/pdf",
        "content-disposition" : `attachment; filename=resume_${interviewId}.pdf`
    })
    res.send(pdfBuffer)
}

 export {generateInterviewController,generateInterviewReportById,getAllInterviewReportsController,generateResumePdfController}
