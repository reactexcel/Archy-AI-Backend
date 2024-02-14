import express from "express";
import { upload } from "../utils/uploadImage.util";
import { verifyFirebaseToken, verifyUser } from "../middlewares/verifyUser";
import { createProjectFile, deleteProjectFile, getProjectFile, updateProjectFile } from "../controllers/project-file.controller";

const router = express.Router();

router.post("/project-file/create", verifyUser,upload.single("image"),createProjectFile);
router.delete("/project-file/",verifyUser, deleteProjectFile);

router.get("/project-file/:id", verifyUser, getProjectFile);
router.put(
  "/project-file/:id",
  verifyUser,
  upload.single("image"),
  updateProjectFile
);

export default router;
