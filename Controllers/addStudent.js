import Student from "../models/Student.js";

async function addStudent(req, res) {
  try {
    const { studentname, pic, course } = req.body;

    // Find the count of existing students
    const serialNumber = await Student.countDocuments() + 1;

    // Create a new student ID with the format "S-serialNumber"
    const id = `${course} - ${serialNumber}`;

    // Create a new student
    const newStudent = new Student({
      studentname,
      pic,
      course,
      id,
    });

    // Save the new student to the database
    await newStudent.save();

    res.status(201).json({ message: "Student added successfully.", student: newStudent });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

export default addStudent;
