import { Request } from "express"

//ERRORS:

export class ApiError extends Error {
	public response: { status: number; message: string; detail: string }

	constructor(
		error: { status: number; message: string },
		detail: string
	) {
		super()
		this.response = {
			status: error.status,
			message: error.message,
			detail: detail,
		}
	}
}

//AUTH

export type DecodedToken = {
	user_id: number
	birthday: Date
}

export interface RequestWithUser extends Request {

	user: DecodedToken
}

module.exports = ApiError
