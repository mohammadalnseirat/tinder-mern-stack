import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const protectRoute = async (req, res, next) => {
  try {
    // *get the token from cookies:
    const token = req.cookies.jwt;
    if (!token) {
      return next(errorHandler(401, "Unauthorized- No Token Provided"));
    }
    // *verify token:
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return next(errorHandler(401, "Unauthorized- Invalid Token"));
    }
    // *check if user exists:
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(errorHandler(404, "Unauthorized- User Not Found"));
    }
    // !set user in req object:
    req.user = currentUser;
    next();
  } catch (error) {
    console.log("Error Protecting Route", error.message);
    if (error instanceof jwt.JsonWebTokenError) {
      return next(errorHandler(401, "Unauthorized- Invalid Token"));
    } else {
      next(error);
    }
  }
};
