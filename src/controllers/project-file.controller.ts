import AppDataSource from "../config/database.config";
import { Project } from "../entity/project.model";
import { Request, Response } from "express";
import {
  createProjectFileService,
  deleteProjectFileService,
  updateProjectFileService,
} from "../services/project-file.services";
import { ProjectFile } from "../entity/project-file.model";

const projectFileRepository = AppDataSource.getRepository(ProjectFile);

export const createProjectFile = async (req: Request, res: Response) => {
  try {
    await createProjectFileService(req, res);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

export const getProjectFile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id)
    const project = await projectFileRepository.findOneBy({ id:id });
    if (!project) {
      return res.status(400).send({ message: "Not found" });
    }

    res.status(200).send({
      project,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

export const deleteProjectFile = async (req: Request, res: Response) => {
  try {
    const folder = await deleteProjectFileService(req, res);
    if (folder) {
      return res
        .status(201)
        .send({ message: ` Folder Deleted successfully ..`, folder });
    }
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

export const updateProjectFile = async (req: Request, res: Response) => {
  try {
    await updateProjectFileService(req, res);
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
