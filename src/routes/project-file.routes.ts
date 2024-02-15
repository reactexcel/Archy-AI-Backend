import express from "express";
import { upload } from "../utils/uploadImage.util";
import { verifyFirebaseToken, verifyUser } from "../middlewares/verifyUser";
import { createProjectFile, deleteProjectFile, getAllFavouriteProjectFile, getAllProjectFile, getAllSharedProjectFile, getProjectFile, updateProjectFile } from "../controllers/project-file.controller";

const router = express.Router();

router.post("/create", verifyUser,upload.single("image"),createProjectFile);
router.delete("/:id",verifyUser, deleteProjectFile);

router.get("/shared/:id", verifyUser, getAllSharedProjectFile);
router.get("/favourite/:id", verifyUser, getAllFavouriteProjectFile);
router.get("/all/:id", verifyUser, getAllProjectFile);
router.get("/:id", verifyUser, getProjectFile);
router.put(
  "/:id",
  verifyUser,
  upload.single("image"),
  updateProjectFile
);

export default router;
