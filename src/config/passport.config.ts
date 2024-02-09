import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Request } from "express";
// import User from "../entity/user.model";
import dotenv from "dotenv";

dotenv.config();
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, 
    obj as any);
});
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID! ,
      clientSecret: process.env.CLIENT_SECRET!,
      callbackURL: "https://archi-backend.onrender.com/auth/google/callback", 
      scope: ["profile", "email"]
    } ,
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        console.log(" hhi")
        // Check if the user already exists in the database
        // let user = await User.findOne({ where: { googleId: profile.id } });

        // if (!user) {
        //   // If user does not exist, create a new user
        //   user = await User.create({
        //     displayName: profile.displayName,
        //     email: profile.emails ? profile.emails[0].value : null,
        //     picture: profile.photos ? profile.photos[0].value : null,
        //   });
        // }

        // return done(null, user);
      } catch (error) {
        return done(error as Error);
      }
    }
  )
);

export default passport;
