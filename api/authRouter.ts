import express, { NextFunction }  from "express";
import bodyParser from "body-parser"
import {db} from "./db";


let authRouter = express.Router()

authRouter.post("/register",async (req, res, next) => {
    
})

authRouter.post("/login" , async (req, res, next) => {
    try{
        const {username, password} = req.body
        if(username && password) {
            // check if the username and password exists in the database
           const user =  await db.from('userlogin').where({
                user_email: username,
                user_password: password
           })
           if(user.length === 0) {
                res.status(401).send("Unauthorized User. Wrong user and/or password.")
           } else {
            res.status(200).send("User is authorized for the content")
           }
            
        } else {
            res.send("Username and password not recieved")
        }
    } catch(err) {
        next(err)
    }
})





export {authRouter}