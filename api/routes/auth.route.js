import express from "express";
import {
  logout_Post,
  signin_Post,
  signup_Post,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/signup", signup_Post);
router.post("/signin", signin_Post);
router.post("/logout", logout_Post);

// !Route to get current(me) user:
router.get("/me", protectRoute, (req, res, next) => {
  try {
    res.send({
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.log("Error Getting Current User", error.message);
    next(error);
  }
});

export default router;
