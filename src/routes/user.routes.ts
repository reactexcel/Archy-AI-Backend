import express from "express";
import {
  getAllCtrl,
  loginCtrl,
  loginGoogleCtrl,
  redirect,
  registerCtrl,
  sendOTP,
  signUpGoogle,
  updateProfile,
  verifyOTP,
} from "../controllers/user.controllers";
import { upload } from "../utils/uploadImage.util";
import { verifyUser } from "../middlewares/verifyUser";

const router = express.Router();

router.post("/signup", registerCtrl);
router.post("/sendOTP", sendOTP);
router.post("/verifyOTP", verifyOTP);
router.get("/google", signUpGoogle);
router.get("/google/callback", redirect);
router.post("/signIn", loginCtrl);
router.post("/signInGoogle", loginGoogleCtrl);
router.get("/get-user", verifyUser, getAllCtrl);
router.put(
  "/update-profile",
  verifyUser,
  upload.single("profile"),
  updateProfile
);

export default router;
