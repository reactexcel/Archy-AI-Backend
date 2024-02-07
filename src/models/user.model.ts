import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.config"; // Ensure this path is correct

const Otp = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure that the email is unique
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    picture: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "users", // Specify the table name for OTPs
    timestamps: false, // You can enable timestamps if needed
  }
);

export default Otp;