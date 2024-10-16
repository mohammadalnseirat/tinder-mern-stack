import cloudinary from "../lib/cloudinary.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const updateUserProfile = async (req, res, next) => {
  try {
    const { image, ...otherData } = req.body;
    let updatedData = otherData;
    if (image) {
      if (image.startsWith("data:image")) {
        try {
          const uploadImageReponse = await cloudinary.uploader.upload(image);
          updatedData.image = uploadImageReponse.secure_url;
        } catch (error) {
          console.log("Error Uploading Image", error.message);
          return next(errorHandler(400, "Image Upload Failed"));
        }
      }
    }

    // !Update User:
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      updatedData,
      {
        new: true,
      }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error Updating User Profile", error.message);
    next(error);
  }
};
