

import { GoogleGenAI } from "@google/genai";
import zod, { json } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema"
import { de } from "zod/v4/locales";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });



const interviewReportSchema = zod.object({
  matchScore: zod.number().min(0).max(100).describe("Overall match score of candidate with job describe in percentage"),
  technicalQuestions: zod.array(zod.object({
    question: zod.string().describe("The technical question can be asked during the interview"),
    intention: zod.string().describe("The intention of interviewer behind asking this question"),
    answer: zod.string().describe("How to answer this question in order to impress the interviewer , what points to cover in answer and what points to avoid in answer")
  })).describe("Technical questions that can be asked in interview along with intention behind asking that question and how to answer that question in order to impress the interviewer"),
  behaviouralQuestions : zod.array(zod.object({
    question: zod.string().describe("The behavioural question can be asked during the interview"),
    intention: zod.string().describe("The intention of interviewer behind asking this question"),
    answer: zod.string().describe("How to answer this question in order to impress the interviewer , what points to cover in answer and what points to avoid in answer")

  })).describe("Behavioural questions that can be asked in interview along with intention behind asking that question and how to answer that question in order to impress the interviewer"),
skillGaps : zod.array(zod.object({
  skills : zod.string().describe("Skill that candidate is lacking and need to improve in order to crack the interview"),
  severity : zod.enum(["low","medium","high"]).describe("Severity of skill gap is low , medium or high"),
})).describe("Skill gaps that candidate need to improve in order to crack the interview along with severity of skill gap"),
preprationPlan : zod.array(zod.object({
  day : zod.number().describe("Day number of preparation plan"),
  focus : zod.string().describe("Focus skill or topic to prepare on that day"),
  tasks : zod.array(zod.string()).describe("Tasks to be done on that day to prepare for interview")
})).describe("Preparation plan for interview preparation in day wise manner along with focus skill or topic to prepare on that day and tasks to be done on that day to prepare for interview")
})

async function generateInterviewReport({ resume, jobDescription, selfDescription }) {

  const prompt = `Generate an interview report for the candidate based on the following information:
                          Resume: ${resume}
                          Self Description: ${selfDescription}  

                          Job Description: ${jobDescription}`

 const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config : {
      responseMimeType : "application/json",
      responseSchema: zodJsonSchema(interviewReportSchema),
    }
  });
  return json.parse(response.text);

}


 export default generateInterviewReport