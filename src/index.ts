import express, { Request } from "express";
import "reflect-metadata";
import userRoutes from "./routes/user.routes";
import cors from "cors";
import AppDataSource from "./config/database.config";
import dotenv from "dotenv";
import admin from 'firebase-admin';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 7001;

app.use(cors());
app.use(express.json());
app.use('/objects',express.static(__dirname +'/uploads'));
// admin.initializeApp({
//   credential: admin.credential.cert('path/to/your/firebase/credentials.json'),
//   databaseURL: 'https://your-firebase-project.firebaseio.com'
// });
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
