import { Request, Response } from "express";
import { sendEmailWithOTP } from "../utils/mailer.util"; // Ensure this path is correct
import { generateToken, verifyToken } from "../utils/jwt.util"; // Ensure this path is correct
import Otp from "../models/otp.model"; // Ensure this path is correct

export const sendOTP = async (req: Request, res: Response) => {
  const { email } = req.body;
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  const expiry = new Date();
  expiry.setMinutes(expiry.getMinutes() + 10); // OTP expiry set to 10 minutes from now

  try {
    // Save OTP to database
    await Otp.create({
      email,
      otp,
      expiry,
    });

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
    const decoded = verifyToken(token) as {
      email: string;
      otp: string;
      iat: number;
      exp: number;
    };
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