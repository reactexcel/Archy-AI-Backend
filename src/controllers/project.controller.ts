import AppDataSource from "../config/database.config";
import { Project } from "../entity/project.model";
import { Request, Response } from "express";
import {
  createProjectService,
  deleteProjectService,
  updateProjectService,
} from "../services/project.services";

const projectRepository = AppDataSource.getRepository(Project);

export const createProject = async (req: Request, res: Response) => {
  try {
    await createProjectService(req, res);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

export const getProject = async (req: Request, res: Response) => {
  try {
    const { id }: any = req.user;
    const project = await projectRepository.findOneBy({ userId: id });
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

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const folder = await deleteProjectService(req, res);
    if (folder) {
      return res
        .status(201)
        .send({ message: ` Folder Deleted successfully ..`, folder });
    }
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const user = await updateProjectService(req, res);
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
