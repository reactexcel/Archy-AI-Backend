import { Request, Response } from "express";
import { generateToken } from "../utils/jwt.util";
import AppDataSource from "../config/database.config";
import { User } from "../entity/user.model";
import { v4 as uuidv4 } from "uuid";
import { loginService } from "../services/user.services";

const userRepository = AppDataSource.getRepository(User);

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

export const loginCtrl = async (req:Request, res:Response) => {
  try {
    const { email, password } = req.body;
    const access_token  = await loginService(email, password, res);
    res.status(200).json({ message:"Successfully Logged In",jwt: access_token });
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