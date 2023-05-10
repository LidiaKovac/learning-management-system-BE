interface DecodedToken {
	user_id: number | null
	birthday: Date | null
	status: string
}

interface CustomError {
	message: string
}

declare namespace Express {
	interface Request {
		user: {
			id: string, birthday: string, status: string}
	}
}

interface User {
	id: string
	name: string
	lastName: string
	email: string
	password: string
	role: string
	pronouns: string
	birthday: string
	propic: string

	createdAt: Date
	updatedAd: Date
}

//AUTH

type DecodedToken = {
	user_id: number | null
	birthday: Date | null
	status: string
}



interface ApiResponse {
	status: number
	message?: string 
	data?: any
}


declare module "query-to-sequelize"