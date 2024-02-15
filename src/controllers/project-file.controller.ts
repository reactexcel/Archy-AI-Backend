import { Request, Response } from "express";
import {
  createProjectFileService,
  deleteProjectFileService,
  getAllProjectFileService,
  getProjectFileService,
  updateProjectFileService,
} from "../services/project-file.services";
import { reqInterface } from "../interfaces/req.interface";
import { filterInterface } from "../interfaces/filter.interface";

export const createProjectFile = async (req: Request, res: Response) => {
  try {
    const { name, projectId, isShared, isFavourite } = req.body;
    const response = await createProjectFileService(
      name,
      projectId,
      isShared,
      isFavourite
    );
    res.status(201).json({
      message: "Project File created Successfully",
      data: response,
    });
  } catch (error: unknown) {
    if (typeof error === "object" && error) {
      if ("message" in error)
        throw new Error(error?.message as unknown as string);
    }
    throw new Error("Internal Server error");
  }
};

export const getProjectFile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await getProjectFileService(id);
    res.status(200).json({
      message: "Project File fetched Successfully",
      data: response,
    });
  } catch (error: unknown) {
    if (typeof error === "object" && error) {
      if ("message" in error)
        throw new Error(error?.message as unknown as string);
    }
    throw new Error("Internal Server error");
  }
};

export const getAllProjectFile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { isShared, isFavourite } = req.query;

    let filters = { userId: id } as filterInterface;
    if (isShared !== undefined) {
      filters.isShared = isShared === 'true';
    }
    if (isFavourite !== undefined) {
      filters.isFavourite = isFavourite === 'true';
    }
    const response = await getAllProjectFileService(filters);
    res.status(200).json({
      message: "",
      data: response,
    });
  } catch (error: unknown) {
    if (typeof error === "object" && error) {
      if ("message" in error)
        throw new Error(error?.message as unknown as string);
    }
    throw new Error("Internal Server error");
  }
};

export const deleteProjectFile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await deleteProjectFileService(id);
    res.status(200).json({
      message: "Project File deleted Successfully",
      data: response,
    });
  } catch (error: unknown) {
    if (typeof error === "object" && error) {
      if ("message" in error)
        throw new Error(error?.message as unknown as string);
    }
    throw new Error("Internal Server error");
  }
};

export const updateProjectFile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, isFavourite, isShared } = req.body;
    const response = await updateProjectFileService(
      id,
      name,
      isShared,
      isFavourite
    );
    res.status(200).json({
      message: "Project File updated Successfully",
      data: response,
    });
  } catch (error: unknown) {
    if (typeof error === "object" && error) {
      if ("message" in error)
        throw new Error(error?.message as unknown as string);
    }
    throw new Error("Internal Server error");
  }
};
