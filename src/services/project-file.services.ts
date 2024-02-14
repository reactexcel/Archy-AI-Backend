import AppDataSource from "../config/database.config";
import { Request, Response } from "express";
import { ProjectFile } from "../entity/project-file.model";

const projectFileRepository = AppDataSource.getRepository(ProjectFile);

export const createProjectFileService = async (req: Request, res: Response) => {
  const { name ,projectId} = req.body;

  try {
    const existingProjectName = await projectFileRepository.findOneBy({
      name,
    });
    if (existingProjectName) {
      return res.status(409).send({ message: "Existing Project Name " });
    }
    const ProjectFile = projectFileRepository.create({
      name,
      projectId
    });

    const savedProject = await projectFileRepository.save(ProjectFile);

    if (!savedProject) {
      return res.status(404).json({ message: "error in saving Project" });
    }else{
    return res
      .status(201)
      .send({ message: ` project Created successfully ..`, savedProject });}
  } catch (error) {
    console.error(error);
  }
};

export const deleteProjectFileService = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const projectFile = await projectFileRepository.findOneBy({
      id,
    });
    if (!projectFile) {
      res.status(404).send({ message: "Project Not Found" });
    }

    await projectFileRepository.delete({ id });

    return projectFile;
  } catch (error) {
    console.error(error);
  }
};

export const updateProjectFileService = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  // Check if the user exists
  let projectFile = await projectFileRepository.findOneBy({ id });
  if (!projectFile) {
    return res.status(404).json({ message: "Project not found" });
  }


  // Update the user profile
  projectFile.name = name;
  await projectFileRepository.save(projectFile);
  return res.status(200).json({ message: "User profileFile updated successfully" });
};
