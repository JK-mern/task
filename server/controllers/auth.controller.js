import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import Seller from "../models/Seller.model.js";

export const userSignup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    console.log(username, email, password);
    const hashedPassowrd = bcrypt.hashSync(password, 10);
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassowrd,
    });
    await newUser.save();
    res.status(200).json("Account created Successfully");
  } catch (error) {
    next(error);
  }
};

export const sellerSignup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassowrd = bcrypt.hashSync(password, 10);
    const newSeller = new Seller({
      username: username,
      email: email,
      password: hashedPassowrd,
    });
    await newSeller.save();
    res.status(200).json("Account created Successfully");
  } catch (error) {
    next(error);
  }
};

export const userLogin = async (req,res,next) =>{
  try {
    
  } catch (error) {
    
  }
}

export const sellerLogin = async (req,res,next) =>{
  try {
    
  } catch (error) {
    
  }
}
