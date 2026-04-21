import { generateInterviewReport, getAllInterviewReports, getInterviewById,generateResumePdf } from '../services/interview.api'
import { useContext } from 'react'
import { InterviewContext } from '../Interview.Context'

export const useInterview = () =>{

    const context = useContext(InterviewContext)
        
    if(!context){
        throw new Error("useInterview must be within a Interview Provider")
    }

    const {loading, setLoading, report, setReport, reports, setReports} = context

    const generateReport = async ({jobDescription, selfDescription, resumeFile}) => {
        setLoading(true)
        try {
            const response = await generateInterviewReport({jobDescription, selfDescription, resumeFile})
            console.log("Generate Report Response:", response)
            setReport(response.interviewReport)
            return response.interviewReport
        } catch(error){
            console.error("Generate Report Error:", error);
            throw error
        } finally{
            setLoading(false)
        }
    }

    const generateReportById = async (interviewId) => {
        setLoading(true)
        try {
            const response = await getInterviewById(interviewId)
            console.log("Get Report By ID Response:", response)
            const nextReport = response.interviewReport ?? response.interviewFile
            setReport(nextReport)
            return nextReport
        } catch(error){
            console.error("Get Report Error:", error);
            throw error
        } finally {
            setLoading(false)
        }
    }

    const getReports = async () =>{
        try {
            const response = await getAllInterviewReports()
            console.log("Get All Reports Response:", response)
            setReports(response.interviewReports || [])
            return response.interviewReports || []
        } catch (error) {
            console.error("Get Reports Error:", error);
            throw error
        }
    }

    const getResumePdf = async ({interviewId}) => {
        try {
            const response = await generateResumePdf({interviewId})
            console.log("PDF Download Response:", response)
            const url = window.URL.createObjectURL(new Blob([response], { type: 'application/pdf' }));
            const link = document.createElement('a');   
            link.href = url;    
            link.setAttribute('download', `resume_${interviewId}.pdf`);
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url);
            link.remove();
            return response
        } catch (error) {
            console.error("PDF Download Error:", error);
            throw error
        }
    }
    return {loading,report,reports,generateReport,generateReportById,getReports,getResumePdf}
}
