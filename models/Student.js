import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  studentname: {
    type: String,
    require: true,
  },
  pic: {
    type: String,
    require: true
  },
  course: {
    type: String,
    require: true,
  },
  id: {
    type: String,
    require: true,
  },
  attendance: [{
    date: {
      type: String,
    },
  }],
}, { timestamps: true });

export default mongoose.model("student", studentSchema);
