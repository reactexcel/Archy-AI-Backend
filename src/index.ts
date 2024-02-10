import express, { Request } from "express";
import "reflect-metadata";
import userRoutes from "./routes/user.routes";
import cors from "cors";
import AppDataSource from "./config/database.config";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 7001;

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);

export function connection() {
  try {
    AppDataSource.initialize()
      .then(() => {
        console.log("postgres connected");
        app.listen(PORT, () => {
          console.log(`server is running on PORT ${PORT}`);
        });
      })
      .catch((error: any) => console.log(error));
  } catch (error) {
    console.error(error);
  }
}

connection();
