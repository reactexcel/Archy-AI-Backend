import express from "express";
import {
    getAllCtrl,
    loginCtrl,
    redirect,
  registerCtrl,
  sendOTP,
  signUpGoogle,
  updateProfile,
  verifyOTP,
} from "../controllers/user.controllers";

const router = express.Router();

router.post("/signup", registerCtrl);
router.post("/sendOTP", sendOTP);
router.post("/verifyOTP", verifyOTP);
router.get("/google", signUpGoogle);
router.get("/google/callback", redirect);
// router.post("/signIn", signIn);
router.post("/signIn", loginCtrl);
router.get("/get-user", getAllCtrl);
router.put("/update-profile", updateProfile);

export default router;
