import {User}  from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { TokenBlackList } from '../models/blacklist.model.js';



 /**
  * @name  POST registerUserController
  * @description Register a new user
  * @access Public 
  */

async function registerUserController(req,res){

    const {fullName ,username, email , password} = req.body;
    if(!fullName ||!username || !password || !email ){
        return res.status(400).json({
            message : "Please provide username , email and password"
        })
    }
       const isUserAlreadyExisted = await User.findOne({
        $or : [{ username},{email}]
       })
       if(isUserAlreadyExisted){
        return res.status(400).json({
            message : "User already existed with this email address or username"
        })
       }
       const hash = await bcrypt.hash(password,10);

       const user = await User.create(
        { fullName,
            username,
            email,
            password: hash
        }
       )
       const token = jwt.sign(
        {
            id: user._id , username: username
        },
        process.env.JWT_SECRET,
        {expiresIn : "1d"}
       )
         
       res.cookie("token", token, {
           httpOnly: true,
           secure: process.env.NODE_ENV === "production",
           sameSite: "strict",
           maxAge: 24 * 60 * 60 * 1000
       })

       res.status(201).json({
        message :"User registered successful ",
        user : {
            id: user._id,
            username:  user.username,
            email: user.email
        }
       }
    )
}

/**
  * @name POST loginrUserController
  * @description login a  user expects email and password in req body
  * @access Public 
  */
async function loginUserController(req, res){
        const {  email , password} = req.body

        const user = await User.findOne({email})
      
        if(!user){
            return res.status(400).json({
                message : "Invalid email or Password"
            })
        }
        
        const isPasswordValid = await bcrypt.compare(password,user.password)

        if(!isPasswordValid){
            return res.status(400).json({
                message: "Invalid username or Password"
            })
        }
        const token = jwt.sign(
        {
            id: user._id , username: user.username
        },
        process.env.JWT_SECRET,
        {expiresIn : "1d"}
       )
         
       res.cookie("token", token, {
           httpOnly: true,
           secure: process.env.NODE_ENV === "production",
           sameSite: "strict",
           maxAge: 24 * 60 * 60 * 1000
       })

       res.status(200).json({
        message :" user loggedIn successful",
        user : {
            id: user._id,
            username: user.username,
            email: user.email
        }
       })


}

/**
  * @name GET logoutrUserController
  * @description clear token from user cookie and  adding  token into black list
  * @access Public 
  */
   async function logoutUserController (req,res){
    const token  = req.cookies.token

    if(token){
        await TokenBlackList.create({token})
    }
    res.clearCookie("token")

    res.status(200).json({
        message: "  User logout successfuly"
    })

}

/**
  * @name GET getMeController
  * @description get the current logged in user details expects token in cookie
  * @access private
  */

async function getMeController(req,res){
    try {
        const user = await User.findById(req.user.id)
        
        if(!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        res.status(200).json({
            message: "User details fetched successfuly",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch(error) {
        res.status(500).json({
            message: "Error fetching user details",
            error: error.message
        })
    }
}



export {registerUserController , loginUserController ,logoutUserController ,getMeController}