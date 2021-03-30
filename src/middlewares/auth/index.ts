import User from "../../utils/models/user"

import { Response, NextFunction } from "express"
import { IncomingHttpHeaders } from "http"
import { RequestWithUser } from "../../utils/interfaces"
import { verifyJWT, generateJWT } from "../../utils/tools/auth"

//how to use: 
//authenticate: generates new token -> NOT A MIDDLEWARE
//authorize: checks if a token is provided and decodes it -> MIDDLEWARE
//admin, student, teacher -> place after authorize -> MIDDLEWARES

export const authenticate = async(user_id:number, birthday:Date) => {
    try {
		if( user_id && birthday)
        {const new_token:String = await generateJWT({user_id, birthday})
        return new_token } else return new Error("Please login again")
    } catch (e) {
        console.log(e)
    }
}

export const authorize = async (
	req: RequestWithUser,
	res: Response,
	next: NextFunction
) => {
    try {
            if (!req.headers.authorization) {
                //if no auth is provided
                res.status(401).send("Please provide a token")
            } else {
			const headers: IncomingHttpHeaders = req.headers
            
			const token:String = await headers.authorization?.replace("Bearer ", "")!
			const decoded = await verifyJWT(token)
			if (decoded.user_id) {
				const user = await User.findAll({
					where: { user_id: decoded.user_id },
				})
	
				if (!user) {
					throw new Error("User not found")
				}
				res.cookie("token", token, {httpOnly: true,
					secure: true, //set to true when deploy, false localhost
					sameSite: "none",}) //add secure: true when deploying
				req.user = {user_id: user[0].user_id, birthday: user[0].birthday, status: "succ"}
				next()
			} else res.status(401).send({message:decoded.status})
        }
		} catch (e) {
			next(e)
			console.log(e)
		}
	}


export const admin = async (
	req: RequestWithUser,
	res: Response,
	next: NextFunction
) => {
	try {
		if (req?.user?.user_id) {
			const logged_user = await User.findAll({where: {user_id: req.user.user_id}})
			if (logged_user[0].role === "admin") {
				next()
			} else {
				res.status(403).send("You are not allowed to access this resource.")
			}
		} else res.status(401).send("You must be logged in")
	} catch (e) {
		next(e)
	}
}

export const student = async (
	req: RequestWithUser,
	res: Response,
	next: NextFunction
) => {
	try {
		if (req?.user?.user_id) {
			const logged_user = await User.findAll({where: {user_id: req.user.user_id}})
			if (logged_user[0].role === "student") {
				next()
			} else {
				res.status(403).send("You are not allowed to access this resource.")
			}
		} else res.status(401).send("You must be logged in")
	} catch (e) {
		next(e)
	}
}

export const teacher = async (
	req: RequestWithUser,
	res: Response,
	next: NextFunction
) => {
	try {
		const logged_user = await User.findAll({where: {user_id: req.user.user_id}})
		if (logged_user[0].role === "teacher") {
            next()
		} else {
			res.status(403).send("You are not allowed to access this resource.")
		}
	} catch (e) {
		next(e)
	}
}

