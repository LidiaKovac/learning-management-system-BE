import mongoose from "mongoose"

const fileSchema = new mongoose.Schema<IFile>({


  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["pdf", "markdown", "audio", "video", "image"],
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  section: {
    type: mongoose.Schema.Types.ObjectId, ref: "Section"
  },

  author: {
    type: mongoose.Schema.Types.ObjectId, ref: "User"
  },


}, { timestamps: true, versionKey: false })

export default mongoose.model<IFile>("File", fileSchema) as mongoose.Model<IFile>
