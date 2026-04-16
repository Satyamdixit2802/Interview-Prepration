import express from 'express'
import cookieParser from "cookie-parser";
import cors from 'cors'


const app = express()
//middlewares

app.use(express.json({limit :"16kb"}))
app.use(express.urlencoded({ extended: true ,limit: "16kb" }));
app.use(cookieParser());
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}
    
))

//Routes 
import authRoute from './routes/auth.routes.js';
app.use('/api/v1/auth',authRoute)




export  {app} ;