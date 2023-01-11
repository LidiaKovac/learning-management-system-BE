import mongoose from "mongoose"

const homeworkSchema = new mongoose.Schema<IHomework>({
	content: {
		type: String,
		required: true
	},
	author: {
		type: mongoose.Schema.Types.ObjectId, ref: "User"
	},
	grade: {
		type: Number,
		max: 10,
		min: 0,
		required: false
	}


}, { timestamps: true, versionKey: false })

export default mongoose.model<IHomework>("Homework", homeworkSchema) as mongoose.Model<IHomework>
