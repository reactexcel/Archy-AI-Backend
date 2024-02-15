import express from "express";
import { upload } from "../utils/uploadImage.util";
import { verifyFirebaseToken, verifyUser } from "../middlewares/verifyUser";
import {
  createFolderFile,
  deleteFolderFile,
  getAllFavouriteFolderFile,
  getAllFolderFile,
  getAllSharedFolderFile,
  getFolderFile,
  updateFolderFile,
} from "../controllers/folder-file.controller";

const router = express.Router();

router.post("/create", verifyUser, createFolderFile);
router.delete("/:id", verifyUser, deleteFolderFile);

router.get("/shared/:id", verifyUser, getAllSharedFolderFile);
router.get("/favourite/:id", verifyUser, getAllFavouriteFolderFile);
router.get("/all/:id", verifyUser, getAllFolderFile);
router.get("/:id", verifyUser, getFolderFile);
router.put(
  "/:id",
  verifyUser,
  upload.single("image"),
  updateFolderFile
);

export default router;
