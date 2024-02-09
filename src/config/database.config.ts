import "reflect-metadata"
import { DataSource } from "typeorm"
import dotenv from "dotenv";
import { Otp } from "../entity/otp.model";
import { User } from "../entity/user.model";
dotenv.config();
const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities:[Otp,User],
    "synchronize": true,
})



export default AppDataSource;