import { Request, Response } from "express";
import AppDataSource from "../config/database.config";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { User } from "../entity/user.model";
import { generateToken } from "../utils/jwt.util";

const curr_User = AppDataSource.getRepository(User);

//Sigup Service
export const registerService = async (req: Request, res: Response) => {
  const { username, email, password, locations, profileImage } = req.body;
  try {
    const existingUserEmail = await curr_User.findOneBy({
      email,
    });
    if (existingUserEmail) {
      res.status(409).send({ message: "Email already register" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = curr_User.create({
      id: uuidv4(),
      username,
      email,
      password: hashPassword,
      locations,
      profileImage,
    });

    const saveUser = await curr_User.save(user);

    if (!saveUser) {
      res.status(404).json({ message: "error in saving user" });
    }
    return saveUser;
  } catch (error) {
    console.error(error);
  }
};

//Login with google service
export const loginGoogleService = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await curr_User.findOneBy({
    email,
  });

  if (!user) {
    const newUser = await registerService(req, res);
    res.status(200).json({ message: "Successfully registered ", newUser });
  } else {
    const access_token = generateToken({ id: user.id, email: user.email });
    res
      .status(200)
      .json({ message: "Successfully Logged In", token: access_token });
  }
};

//Login service
export const loginService = async (
  email: string,
  password: string,
  res: Response
) => {
  const user = await curr_User.findOneBy({
    email,
  });

  if (!user) {
    return res.status(404).json({ message: "Not found" });
  }
  const result = bcrypt.compare(password, user.password);
  if (!result) {
    return res.status(404).json({ message: "Wrong password" });
  } else {
    const access_token = generateToken({ id: user.id, email: user.email });
    return access_token;
  }
};

//Update Profile Service
export const updateProfileService = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { username, password, newPassword, locations } = req.body;
  // Check if the user exists
  let user = await curr_User.findOne({ where: { id: userId } });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  //Check Old Password
  const result = bcrypt.compare(password, user.password);
  if (!result) {
    return res.status(404).json({ message: "Wrong password" });
  }
  const hashPassword = await bcrypt.hash(newPassword, 10);
  // Update the user profile
  user.username = username ||user.username;
  user.password = hashPassword||user.password ;
  user.locations = locations||user.locations;
  return await curr_User.save(user);
};
