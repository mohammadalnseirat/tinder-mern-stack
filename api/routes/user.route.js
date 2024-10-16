import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { updateUserProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.put("/update-profile", protectRoute, updateUserProfile);

export default router;
