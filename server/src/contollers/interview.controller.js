import { PDFParse } from 'pdf-parse';
import generateInterviewReport from '../services/ai.service.js'
import { InterviewReport } from '../models/interviewReport.model.js'

 async function generateInterviewController(req, res) {
    if (!req.file) {
        return res.status(400).json({
            message: "Resume PDF is required."
        })
    }

    const resumeContent = await (new PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const { selfDescription, jobDescription } = req.body

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
     const interviewFile = InterviewReport.findOne({_id: interviewId , user : req.user.id})
     
if(!interviewFile){
   return  res.status(404).json({
        message : " Interview Report not found"
    })

    res.status(200).json({
        message: "Interview Report fetched Succesfully",
        interviewFile
    })
}
}


async function getAllInterviewReportsController(req,res){
    const interviewReports = await interviewReportModel.find({user : req.user.id}).sort({createdAt:-1}).select("-resume -selfDescription -jobDescription -__v -technical -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "Interview Report fetched sucessfully",
        interviewReports
    })
}
 export {generateInterviewController,generateInterviewReportById,getAllInterviewReportsController}
