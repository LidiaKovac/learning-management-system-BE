//add admin auth
//add student and teacher auth
const ApiError = require("../../utils/interfaces")
import User from "../../utils/models/user"

import { Request, Response, NextFunction } from "express"
import { IncomingHttpHeaders } from "http"
import { DecodedToken, RequestWithUser } from "../../utils/interfaces"
import { verifyJWT, generateJWT } from "../../utils/tools/auth"

//how to use: 
//authenticate: generates new token -> NOT A MIDDLEWARE
//authorize: checks if a token is provided and decodes it -> MIDDLEWARE
//admin, student, teacher -> place after authorize -> MIDDLEWARES

export const authenticate = async(user_id:number, birthday:Date) => {
    try {
        const new_token:String = await generateJWT({user_id, birthday})
        return new_token
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
			const decoded:DecodedToken = await verifyJWT(token)
			const user = await User.findAll({
				where: { user_id: decoded.user_id },
			})

			if (!user) {
				throw new Error("User not found")
			}
			res.cookie("token", token) //add secure: true when deploying
			req.user = {user_id: user[0].user_id, birthday: user[0].birthday}
			next()
        }
		} catch (e) {
			next(e)
		}
	}


export const admin = async (
	req: RequestWithUser,
	res: Response,
	next: NextFunction
) => {
	try {
        const logged_user = await User.findAll({where: {user_id: req.user.user_id}})
		if (logged_user[0].role === "admin") {
			next()
		} else {
			res.status(403).send("You are not allowed to access this resource.")
		}
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
		const logged_user = await User.findAll({where: {user_id: req.user.user_id}})
		if (logged_user[0].role === "student") {
            next()
		} else {
			res.status(403).send("You are not allowed to access this resource.")
		}
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

