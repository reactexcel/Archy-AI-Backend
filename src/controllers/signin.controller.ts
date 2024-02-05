import { Request, Response } from "express";
import { generateToken } from "../utils/jwt.util";

export const signIn = (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (email === "admin@admin.com" && password === "admin123") {
    const token = generateToken({ email });
    res.json({ message: "Sign in successfully", token });
  } else {
    res.status(401).json({ message: "Invalid Email & Password" });
  }
};