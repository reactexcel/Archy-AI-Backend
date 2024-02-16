import express from "express";
import { upload } from "../utils/uploadImage.util";
import { verifyFirebaseToken, verifyUser } from "../middlewares/verifyUser";
import {
  createDuplicateProject,
  createProject,
  deleteProject,
  getAllProjectByUserId,
  getProject,
  updateProject,
  addOrRemoveProjectToFavouriteById
} from "../controllers/project.controller";

const router = express.Router();

router.post("/create", verifyUser, upload.single("image"), createProject);
router.delete("/:id", verifyUser, deleteProject);
router.post("/duplicate/:projectId",verifyUser, createDuplicateProject);
router.get("/all/:id", verifyUser, getAllProjectByUserId);
router.get("/:id", verifyUser, getProject);
router.patch("/addToFavourite/:id",verifyUser,addOrRemoveProjectToFavouriteById)
router.patch("/:id", verifyUser, upload.single("image"), updateProject);

export default router;
