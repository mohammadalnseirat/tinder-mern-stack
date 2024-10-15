import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

//! 1-Function to signup user:
export const signup_Post = async (req, res, next) => {
  try {
  } catch (error) {
    console.log("Error Creating Sign Up User", error.message);
    next(error);
  }
};

// ! 2-Function to signin user:
export const signin_Post = async (req, res, next) => {
  try {
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
