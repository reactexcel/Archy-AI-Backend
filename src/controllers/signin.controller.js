"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = void 0;
const jwt_util_1 = require("../utils/jwt.util");
const signIn = (req, res) => {
    const { email, password } = req.body;
    if (email === "admin@admin.com" && password === "admin123") {
        const token = (0, jwt_util_1.generateToken)({ email });
        res.json({ message: "Sign in successfully", token });
    }
    else {
        res.status(401).json({ message: "Invalid Email & Password" });
    }
};
exports.signIn = signIn;
