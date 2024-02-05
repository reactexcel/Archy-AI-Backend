import express from "express";
import { signIn } from "../controllers/signin.controller";

const router = express.Router();

router.post("/signIn", signIn);

export default router;