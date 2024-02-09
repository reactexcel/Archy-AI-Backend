import { Request, Response } from "express";
import { sendEmailWithOTP } from "../utils/mailer.util"; // Ensure this path is correct
import { generateToken, verifyToken } from "../utils/jwt.util"; // Ensure this path is correct
import { Otp } from "../entity/otp.model"; // Ensure this path is correct
import AppDataSource from "../config/database.config";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../entity/user.model";
import { v4 as uuidv4 } from "uuid";//For unique id
import passport from "passport";
import { loginService, registerService, updateProfileService } from "../services/user.services";

const otpRepository = AppDataSource.getRepository(Otp);
const userRepository = AppDataSource.getRepository(User);
export const registerCtrl = async (req: Request, res: Response) => {
  try {
    const user = await registerService(req, res);

    if (user) {
      return res.status(201).send({ message: ` Registered successfully ..` });
    }
  } catch (error) {
    res.status(500).send("Server Error");
  }
};




export const loginCtrl = async (req:Request, res:Response) => {
  try {
    const { email, password } = req.body;
    const access_token  = await loginService(email, password, res);
    res.status(200).json({ message:"Successfully Logged In",token: access_token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

export const getAllCtrl = async (req:Request, res:Response) => {
  try {
    const user = await userRepository.find();
    if (!user) {
      return res.status(400).send({ message: "Not found" });
    }
    res.status(200).send({ user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Update user profile route
export const updateProfile=async(req:Request,res:Response)=>{
  try{
 const user=await updateProfileService(req,res);
if(!user){
  res.status(404).json({ message: 'user not found' });
}
    res.status(200).json({ message: 'User profile updated successfully', user });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }

}

export const sendOTP = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 10); // OTP expiry set to 10 minutes from now

    // Save OTP to database
    const otp = new Otp();

    otp.id = uuidv4();
    otp.email = email;
    otp.otp = newOtp;
    otp.expiry = expiry;
    await otpRepository.save(otp);

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
    if (!decoded) {
    }
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




export const signUpGoogle = async () => {
  passport.authenticate("google", { scope: ["profile", "email"] })
};

export const redirect=async()=>{passport.authenticate("google", { failureRedirect: "/login" }),
(_req: Request, res: Response) => {
  // Successful authentication, redirect to success route or send response
  res.redirect("/success");
}}


// export const signIn = async(req: Request, res: Response) => {
//   const { email, password } = req.body;
//   const user=await userRepository.findOne({where:{email:email}});
// console.log(user);
//   if (user) {
//     const token = generateToken({ email });
//     res.json({ message: "Sign in successfully", token });
//   } else {
//     res.status(401).json({ message: "Invalid Email & Password" });
//   }
// };