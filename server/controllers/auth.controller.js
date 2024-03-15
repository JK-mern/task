import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import Seller from "../models/Seller.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const userSignup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    let user = await User.findOne ( {email})

    if(user)
    {
      return  next(errorHandler((409), "email already used"))
      
    }

    user = await User.findOne ( {username})
    if(user)
    {
       return next(errorHandler((409), "username already used"))
    
    }
  
    const hashedPassowrd = bcrypt.hashSync(password, 10);
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassowrd,
      seller: false,
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
     let seller = await Seller.findOne ( {email})

    if(seller)
    {
      return  next(errorHandler((409), "email already used"))
      
    }

    seller= await Seller.findOne ( {username})
    if(seller)
    {
       return next(errorHandler((409), "username already used"))
    
    }
    const hashedPassowrd = bcrypt.hashSync(password, 10);
    const newSeller = new Seller({
      username: username,
      email: email,
      password: hashedPassowrd,
      seller: true,
    });
    await newSeller.save();
    res.status(200).json("Account created Successfully");
  } catch (error) {
    next(error);
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not Found"));
      
    }

    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
       return next(errorHandler(404, "Invalid Username or password"));
    
    }
    4;
    validUser.password = undefined;

    const token = jwt.sign({ id: validUser._id }, process.env.JSON_WEB_TOKEN);
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json(validUser);
  } catch (error) {
    next(error);
  }
};

export const sellerLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validSeller = await Seller.findOne({ email });
    if (!validSeller) {
      return next(errorHandler(404, "Seller not Found"));
      
    }
    const validPassword = bcrypt.compareSync(password, validSeller.password);
    if (!validPassword) {
      return next(errorHandler(404, "Invalid username or password"));
      
    }
    validSeller.password = undefined;
    const token = jwt.sign({ id: validSeller._id }, process.env.JSON_WEB_TOKEN);
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json(validSeller);
  } catch (error) {
    next(error);
  }
};



export const signOut = (req,res,next) =>{
  try {
    res.clearCookie('accessToken')
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error)
  }
}
