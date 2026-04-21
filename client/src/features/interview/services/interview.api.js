import axios from "axios";

const api = axios.create({
    baseURL :"http://localhost:3000",
    withCredentials: true
})

export const generateInterviewReport = async ({jobDescription,selfDescription,resumeFile}) => {
    const formData  = new FormData()
    formData.append("jobDescription",jobDescription)
    formData.append("selfDescription",selfDescription)
    formData.append("resume",resumeFile)
      
    const response = await api.post("/api/v1/interview",formData, {
        headers : {
            "Content-Type": "multipart/form-data"
        }
       
    })
     return response.data
    
}

export const getInterviewById = async (interviewId) => {

    const response = await  api.get(`/api/v1/interview/report/${interviewId}`)

    return response.data
}

export const getAllInterviewReports = async () => {
    const response = await api.get("/api/v1/interview/")
     return response.data
}

export const generateResumePdf = async ({interviewId}) => {
    const response = await api.get(`/api/v1/interview/resume/Pdf/${interviewId}`,{
        responseType: 'blob'
    })
    return response.data
}