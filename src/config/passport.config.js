"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const user_model_1 = __importDefault(require("../models/user.model"));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((obj, done) => {
    done(null, obj);
});
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:7001/auth/google/callback",
    scope: ["email", "profile"]
}, async (_accessToken, _refreshToken, profile, done) => {
    try {
        // Check if the user already exists in the database
        let user = await user_model_1.default.findOne({ where: { googleId: profile.id } });
        if (!user) {
            // If user does not exist, create a new user
            user = await user_model_1.default.create({
                displayName: profile.displayName,
                email: profile.emails ? profile.emails[0].value : null,
                picture: profile.photos ? profile.photos[0].value : null,
            });
        }
        return done(null, user);
    }
    catch (error) {
        return done(error);
    }
}));
exports.default = passport_1.default;
