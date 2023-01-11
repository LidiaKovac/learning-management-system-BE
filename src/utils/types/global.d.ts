declare namespace Express {
	interface Request {
		user: User
	}
}

interface DecodedToken {
	user_id: number | null
	birthday: Date | null
	status: string
}

interface CustomError {
	message: string
}