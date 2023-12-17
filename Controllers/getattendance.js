import Student from "../models/Student.js";

async function getattendance(req, res) {
  try {
    const { studentName } = req.body;

    // Find students whose names partially match the provided name (case-insensitive)
    const students = await Student.find({ studentname: { $regex: new RegExp(studentName, "i") } });

    if (students.length === 0) {
      return res.status(404).json({ message: "No matching students found." });
    }

    // Return the attendance data for the matched students
    const attendanceData = students.map((student) => ({
      studentName: student.studentname,
      attendance: student.attendance,
    }));

    return res.status(200).json({ students: attendanceData });
  } catch (error) {
    console.error("Error getting attendance:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

export default getattendance;
