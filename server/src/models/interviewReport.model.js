import mongoose from "mongoose";

/**
 * - job description schema
 * resume text:string
 * self description
 * --overall score : Number
 * 
 * -Technical Questions  : [{question: String,intention: "", answer: ""
 * }]
 * -Behavioural Questions : [{question: "",intention: "", answer: ""
 * }]
 * skillgaps : [{skill:"",severity:"",type: String , enum : [low,medium,high]}
 * ]
 * -prepration plan : [{
 * day: Number,
 * focskill: String,
 * task: [String]
 * }]
 * },{}]

*/
const technicalQuestionsSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Technical question is required to generate interview report"]

    },
    intention: {
        type: String,
        required: [true, "Intention behind technical question is required to generate interview report"]
    },
    answer: {
        type: String,
        required: [true, "Answer of technical question is required to generate interview report"]
    },

}
    , { _id: false })

const behaviouralQuestionsSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Behavioural question is required to generate interview report"]

    },
    intention: {
        type: String,
        required: [true, "Intention behind behavioural question is required to generate interview report"]
    },
    answer: {
        type: String,
        required: [true, "Answer of behavioural question is required to generate interview report"]
    },

}
    , { _id: false })

const skillSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, "Skill gap is required to generate interview report"]
    },
    severity: {
        type: String,
        enum: ["low", "medium", "high"],
        required: [true, "Severity of skill gap is required to generate interview report"],
    }
}, { _id: false })

const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number, 
        required: [true, "Day is required to generate preparation plan in interview report"]
    },
    focusSkill: {
        type: String,
        required: [true, "Focused skill is required to generate preparation plan in interview report"]
    },
    task: [{
        type: String,
        required: [true, "Task is required to generate preparation plan in interview report"]
    }]
}, { _id: false })

const InterviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: [true, "Job description is required to generate interview report"]
    },
    resume: {
        type: String
    },
    selfDescription: {
        type: String
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100,
    },
    technicalQuestion : [technicalQuestionsSchema],
    behaviouralQuestion : [behaviouralQuestionsSchema],
    skillGaps : [skillSchema],
    preparationPlan : [preparationPlanSchema]
},{timestamps : true})


export const InterviewReport = mongoose.model("InterviewReport", InterviewReportSchema)