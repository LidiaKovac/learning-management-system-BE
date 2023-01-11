import mongoose from "mongoose"

const task = new mongoose.Schema<ITask>({

  author: {
    type: mongoose.Schema.Types.ObjectId, ref: "User"
  },
  class: {
    type: mongoose.Schema.Types.ObjectId, ref: "Class"
  },
  color: {
    type: String,
    required: true
  },
  task: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    default: false
  }

}, { timestamps: true, versionKey: false })

export default mongoose.model<ITask>("Task", task) as mongoose.Model<ITask>
