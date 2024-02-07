import express, { Request } from "express";
import passport from "../src/config/passport.config";
import { sequelize } from "./config/database.config";
import signupRoutes from "./routes/signup.routes";
import signinRoutes from "./routes/signin.routes";
import cors from "cors";

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

app.use("/api/auth", signupRoutes);
app.use("/api/auth", signinRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on PORT ${PORT}`);
  sequelize
    .sync({ force: false })
    .then(() => {
      console.log("Connected to PostgreSQL Database");
    })
    .catch((err) => {
      console.error("Unable to connect to PostgreSQL Database", err);
    });
});