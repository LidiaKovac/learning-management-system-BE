
declare namespace Express {
	interface Request {
		user: User
	}
}

interface IUser {
	_id: import("mongoose").Types.ObjectId

	name: string
	lastName: string
	email: string
	password: string
	role: string
	pronouns: string
	birthday: Date
	classes: Array<import("mongoose").Types.ObjectId>

	createdAt: Date
	updatedAd: Date
}

interface IClass {
	_id: import("mongoose").Types.ObjectId
	name: string
	description: string
	author: import("mongoose").Types.ObjectId

	createdAt: Date
	updatedAt: Date
}

interface IEvent {
	_id: import("mongoose").Types.ObjectId
	name: string
	type: string
	description: string
	startDate: Date
	endDate: Date
	graded: boolean
	author: import("mongoose").Types.ObjectId
	classes: Array<import("mongoose").Types.ObjectId>

	createdAt: Date
	updatedAd: Date
}

interface IFile {
	_id: import("mongoose").Types.ObjectId;
	name: string;
	type: string;
	description: string;
	section: import("mongoose").Types.ObjectId;
	author: import("mongoose").Types.ObjectId

	createdAt: Date;
	updatedAd: Date;
}

interface IHomework {
	_id: import("mongoose").Types.ObjectId
	author: import("mongoose").Types.ObjectId
	content: string
	grade: number

	createdAt: Date
	updatedAd: Date
}

interface ISection {
	_id: import("mongoose").Types.ObjectId
	class: import("mongoose").Types.ObjectId
	author: import("mongoose").Types.ObjectId
	name: string
	description: string
	files?: Array<import("mongoose").Types.ObjectId>
	createdAt: Date
	updatedAd: Date
}

interface ITask {
	_id: import("mongoose").Types.ObjectId
	task: string;
	done: boolean;
	author: import("mongoose").Types.ObjectId
	class: import("mongoose").Types.ObjectId
	color: string
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
