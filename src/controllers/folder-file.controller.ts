import { Request, Response } from "express";
import {
  createFolderFileService,
  deleteFolderFileService,
  getAllFolderFileService,
  getFolderFileService,
  updateFolderFileService,
} from "../services/folder-file.services";
import { filterInterface } from "../interfaces/filter.interface";

export const createFolderFile = async (req: Request, res: Response) => {
  try {
    const { name, folderId, isShared, isFavourite } = req.body;
    const response = await createFolderFileService(
      name,
      folderId,
      isShared,
      isFavourite
    );
    res.status(200).json({
      message: "Folder File created Successfully",
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

export const getFolderFile = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const response = await getFolderFileService(id);
    res.status(200).json({
      message: "Folder File fetched Successfully",
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

export const getAllFolderFile = async (req: Request, res: Response) => {
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
    const response = await getAllFolderFileService(filters);
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

export const deleteFolderFile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await deleteFolderFileService(id);
    res.status(200).json({
      message: "Folder File deleted Successfully",
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

export const updateFolderFile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, isShared, isFavourite } = req.body;
    const response = await updateFolderFileService(
      id,
      name,
      isShared,
      isFavourite
    );
    res.status(200).json({
      message: "Folder File updated Successfully",
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
