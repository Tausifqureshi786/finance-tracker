import jwt, { JwtPayload, VerifyCallback } from 'jsonwebtoken'
import {Request, Response, NextFunction} from 'express'
const jwtSecret = 'b463e35929fdf1e770e87a5b6470467604da7927fc3bc07bf6cc453e28408a5bfbd652'

const userAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt 
    if(token) {
        jwt.verify(token, jwtSecret, (err: any, decodedToken: JwtPayload|any) => {
            if(err) {
                return res.status(401). json({ message: "Not authorized"})
            } else {
                next()
            }
        })
    } else {
        return res
          .status(401)
          .json({ message: "Not authorized, token not available" })
      }

    
}

export default userAuth