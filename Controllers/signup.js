import bcrypt from "bcrypt";
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

import User from "../models/User.js";

async function signup(req, res) {
  try {
    const filterUser = await User.findOne({ email: req.body.email });

    if (filterUser) {
      // If the email already exists, send a response here and return from the function
      return res.status(401).send(`Ye Email pehle se hi le li gai hai ${filterUser}`);
    }

    // Generate a new password hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user object
    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
    })

  
    const user = await newUser.save();
    res.status(200).json(user);

  } catch (error) {
    console.error('Error:', error);
    res.status(500).send(error.message);
  }
}

export default signup;
