import express from "express";
import {
  logout_Post,
  signin_Post,
  signup_Post,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup_Post);
router.post("/signin", signin_Post);
router.post("/logout", logout_Post);

export default router;
