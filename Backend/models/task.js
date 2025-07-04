import mongoose, { Schema } from "mongoose";

const taskSchema = new mongoose.Schema({

})

const taskModel = mongoose.models.task|| mongoose.model("task", taskSchema)

export default taskModel;