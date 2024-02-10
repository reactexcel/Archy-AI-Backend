import { Request, Response, NextFunction } from "express";
import { User } from "../entity/user.model";
import { verifyToken } from "../utils/jwt.util";

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || "";
    if (!token)
      return res
        .status(403)
        .send({ message: "anauthorized or access token missing" });
    const decodedUser = verifyToken(token);
    if (!decodedUser) return res.status(401).send({ message: "unauthorized" });
    req.user = decodedUser;
    next();
  } catch (error) {
    res.status(500).send({ success: false, message: error });
  }
};
