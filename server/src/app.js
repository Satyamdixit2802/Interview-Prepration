import express from 'express'
import cookieParser from "cookie-parser";
import cors from 'cors'


const app = express()
//middlewares

const defaultAllowedOrigins = [
    'https://resume-shortner-client.onrender.com',
    'http://localhost:5173',
    'http://127.0.0.1:5173'
]

const configuredOrigins = process.env.ALLOWED_ORIGINS || process.env.FRONTEND_URL || process.env.CLIENT_URL
const environmentOrigins = configuredOrigins
    ? configuredOrigins
        .split(',')
        .map((origin) => origin.trim().replace(/\/$/, ''))
        .filter(Boolean)
    : []
const allowedOrigins = [...new Set([...defaultAllowedOrigins, ...environmentOrigins])]

app.use(express.json({limit :"16kb"}))
app.use(express.urlencoded({ extended: true ,limit: "16kb" }));
app.use(cookieParser());
app.use(express.static('public'))
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
}))
//Routes 
import authRoute from './routes/auth.routes.js';
import interviewRoute from './routes/interview.route.js';


app.use('/api/v1/auth',authRoute)
app.use('/api/v1/interview',interviewRoute)




export  {app} ;
