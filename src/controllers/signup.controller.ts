import { Request, Response } from "express";
import { sendEmailWithOTP } from "../utils/mailer.util"; // Ensure this path is correct
import { generateToken, verifyToken } from "../utils/jwt.util"; // Ensure this path is correct
import { Otp } from "../entity/otp.model"; // Ensure this path is correct
import { verifyToke } from "../interfaces/verifyToken.interface";
import AppDataSource from "../config/database.config";
import { OtpInterface } from "../interfaces/Otp.interface";
const currOtp = AppDataSource.getRepository(Otp);
export const sendOTP = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 10); // OTP expiry set to 10 minutes from now

    // Save OTP to database
    const generatedOtp = currOtp.create({
      email,
      otp,
      expiry,
    } as OtpInterface);
    await currOtp.save(generatedOtp);
    // Optionally send OTP via email
    await sendEmailWithOTP(email, otp);

    // Generate a token for response (optional based on your requirement)
    const token = generateToken({ email, otp });

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
    const decoded = verifyToken(token) as verifyToke;
    if (decoded.otp === otp) {
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
