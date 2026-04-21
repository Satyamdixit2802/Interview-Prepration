import express from 'express'
import cookieParser from "cookie-parser";
import cors from 'cors'


const app = express()
//middlewares

// Get allowed origins from environment
const allowedOrigins = process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',') 
    : ["http://localhost:5173"]

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