import Course from "../models/Courses.js";
import Student from "../models/Student.js";
import moment from "moment";

async function studentattendance(req, res) {
  try {
    const { date, studentId, courseName } = req.body;

    // Check if the date is in the correct format "MM/DD/YYYY"
    const isValidDate = moment(date, "MM/DD/YYYY", true).isValid();
    if (!isValidDate) {
      return res.status(400).json({ message: "Invalid date format." });
    }

    // Find the current day (e.g., "Sunday", "Monday", etc.)
    const currentDay = moment(date, "MM/DD/YYYY").format("dddd");

    // Find the course with the given name
    const course = await Course.findOne({ coursename: courseName });
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    // Check if the course has classes on the current day
    if (course.date.includes(currentDay)) {
      // Find the student by ID
      const student = await Student.findOne({ id: studentId });
      if (!student) {
        return res.status(404).json({ message: "Student not found." });
      }

      // Check if the student already has attendance for today
      const isAttendanceRecorded = student.attendance.some((a) => a.date === date);
      if (!isAttendanceRecorded) {
        // Update the attendance property in the Student model
        student.attendance.push({ date });
        await student.save();

        return res.status(200).json({ message: "Attendance marked successfully." });
      } else {
        return res.status(400).json({ message: "Attendance already marked for today." });
      }
    } else {
      return res.status(400).json({ message: "No classes scheduled for today." });
    }
  } catch (error) {
    console.error("Error checking attendance:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

export default studentattendance;
