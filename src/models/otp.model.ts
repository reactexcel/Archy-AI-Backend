import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.config"; // Ensure this path is correct

const Otp = sequelize.define(
  "Otp",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure that the email is unique
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiry: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "otps", // Specify the table name for OTPs
    timestamps: false, // You can enable timestamps if needed
  }
);

export default Otp;