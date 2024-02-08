"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_config_1 = __importDefault(require("../src/config/passport.config"));
const database_config_1 = require("./config/database.config");
const signup_routes_1 = __importDefault(require("./routes/signup.routes"));
const signin_routes_1 = __importDefault(require("./routes/signin.routes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 7001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(passport_config_1.default.initialize()); // Initialize Passport middleware
// Google OAuth routes
app.get("/auth/google", passport_config_1.default.authenticate("google", { scope: ["profile", "email"] }));
app.get("/auth/google/callback", passport_config_1.default.authenticate("google", { failureRedirect: "/login" }), (_req, res) => {
    // Successful authentication, redirect to success route or send response
    res.redirect("/success");
});
app.use("/api/auth", signup_routes_1.default);
app.use("/api/auth", signin_routes_1.default);
app.listen(PORT, () => {
    console.log(`🚀 Server is running on PORT ${PORT}`);
    database_config_1.sequelize
        .sync({ force: false })
        .then(() => {
        console.log("Connected to PostgreSQL Database");
    })
        .catch((err) => {
        console.error("Unable to connect to PostgreSQL Database", err);
    });
});
