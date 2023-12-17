import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    coursename: {
        type: String,
        require: true,
        unique: true,
    },
    cratedby: {
        type: String,
        require: true,
    },
    date: {
        type: Array,
        require: true,
    },
    students: {
        type: Array,
    },
    teacher: {
        type: String,
        require: true
    }
},
    { timestamps: true }
)

export default mongoose.model("course", courseSchema)