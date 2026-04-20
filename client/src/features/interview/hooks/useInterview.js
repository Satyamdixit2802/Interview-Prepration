import { generateInterviewReport,getAllInterviewReports,getInterviewById} from '../services/interview.api'
import { useContext } from 'react'
import { InterviewContext } from '../Interview.Context'

export const useInterview = () =>{

    const context = useContext(InterviewContext)
        
    if(!context){
        throw new Error("useInterview must be within a Interview Provider")
    }

    const {loading,setLoading,report,setReport,reports,setReports} = context

    const generateReport = async ({jobDescription,selfDescription,resumeFile}) => {
        setLoading(true)
         try {
            const response = await generateInterviewReport({jobDescription,selfDescription,resumeFile})
            setReport(response.interviewReport)
         }catch(error){
            console.log(error);
            
         }finally{
            setLoading(false)
         }
    }

    const generateReportById = async (interviewId) => {
        setLoading(true)
        try {
            const response = await generateReportById(interviewId)
            setReport(response.interviewFile)

        }catch(error){
            console.log(error);
            
        }finally {
            setLoading(false)
        }
    }

    const getReports = async () =>{
        setLoading(true)
        try {
            const response = getAllInterviewReports()
            setReports(response.interviewReports)
            
        } catch (error) {
            console.log(error);
            
        }finally {
            setLoading(false)
        }
    }
    return {loading,report,reports,generateReport,generateReportById,getReports}
}