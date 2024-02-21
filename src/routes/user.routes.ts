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
import { decodedToken } from "../middlewares/firebaseAuth";

const router = express.Router();

router.post("/signup", upload.single("profile"), registerCtrl);
router.post("/sendOTP", sendOTP);
router.post("/verifyOTP", verifyOTP);
router.post("/signIn", loginCtrl);
router.post("/signInGoogle",decodedToken,upload.single("profile"), loginGoogleCtrl);
router.get("/get-user/:id", verifyUser, getAllCtrl);
router.patch(
  "/update-profile/:id",
  verifyUser,
  upload.single("profile"),
  updateProfile
);

export default router;
