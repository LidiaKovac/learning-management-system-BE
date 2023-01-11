import mongoose from "mongoose"

const classSchema = new mongoose.Schema<IClass>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    },
	sections: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Section"

	}]

}, { timestamps: true, versionKey: false})

export default mongoose.model<IClass>("Class", classSchema) as mongoose.Model<IClass>