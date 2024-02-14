import AppDataSource from "../config/database.config";
import { Request, Response } from "express";
import { Project } from "../entity/project.model";
import { DeepPartial, Repository } from "typeorm";
import { reqInterface } from "../interfaces/req.interface";
import fs from "fs";

const projectRepository = AppDataSource.getRepository(Project);

export const createProjectService = async (req: Request, res: Response) => {
  const { title } = req.body;
  const { id } = req.user as reqInterface;

  try {
    const existingProjectName = await projectRepository.findOneBy({
      title,
    });
    if (existingProjectName) {
      return res.status(409).send({ message: "Existing Project Name " });
    }
    const Project = projectRepository.create({
      title,
      userId: id,
      image: req.file?.filename,
    });

    const savedProject = await projectRepository.save(Project);

    if (!savedProject) {
      return res.status(404).json({ message: "error in saving Project" });
    }
    return res
      .status(201)
      .send({ message: ` project Created successfully ..`, savedProject });
  } catch (error) {
    console.error(error);
  }
};

export const deleteProjectService = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const project = await projectRepository.findOneBy({
      id,
    });
    if (!project) {
      res.status(404).send({ message: "Project Not Found" });
    }

    await projectRepository.delete({ id });

    return project;
  } catch (error) {
    console.error(error);
  }
};

export const updateProjectService = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;
  // Check if the user exists
  let project = await projectRepository.findOneBy({ id });
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  if (req.file) {
    if (fs.existsSync(project.image)) fs.unlinkSync(project.image);
    project.image = req.file.filename;
  }
  // Update the user profile
  project.title = title;
  await projectRepository.save(project);
  return res.status(200).json({ message: "User profile updated successfully" });
};
