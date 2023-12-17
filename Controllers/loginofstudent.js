import Student from "../models/Student.js";

async function loginofstudent(req, res) {
  try {
    const { studentname, id } = req.body;

    // Check if a student with the given name and ID exists
    const existingStudent = await Student.findOne({ studentname, id });

    if (existingStudent) {
      res.status(200).json({ message: "Login successful.", student: existingStudent });
    } else {
      res.status(401).json({ message: "Invalid credentials." });
    }
  } catch (error) {
    console.error("Error during student login:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

export default loginofstudent;
