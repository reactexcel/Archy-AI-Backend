import { Request, Response } from "express";
import AppDataSource from "../config/database.config";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { User } from "../entity/user.model";
import { generateToken } from "../utils/jwt.util";
const curr_User = AppDataSource.getRepository(User);
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
      res.status(404).json({ message: "Not found" });
    }
    return saveUser;
  } catch (error) {
    console.error(error);
  }
};

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

export const updateProfileService = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { username, password, newPassword, locations } = req.body;
  // Check if the user exists
  let user = await curr_User.findOne({ where: { id: userId } });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const result = bcrypt.compare(password, user.password);
  if (!result) {
    return res.status(404).json({ message: "Wrong password" });
  }
  const hashPassword = await bcrypt.hash(newPassword, 10);
  // Update the user profile
  const update: Partial<User> = {};
  if (username) update.username = username;
  if (hashPassword) update.password = hashPassword;
  if (locations) update.locations = locations;
   const {affected}=await curr_User.update({ id: userId }, update);
   if(affected){
   if(affected<0){
  return curr_User.find({where:{id:userId}});}
}else{
  return res.status(404).json({ message: "not updated" });

};}
