import { generateInterviewReport, getAllInterviewReports, getInterviewById,generateResumePdf } from '../services/interview.api'
import { useContext } from 'react'
import { InterviewContext } from '../Interview.Context'
import { useCallback, } from "react";

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
            setReport(response.interviewReport)
            return response.interviewReport
        } finally{
            setLoading(false)
        }
    }

    const generateReportById = async (interviewId) => {
        setLoading(true)
        try {
            const response = await getInterviewById(interviewId)
            const nextReport = response.interviewReport ?? response.interviewFile
            setReport(nextReport)
            return nextReport
        } finally {
            setLoading(false)
        }
    }

   
const getReports = useCallback(async () => {
  const response = await getAllInterviewReports();
  setReports(response.interviewReports || []);
  return response.interviewReports || [];
}, [setReports]);

    const getResumePdf = async ({interviewId}) => {
        const response = await generateResumePdf({interviewId})
        const url = window.URL.createObjectURL(new Blob([response], { type: 'application/pdf' }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `resume_${interviewId}.pdf`);
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
        link.remove();
        return response
    }
    return {loading,report,reports,generateReport,generateReportById,getReports,getResumePdf}
}
