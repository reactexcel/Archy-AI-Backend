import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { IUserDocument } from "../model/User";

export const signinUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    const newUser: IUserDocument = new User({ email, password });
    await newUser.save();

    const newToken = jwt.sign({ email }, process.env.JWT_SECRET as string, {
      expiresIn: "15m",
    });

    res.json({ message: "User registered and login successful", token: newToken });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};