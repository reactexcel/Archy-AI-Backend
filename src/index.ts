import express from "express";
import dotenv from "dotenv";
import { sequelize } from "./config/database.config";
import signupRoutes from "./routes/signup.routes";
import signinRoutes from "./routes/signin.routes";
import authRoutes from "./routes/auth.routes";
import session from "express-session";
import passport from "passport";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7001;

app.use(cors());
app.use(express.json());

app.use("/api/auth", signupRoutes);
app.use("/api/auth", signinRoutes);
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);

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