import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import Seller from "../models/Seller.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const userSignup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    console.log(username, email, password);
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
      next(errorHandler(404, "User not Found"));
      return;
    }

    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      next(errorHandler(404, "Invalid Username or password"));
      return;
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
      next(errorHandler(404, "Seller not Found"));
      return;
    }
    const validPassword = bcrypt.compareSync(password, validSeller.password);
    if (!validPassword) {
      next(errorHandler(404, "Invalid username or password"));
      return;
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
