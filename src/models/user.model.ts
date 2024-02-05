import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.config"; // Ensure this path is correct

const User = sequelize.define("User", {
  googleId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default User;