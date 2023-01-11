import mongoose from "mongoose"

const eventSchema = new mongoose.Schema<IEvent>({

	name: {
		type: String,
		required: true
	},
	type: {
		type: String,
		enum: ["homework", "exam"],
		required: true
	},
	graded: {
		type: Boolean,
		required: true,
	},
	description: {
		type: String,
		required: true
	},
	startDate: {
		type: Date,
		required: true
	},
	endDate: {
		type: Date,
		required: true
	},
	author: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    },
	classes: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Class"
	}]

}, { timestamps: true, versionKey: false })

export default mongoose.model<IEvent>("Event", eventSchema) as mongoose.Model<IEvent>