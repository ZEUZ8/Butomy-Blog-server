import { generateToken } from "../middleware/auth.js";
import bcrypt from "bcryptjs";
import UserModel from "../models/userModle.js";
import BlogModel from "../models/blogModel.js";
import mongoose from "mongoose";


export const getBlogs = async (req, res, next) => {
  console.log(' in the function')
    try {
      const response = await BlogModel.find();
  
      res.status(202).json({ result: response });
    } catch (error) {
      res.status(500).json({ response: error.message });
    }
};

export const addBlog = async (req, res, next) => {
  console.log('entered in the addblog')
  try {
    // const id = req.body.id;
    console.log(req.body,' the res')
    const { title, content,id } = req.body;
    const userId = await UserModel.findOne({_id:id});
    const blogDoc = await BlogModel.create({
      author: userId._id,
      title: title,
      // summary: summary,
      content: content,
    });
    res.status(201).json({ response: "blog created" ,blogDoc});
  } catch (error) {
    res.status(500).json({ response: error.message });
  }
};


export const getUserBlogs = async (req, res, next) => {
  const {id} = req.params;
    try {
      const response = await BlogModel.find({author:id});
      res.status(202).json({ result: response });
    } catch (error) {
      res.status(500).json({ response: error.message });
    }
};

export const updateSingleBlog = async(req,res,next)=>{
  console.log(' the errror')
  try {
    const { id,  title, content } = req.body;
    let blogId = new mongoose.Types.ObjectId(id);
    // const userId = await UserModel.findOne({ email: req.user.email });
    const updatedBlog = await BlogModel.findOneAndUpdate(
      { _id: blogId },
      {
        $set: {
          title: title,
          content: content,
        },
      },
      { new: true } // This option returns the modified document
    );
    res.status(200).json({ response: "updated" ,updatedBlog});
  } catch (error) {
    res.status(500).json({ response: error.message });
  }
}
  
export const login = async (req, res) => {
  try {
    console.log("entered in the userLogin");
    const { email, password } = req.body;
    let existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ msg: "User not found" });
    }
    let validPassword = await bcrypt.compare(password, existingUser?.password);
    if (existingUser && validPassword) {
      let token = generateToken({
        email: existingUser?.email,
        name: existingUser?.name,
      });
      res
        .status(201)
        .json({
          dispatch: {
            name: existingUser?.name,
            email: existingUser?.email,
            token,
            id: existingUser?._id,
          },
        });
    } else {
      res.status(400).json({ msg: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const signup = async (req, res) => {
  try {
    console.log("entered in the register function");
    const { email, password, username } = req.body;
    console.log(username,' the name')
    let existingUser = await UserModel.findOne({ email });
    console.log(existingUser,' theuse')
    if (existingUser) {
      console.log(' the use found and the redirecting the user')
      return res.status(400).json({ msg: "Email already registered" });
    }
    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(password, salt);

    const user = await UserModel.create({
      email:email,
      name:username,
      password: hashedPass,
    });
    res.status(201).json({ response: "User Registered Successfully" });
  } catch (error) {
    console.log(error.message,' the error')
    res.status(500).json({ msg: error?.message });
  }
};
