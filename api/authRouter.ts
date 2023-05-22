import express from "express";
import {db} from "./db";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

let authRouter = express.Router()
const jwtSecret = 'b463e35929fdf1e770e87a5b6470467604da7927fc3bc07bf6cc453e28408a5bfbd652'



authRouter.post("/register",async (req, res, next) => {
    try {
        const {username, password} = req.body
        // console.log(password)
        const hash = await bcrypt.hashSync(password, 10)
        
        const user =  await db.from('userlogin').insert({user_email: username, user_password: hash,user_session_id: '' })
        const insertedUser = await db.from('userlogin').where('user_id',user[0]).select('*')
        const maxAge = 3 * 60 * 60;
        const token = jwt.sign(
            {
                id: insertedUser[0].user_id, 
                username: insertedUser[0].user_email
            }, 
            jwtSecret,
            { expiresIn: maxAge }
        )
        res.cookie( 'jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000

        })
        req.session.user = {username: username, hash: hash}
        console.log(user)
        res.status(201).json({
            message: "User successfully created",
            user: insertedUser[0].user_id
        })
    } catch (error) {
        if(error) {
            console.log(error)
            res.status(400).json({
                message: "User not created successfully "
            })
        } else {
            next(error)
        }
    }
})

authRouter.post("/login" , async (req, res, next) => {
    try{
        const {username, password} = req.body
        if(username && password) {
            // check if the username and password exists in the database
           const user =  await db.from('userlogin').where({
                user_email: username,
           })
           if(user.length === 0) {
            console.log('No such user found:', username)
            res.status(401).send("Unauthorized User. Wrong user and/or password.")
           } else {
            req.session.user = user[0]

            const validPass = await bcrypt.compare(password, user[0].user_password).then(function(result) {
                if(result){
                    const maxAge = 3 * 60 * 60;
                    const token = jwt.sign({
                        id: user[0].user_id, 
                        username: user[0].user_email
                    }, 
                    jwtSecret,
                    { expiresIn: maxAge })

                    res.cookie( 'jwt', token, {
                        httpOnly: true,
                        maxAge: maxAge * 1000
                    })
                    res.status(201).json({
                        message: "User successfully logged in",
                        user: user[0].user_id
                    })
                } else {
                    res.status(400).json({
                        message: "Login not successful"
                    })
                }
            })

       
           }
           
        } 
        else {
            res.send("Username and password not recieved")
        }
    } catch(err) {
        next(err)
    }
})





export {authRouter}