import express, { Request } from "express";
import "reflect-metadata"
import passport from "../src/config/passport.config";
import userRoutes from "./routes/user.routes";
import signinRoutes from "./routes/signin.routes";
import cors from "cors";
import AppDataSource from "./config/database.config"
import dotenv from "dotenv";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 7001;

app.use(cors());

app.use(express.json());
app.use(passport.initialize()); // Initialize Passport middleware

// Google OAuth routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (_req: Request, res: express.Response) => {
    // Successful authentication, redirect to success route or send response
    res.redirect("/success");
  }
);

app.use("/api/auth", userRoutes);
app.use("/api/auth", signinRoutes);

export function connection(){
  try{
  AppDataSource
    .initialize()
    .then(() => {
      console.log("postgres connected");
      app.listen(PORT, () => {
        console.log(`server is running on PORT ${PORT}`);
      });
    }).catch((error:any)=> console.log(error))
   }catch(error){
      console.error(error)
    }}

    connection();