import Student from "../models/Student.js";

async function searchStudent(req, res) {
  try {
    const { studentName } = req.body;

    // Use a regular expression for case-insensitive search
    const regex = new RegExp(studentName, "i");

    // Find students whose names match the search criteria
    const students = await Student.find({ studentname: regex });

    // Respond with the search results
    res.status(200).json({ message: "Search successful", results: students });
  } catch (error) {
    console.error("Error searching student:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

export default searchStudent;
