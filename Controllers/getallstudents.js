import Student from "../models/Student.js";

async function getallstudents(req, res){
    const data = await Student.find();
    res.status(200).json(data)

} export default getallstudents;