import mongoose from "mongoose"

const sectionSchema = new mongoose.Schema<ISection>({
	
	author: {
		type: mongoose.Schema.Types.ObjectId, ref: "User"
	},
	class: {
		type: mongoose.Schema.Types.ObjectId, ref: "Class"
	},
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	files: [{
		type: mongoose.Schema.Types.ObjectId, ref: "Files"
	}]

}, { timestamps: true, versionKey: false })

export default mongoose.model<ISection>("Section", sectionSchema) as mongoose.Model<ISection>
