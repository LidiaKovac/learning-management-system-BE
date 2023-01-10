
declare namespace Express {
	interface Request {
		user: User
	}
}

//ERRORS:


//AUTH

interface DecodedToken {
	user_id: number | null
	birthday: Date | null
	status: string
}



interface CustomError {
	message: String
}
