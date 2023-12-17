import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from "cors";

import signup from './Controllers/signup.js';
import login from './Controllers/login.js';
import addStudent from './Controllers/addStudent.js';
import loginofstudent from './Controllers/loginofstudent.js';
import studentattendance from './Controllers/studentattendance.js';
import addCourse from './Controllers/addCourse.js';
import searchStudent from './Controllers/searchStudent.js';
import getallcourse from './Controllers/getallcourse.js';
import getallstudents from './Controllers/getallstudents.js';
import getattendance from './Controllers/getattendance.js';
// import verfiyToken from './Controllers/verfiyToken.js';
// import addPatientData from './Controllers/addPatientData.js';
// import verifyLogin from './Controllers/verifyLogin.js';
// import getAllPatientData from './Controllers/getAllPatientData.js';
// import searchPatient from './Controllers/searchPatient.js';
// import searchSinglePatient from './Controllers/searchSinglePatient.js';


const app = express();
const port = 8000;

app.use(express.json());
app.use(cors())
dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Sucesfully connected to db');
    app.post('/sign-up-admin', signup);
    app.post('/login-admin', login);
    app.post('/add-student', addStudent);
    app.post('/add-course', addCourse);
    app.post('/login-student', loginofstudent);
    app.post('/attendance-student', studentattendance);
    app.post('/seachStudent', searchStudent);
    app.post('/getattendance', getattendance);
    app.get('/getallcourse', getallcourse);
    app.get('/getallstudents', getallstudents);
}).catch(error => {
    console.error("Error connecting to DB:", error);
});


app.listen(port, () => {
    console.log(`App is running on port number http://localhost:${port}/`);
})