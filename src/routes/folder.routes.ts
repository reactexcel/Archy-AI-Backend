import express from "express";

import { upload } from "../utils/uploadImage.util";
import { verifyFirebaseToken, verifyUser } from "../middlewares/verifyUser";
import { createFolder, deleteFolder, getFolder, updateFolder } from "../controllers/folder.controller";

const router = express.Router();

router.post("/create",verifyUser, createFolder);
router.delete("/",verifyUser, deleteFolder);
router.put("/",verifyUser, deleteFolder);

router.get("/", verifyUser, getFolder);
router.put(
  "/:id",
  verifyUser,
//   upload.single("image"),
  updateFolder
);

export default router;
