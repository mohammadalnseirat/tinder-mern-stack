import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// ?Function to create Token:
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
};
//! 1-Function to signup user:
export const signup_Post = async (req, res, next) => {
  const { name, email, password, age, gender, genderPreference } = req.body;
  try {
    if (!name || !email || !password || !age || !gender || !genderPreference) {
      return next(errorHandler(400, "Please provide all fields"));
    }
    // !Find The User:
    const user = await User.findOne({ email });
    if (user) {
      return next(errorHandler(400, "User already exists"));
    }
    // !Check The Age:
    if (age < 18) {
      return next(errorHandler(400, "Age must be greater than 18"));
    }
    // !Check The Password:
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    if (!passwordRegex.test(password)) {
      return next(
        errorHandler(
          400,
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        )
      );
    }
    //! Create New User:
    const newUser = new User({
      name,
      email,
      password,
      age,
      gender,
      genderPreference,
    });
    if (newUser) {
      // !Create Token:
      const token = createToken(newUser._id);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });
      await newUser.save();
      const { password: pass, ...rest } = newUser._doc;
      res.status(200).json(rest);
    } else {
      return next(errorHandler(400, "User Already Exists"));
    }
  } catch (error) {
    console.log("Error Creating Sign Up User", error.message);
    next(error);
  }
};

// ! 2-Function to signin user:
export const signin_Post = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password || email === "" || password === "") {
      return next(errorHandler(400, "Please provide all fields"));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(errorHandler(404, "User Not Found"));
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return next(errorHandler(400, "Invalid Credentials"));
    }
    // !Create Token:
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    const { password: pass, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    console.log("Error Creating Sign In User", error.message);
    next(error);
  }
};

// ! 3-Function to logout user:
export const logout_Post = async (req, res, next) => {
  try {
  } catch (error) {
    console.log("Error Logging Out User", error.message);
    next(error);
  }
};
