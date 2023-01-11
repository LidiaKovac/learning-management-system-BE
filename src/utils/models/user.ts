import mongoose from "mongoose"

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true
    },
	lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
	password: {
        type: String,
        required: true
    },
	role: {
        type: String,
		enum: ["admin", "teacher", "student"],
        required: true,
		default: "student"
    },
	pronouns: {
		type: String, 
		enum: ["she", "he", "them"],
		required: true
	},
	birthday: {
		type: Date,
		required: false
	},
	classes: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Class"
	}]

}, { timestamps: true, versionKey: false})

export default mongoose.model<IUser>("User", userSchema) as mongoose.Model<IUser>
