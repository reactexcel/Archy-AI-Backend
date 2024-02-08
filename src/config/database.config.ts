import { DataSource } from "typeorm"
import dotenv from "dotenv";

dotenv.config();
const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
})



export default AppDataSource;