import { generateToken } from "../middleware/auth";
import bcrypt from "bcrypt";
import UserModel from "../models/blogModel.js";

export const login = async (req, res, ) => {
  try {
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
      res.status(201).json({dispatch:{name:existingUser?.name,email:existingUser?.email,token,id:existingUser?._id}})
    }else{
        res.status(400).json({msg:"Invalid Credentials"})
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const signup = async(req,res,)=>{
    try{
        const {email,password,name}  = req.body
        let existingUser = await UserModel.findOne({email})
        if(existingUser){
            res.status(400).json({msg:"Email already registered"})

            const salt = await bcrypt.genSalt()
            const hashedPass = await bcrypt.hash(password,salt)
        }

        const user = await UserModel.create({
            email,
            name,
            password:hashedPass,
        })
        res.status(201).json({ response: "User Registered Successfully" });
    }catch(error){
        res.status(500).json({msg:error?.message})
    } 
}