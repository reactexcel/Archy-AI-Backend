import { Request, Response } from "express";
import {
  createProjectService,
  deleteProjectService,
  getAllProjectService,
  getProjectService,
  updateProjectService,
  addOrRemoveProjectToFavouriteByIdService
} from "../services/project.services";
import { reqInterface } from "../interfaces/req.interface";
import { filterInterface } from "../interfaces/filter.interface";
import AppDataSource from "../config/database.config";
import { Project } from "../entity/project.model";
const projectRepository = AppDataSource.getRepository(Project);

export const createProject = async (req: Request, res: Response) => {
  try {
    const { title, isShared, isFavourite } = req.body;
    const { id } = req.user as reqInterface;
    const image = req.file?.filename || "";

    let response = await createProjectService(
      title,
      id,
      image,
      isShared,
      isFavourite
    );
    res.status(201).json({
      message: "Saved Project successfully",
      data: response,
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const createDuplicateProject = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const { id } = req.user as reqInterface;
    const existingProject = await projectRepository.findOneBy({
      userId: id,
      id: projectId,
    });
    if (!existingProject) {
      throw new Error("Project Not Found");
    }
    const response = await createProjectService(
      existingProject.title,
      id,
      existingProject.image,
      existingProject.isShared,
      existingProject.isFavourite
    );
    res.status(201).json({
      message: "Duplicate Project created successfully",
      data: response,
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getAllProjectByUserId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { isShared, isFavourite ,isRecent } = req.query;

    let filters = { userId: id } as filterInterface;
    if (isShared !== undefined) {
      filters.isShared = isShared === "true";
    }
    if (isFavourite !== undefined) {
      filters.isFavourite = isFavourite === "true";
    }
    if (isRecent !== undefined) {
      filters.isRecent = isRecent == "true";
    }
    const response = await getAllProjectService(filters);
    res.status(200).json({
      message: "",
      data: response,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await getProjectService(id);
    res.status(200).json({
      message: "Project",
      data: response,
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await deleteProjectService(id);
    res.status(200).json({
      message: "Deleted Project successfully",
      data: response,
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, isShared, isFavourite } = req.body;
    const fileName = req.file?.filename || "";
    const project = await updateProjectService(
      id,
      title,
      fileName,
      isFavourite,
      isShared
    );
    res.status(200).json({
      message: "Updated Project successfully",
      data: project,
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const addOrRemoveProjectToFavouriteById = async (req:Request, res:Response) => {
  try{
    const { id } = req.params;
    const {isFavourite} = req.body;
    const response = await addOrRemoveProjectToFavouriteByIdService(id)
    res.status(200).json({
      message: "project added to favourite",
      data: response,
    });
  }catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
};

