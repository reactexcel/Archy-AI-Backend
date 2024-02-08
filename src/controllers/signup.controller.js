"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOTP = exports.sendOTP = void 0;
const mailer_util_1 = require("../utils/mailer.util"); // Ensure this path is correct
const jwt_util_1 = require("../utils/jwt.util"); // Ensure this path is correct
const otp_model_1 = __importDefault(require("../models/otp.model")); // Ensure this path is correct
const sendOTP = async (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 10); // OTP expiry set to 10 minutes from now
    try {
        // Save OTP to database
        await otp_model_1.default.create({
            email,
            otp,
            expiry,
        });
        // Optionally send OTP via email
        await (0, mailer_util_1.sendEmailWithOTP)(email, otp);
        // Generate a token for response (optional based on your requirement)
        const token = (0, jwt_util_1.generateToken)({ email, otp });
        res.json({ message: "OTP sent successfully", token });
    }
    catch (error) {
        console.error("Error saving OTP:", error);
        res.status(500).json({ message: "Failed to send OTP" });
    }
};
exports.sendOTP = sendOTP;
const verifyOTP = (req, res) => {
    const { otp } = req.body;
    const token = req.headers.authorization?.split(" ")[1] || "";
    try {
        const decoded = (0, jwt_util_1.verifyToken)(token);
        if (decoded.otp === otp) {
            res.json({ message: "OTP verified successfully" });
        }
        else {
            res.status(400).json({ message: "Invalid OTP" });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res
                .status(500)
                .json({ message: "Failed to verify OTP", error: error.message });
        }
        else {
            res.status(500).json({ message: "An unexpected error occurred" });
        }
    }
};
exports.verifyOTP = verifyOTP;
