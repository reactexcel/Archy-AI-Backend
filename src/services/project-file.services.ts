import AppDataSource from "../config/database.config";
import { ProjectFile } from "../entity/project-file.model";
import { filterInterface } from "../interfaces/filter.interface";
import fs from "fs";
import path from "path";
const dirpath = "/root/archy-ai/Archy-AI-Backend/src/";
const projectFileRepository = AppDataSource.getRepository(ProjectFile);

export const createProjectFileService = async (
  name: string,
  projectId: string,
  isShared: boolean,
  isFavourite: boolean
) => {
  try {
    const existingProjectName = await projectFileRepository.findOneBy({
      name,
      projectId,
    });
    if (existingProjectName) {
      throw new Error("Project File with same name already exists");
    }
    const ProjectFile = projectFileRepository.create({
      name,
      projectId,
      isShared,
      isFavourite,
    });

    const savedProject = await projectFileRepository.save(ProjectFile);

    return savedProject;
  }catch (error) {
    if(error instanceof Error)
    throw new Error(`error ${error.message}`);
  }
};

export const deleteProjectFileService = async (id: string) => {
  try {
    const projectFile = await projectFileRepository.findOneBy({
      id,
    });
    if (!projectFile) {
      throw new Error("Project File Not Found");
    }
    const filePath = path.join(dirpath, "uploads", projectFile.name);
    await fs.promises.unlink(filePath);
    await projectFileRepository.delete({ id });

    return projectFile;
  }catch (error) {
    if(error instanceof Error)
    throw new Error(`error ${error.message}`);
  }
};

export const getAllProjectFileService = async (filters: filterInterface) => {
  try {
    const folder = await projectFileRepository.findBy(filters);
    if (folder.length === 0) {
      throw new Error("No data Found");
    }
    return folder;
  }catch (error) {
    if(error instanceof Error)
    throw new Error(`error ${error.message}`);
  }
};

export const getProjectFileService = async (id: string) => {
  try {
    const folder = await projectFileRepository.findOneBy({
      id: id,
    });
    if (!folder) {
      throw new Error("Project File Not Found");
    }
    return folder;
  }catch (error) {
    if(error instanceof Error)
    throw new Error(`error ${error.message}`);
  }
};

export const getAllFolderByUserIdService = async (filters: filterInterface) => {
  try {
    const folder = await projectFileRepository.findBy(filters);
    if (folder.length === 0) {
      throw new Error("No data Found");
    }
    return folder;
  } catch (error) {
    if(error instanceof Error)
    throw new Error(`error ${error.message}`);
  }
};

export const updateProjectFileService = async (
  id: string,
  name: string,
  isShared: boolean,
  isFavourite: boolean
) => {
  try {
    let projectFile = await projectFileRepository.findOneBy({ id });
    if (!projectFile) {
      throw new Error("Project File Not Found");
    }
    projectFile.name = name || projectFile.name;
    projectFile.isShared = isShared || projectFile.isShared;
    projectFile.isFavourite = isFavourite || projectFile.isFavourite;
    const savedProjectFile = await projectFileRepository.save(projectFile);
    return savedProjectFile;
  }catch (error) {
    if(error instanceof Error)
    throw new Error(`error ${error.message}`);
  }
};
