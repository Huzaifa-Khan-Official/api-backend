// addCourse.js

import Course from "../models/Courses.js";

async function addCourse(req, res) {
  try {
    const { coursename, createdBy, date, teacher } = req.body;

    // Check if a course with the same name already exists
    const existingCourse = await Course.findOne({ coursename });
    if (existingCourse) {
      return res.status(400).json({ message: "Course with the same name already exists." });
    }

    // Create a new course
    const newCourse = new Course({
      coursename,
      createdBy,
      date,
      teacher,
      students: [],  // You can initialize the students array as needed
    });

    // Save the new course to the database
    await newCourse.save();

    res.status(201).json({ message: "Course added successfully.", course: newCourse });
  } catch (error) {
    console.error("Error adding course:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

export default addCourse;
