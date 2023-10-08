import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import utils from "../utils.js";
export const signInUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User doesnt Exists" });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id }, //data to be included in token
      utils.JWT_SECRET, //secret key
      { expiresIn: "6h" } //options can be seen
    );
    res.status(200).json({ profile: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const signUpUser = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already Exists" });

    const hashedPassword = await bcrypt.hash(password, 12);
    //can create in this way also a new entry to DB
    const result = await User.create({
      email,
      password: hashedPassword,
      name: name,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      utils.JWT_SECRET,
      {
        expiresIn: "6h",
      }
    );
    res.status(201).json({ profile: result, token: token });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Login Failed, Try Again Later" });
  }
};

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InR1c2hhckB4eXouY29tIiwiaWQiOiI2NTIyNjBmMjJmZWFhMzUxOTk0MThiNDEiLCJpYXQiOjE2OTY3NTE5MzEsImV4cCI6MTY5Njc3MzUzMX0.yzjTBX3P-B8uVGHB3WC-Vo8kfnjZq-Ymg_B7LGLajog
