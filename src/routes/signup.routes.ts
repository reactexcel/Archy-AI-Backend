import express from "express";
import { sendOTP, verifyOTP } from "../controllers/signup.controller";

const router = express.Router();

router.post("/sendOTP", sendOTP);
router.post("/verifyOTP", verifyOTP);

export default router;