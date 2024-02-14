import express from "express";
import { upload } from "../utils/uploadImage.util";
import { verifyFirebaseToken, verifyUser } from "../middlewares/verifyUser";
import { createProject, deleteProject, getProject, updateProject } from "../controllers/project.controller";

const router = express.Router();

router.post("/create", verifyUser,upload.single("image"),createProject);
router.delete("/",verifyUser, deleteProject);

router.get("/", verifyUser, getProject);
router.put(
  "/:id",
  verifyUser,
  upload.single("image"),
  updateProject
);

export default router;
