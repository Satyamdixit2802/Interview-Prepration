import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const interviewReportSchema = z.object({
    title: z.string().min(1).describe("The job title for which the interview report is generated."),
    matchScore: z.number().min(0).max(100).describe("A score between 0 and 100 indicating how well the candidate matches the job."),
    technicalQuestions: z.array(z.object({
        question: z.string().min(1).describe("A technical interview question."),
        intention: z.string().min(1).describe("Why the interviewer would ask this question."),
        answer: z.string().min(1).describe("How the candidate should answer this question.")
    })).min(1).describe("Technical interview questions with intent and answer guidance."),
    behavioralQuestions: z.array(z.object({
        question: z.string().min(1).describe("A behavioral interview question."),
        intention: z.string().min(1).describe("Why the interviewer would ask this question."),
        answer: z.string().min(1).describe("How the candidate should answer this question.")
    })).min(1).describe("Behavioral interview questions with intent and answer guidance."),
    skillGaps: z.array(z.object({
        skill: z.string().min(1).describe("A missing or weak skill for the target role."),
        severity: z.enum(["low", "medium", "high"]).describe("How much this gap may affect the candidate.")
    })).min(1).describe("Skill gaps in the candidate profile."),
    preparationPlan: z.array(z.object({
        day: z.number().int().min(1).describe("The day number in the preparation plan, starting from 1."),
        focus: z.string().min(1).describe("The main focus of the day."),
        tasks: z.array(z.string().min(1)).min(1).describe("Specific preparation tasks for the day.")
    })).min(1).describe("A day-wise preparation plan.")
}).strict();

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is missing from the server environment.");
    }

    const prompt = `
You generate interview preparation data from the candidate profile and job description.

Use these inputs:
- Resume text
- Self description
- Job description

Return only valid JSON with exactly these fields:
{
  "title": string,
  "matchScore": number,
  "technicalQuestions": [
    {
      "question": string,
      "intention": string,
      "answer": string
    }
  ],
  "behavioralQuestions": [
    {
      "question": string,
      "intention": string,
      "answer": string
    }
  ],
  "skillGaps": [
    {
      "skill": string,
      "severity": "low" | "medium" | "high"
    }
  ],
  "preparationPlan": [
    {
      "day": number,
      "focus": string,
      "tasks": string[]
    }
  ]
}

Rules:
- Do not include markdown, code fences, or commentary.
- Do not include null values.
- Do not include extra fields.
- Do not return empty arrays.
- Base the match score and questions on the provided candidate context and job description.

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;

    const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseJsonSchema: z.toJSONSchema(interviewReportSchema),
            temperature: 0.2
        }
    });

    const rawText = response.text?.trim();

    if (!rawText) {
        throw new Error("Gemini returned an empty response.");
    }

    return interviewReportSchema.parse(JSON.parse(rawText));
}

export default generateInterviewReport;
