import User from "../../utils/models/user"

import { Request, Response, NextFunction } from "express"
import { IncomingHttpHeaders } from "http"
import { verifyJWT, generateJWT } from "../../utils/tools/auth"

//how to use: 
//authenticate: generates new token -> NOT A MIDDLEWARE
//authorize: checks if a token is provided and decodes it -> MIDDLEWARE
//admin, student, teacher -> place after authorize -> MIDDLEWARES

export const authenticate = async (user_id: string, birthday: string) => {
	try {
		if (user_id && birthday) {
			const new_token: string = await generateJWT({ user_id, birthday })
			return new_token
		} else return new Error("Please login again")
	} catch (e) {
		console.log(e)
	}
}

export const authorize = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {

		if (!req.headers["authorization"]) {
			//if no auth is provided
			res.status(401).send("Please provide a token")
		} else {
			const decoded = await verifyJWT(req.headers["authorization"]!.replace("Bearer ", ""))
			if (decoded.user_id) {
				const user = await User.findByPk(decoded.user_id)

				if (!user) {
					throw new Error("User not found")
				}
				// res.cookie("token", req.cookies.token, {
				// 	httpOnly: false,
				// 	secure: true, //set to true when deploy, false localhost
				// 	sameSite: "none",}) //add secure: true when deploying
				req.user = { id: user.id, birthday: user.birthday, status: "succ" }
				next()
			} else res.status(401).send({ message: decoded.status })
		}
	} catch (e) {
		next(e)

	}
}


export const admin = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		if (req?.user?.id) {
			const logged_user = await User.findAll({ where: { id: req.user.id } })
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
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		if (req?.user?.id) {
			const logged_user = await User.findAll({ where: { id: req.user.id } })
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
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const logged_user = await User.findAll({ where: { id: req.user.id } })
		if (logged_user[0].role === "teacher" || logged_user[0].role === "admin") {
			next()
		} else {
			res.status(403).send("You are not allowed to access this resource.")
		}
	} catch (e) {
		next(e)
	}
}

