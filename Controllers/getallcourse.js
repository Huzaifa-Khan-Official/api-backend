import Courses from "../models/Courses.js";

async function getallcourse(req, res){
    const data = await Courses.find();
    res.status(200).json(data)

} export default getallcourse;