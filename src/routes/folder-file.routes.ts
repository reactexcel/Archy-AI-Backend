import express from "express";
import { upload } from "../utils/uploadImage.util";
import { verifyFirebaseToken, verifyUser } from "../middlewares/verifyUser";
import {
  createFolderFile,
  deleteFolderFile,
  getFolderFile,
  updateFolderFile,
} from "../controllers/folder-file.controller";

const router = express.Router();

router.post("/folder-file/create", verifyUser, createFolderFile);
router.delete("/folder-file/:id", verifyUser, deleteFolderFile);

router.get("/folder-file/", verifyUser, getFolderFile);
router.put(
  "/folder-file/:id",
  verifyUser,
  upload.single("image"),
  updateFolderFile
);

export default router;
