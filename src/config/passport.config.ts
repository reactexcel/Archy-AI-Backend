import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import User from "../models/user.model"; // Ensure this path is correct

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.CALLBACK_URL,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      const email = profile.emails![0].value;
      try {
        let user = await User.findOne({ where: { email: email } });
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            email: email,
            name: profile.displayName,
          });
        }
        done(null, user);
      } catch (error) {
        if (error instanceof Error) {
          done(error);
        } else {
          done(new Error("An unknown error occurred"));
        }
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const userId = parseInt(id);
    const user = await User.findByPk(userId);
    if (!user) {
      return done(new Error("User not found"));
    }
    done(null, user);
  } catch (error) {
    if (error instanceof Error) {
      done(error);
    } else {
      done(new Error("An unknown error occurred"));
    }
  }
});