import { Request, Response } from "express";
import { sendEmailWithOTP } from "../utils/mailer.util"; // Ensure this path is correct
import { generateToken, verifyToken } from "../utils/jwt.util"; // Ensure this path is correct
import { Otp } from "../entity/otp.model"; // Ensure this path is correct
import AppDataSource from "../config/database.config";
import { JwtPayload } from "jsonwebtoken";
const otpRepository = AppDataSource.getRepository(Otp);
import { v4 as uuidv4 } from 'uuid';

export const sendOTP = async (req: Request, res: Response) => {
  try {
  const { email } = req.body;
  const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
  const expiry = new Date();
  expiry.setMinutes(expiry.getMinutes() + 10); // OTP expiry set to 10 minutes from now

  
    // Save OTP to database

    const otp = new Otp();

    otp.id= uuidv4();
    otp.email = email;
    otp.otp = newOtp;
    otp.expiry = expiry;
    console.log(otp)
    await otpRepository.save(otp);
    console.log(otp)

    // Optionally send OTP via email
    await sendEmailWithOTP(email, newOtp);

    // Generate a token for response (optional based on your requirement)
    const token = generateToken({ email, newOtp });

    res.json({ message: "OTP sent successfully", token });
  } catch (error) {
    console.error("Error saving OTP:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

export const verifyOTP = (req: Request, res: Response) => {
  const { otp } = req.body;
  const token = req.headers.authorization?.split(" ")[1] || "";

  try {
    const decoded = verifyToken(token) as JwtPayload;
    console.log(decoded,otp)
    if (decoded.newOtp === otp) {
      res.json({ message: "OTP verified successfully" });
    } else {
      res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Failed to verify OTP", error: error.message });
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
};

