import AppDataSource from "../config/database.config";
import { Project } from "../entity/project.model";
import fs from "fs";
import { filterInterface } from "../interfaces/filter.interface";

const projectRepository = AppDataSource.getRepository(Project);

export const createProjectService = async (
  title: string,
  id: string,
  image: string,
  isShared: boolean,
  isFavourite: boolean
) => {
  try {
    const existingProjectName = await projectRepository.findOneBy({
      title,userId:id
    });

    if (existingProjectName) {
      throw new Error("Project with same name already exists");
    }

    const Project = projectRepository.create({
      title,
      userId: id,
      image,
      isShared,
      isFavourite,
    });
    const savedProject = await projectRepository.save(Project);
    return savedProject;
  } catch (error: unknown) {
    if (typeof error === "object" && error) {
      if ("message" in error)
        throw new Error(error?.message as unknown as string);
    }
    throw new Error("Internal Server error");
  }
};

export const getProjectService = async (id: string) => {
  try {
    const project = await projectRepository.findOneBy({
      id,
    });
    if (!project) {
      throw new Error("Project Not Found");
    }
    return project;
  } catch (error) {
    console.error(error);
  }
};

export const getAllProjectService = async (filters:filterInterface) => {
  try {
    const folder = await projectRepository.findBy(filters);
    if (folder.length === 0) {
      throw new Error("No data Found");
    }
    return folder;
  } catch (error: unknown) {
    if (typeof error === "object" && error) {
      if ("message" in error)
        throw new Error(error?.message as unknown as string);
    }
    throw new Error("Internal Server error");
  }
};

export const deleteProjectService = async (id: string) => {
  try {
    const project = await projectRepository.findOneBy({
      id,
    });
    if (!project) {
      throw new Error("Project not found");
    }

    await projectRepository.delete({ id });

    return project;
  } catch (error: unknown) {
    if (typeof error === "object" && error) {
      if ("message" in error)
        throw new Error(error?.message as unknown as string);
    }
    throw new Error("Internal Server error");
  }
};

export const updateProjectService = async (
  id: string,
  title: string,
  fileName: string,
  isFavourite: boolean,
  isShared: boolean
) => {
  try {
    let project = await projectRepository.findOneBy({ id });
    if (!project) {
      throw new Error("Project not found");
    }

    if (fileName) {
      if (fs.existsSync(project.image)) fs.unlinkSync(project.image);
      project.image = fileName;
    }
    project.title = title || project.title;
    project.isShared = isShared || project.isShared;
    project.isFavourite = isFavourite || project.isFavourite;
    return await projectRepository.save(project);
  } catch (error: unknown) {
    if (typeof error === "object" && error) {
      if ("message" in error)
        throw new Error(error?.message as unknown as string);
    }
    throw new Error("Internal Server error");
  }
};
