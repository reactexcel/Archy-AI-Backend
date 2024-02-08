"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_config_1 = require("../config/database.config"); // Ensure this path is correct
const Otp = database_config_1.sequelize.define("Otp", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure that the email is unique
    },
    otp: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    expiry: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: "otps", // Specify the table name for OTPs
    timestamps: false, // You can enable timestamps if needed
});
exports.default = Otp;
