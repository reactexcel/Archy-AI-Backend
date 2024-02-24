import { Request, Response } from "express";
import {
  createFolderService,
  deleteFolderService,
  getAllFolderByUserIdService,
  getFolderService,
  updateFolderService,
} from "../services/folder.services";
import { reqInterface } from "../interfaces/req.interface";
import { filterInterface } from "../interfaces/filter.interface";
import AppDataSource from "../config/database.config";
import { Folder } from "../entity/folder.model";
const folderRepository = AppDataSource.getRepository(Folder);


export const createFolder = async (req: Request, res: Response) => {
  try {
    const { title, isShared, IsFavourite } = req.body;
    const { id } = req.user as reqInterface;
    const response = await createFolderService(
      title,
      isShared,
      IsFavourite,
      id
    );
    res.status(200).json({
      message: "Saved Folder successfully",
      data: response,
    });
  } catch (error) {
    if(error instanceof Error)
    res.status(500).json({
      error: error.message,
    });
  }
};

export const createDuplicateFolder = async (req: Request, res: Response) => {
  try {
    const {folderId}=req.params;
    const { id } = req.user as reqInterface;
    const existingFolder = await folderRepository.findOneBy({
      userId:id,id:folderId
    });
    if(!existingFolder){
      throw new Error('Folder Not Found');
    }
    const response = await createFolderService(
      existingFolder.title,
      existingFolder.isShared,
      existingFolder.isFavourite,
      id
    );
    res.status(201).json({
      message: "Duplicate Folder created successfully",
      data: response,
    });
  } catch (error) {
    if(error instanceof Error)
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getFolder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await getFolderService(id);
    res.status(200).json({
      message: "Folder",
      data: response,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAllFolderByUserId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { isShared, isFavourite } = req.query;

    let filters = { userId: id } as filterInterface;
    if (isShared !== undefined) {
      filters.isShared = isShared === "true";
    }
    if (isFavourite !== undefined) {
      filters.isFavourite = isFavourite === "true";
    }
    const response = await getAllFolderByUserIdService(filters);
    res.status(200).json({
      message: "",
      data: response,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteFolder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await deleteFolderService(id);
    res.status(200).json({
      message: "Folder deleted Successfully",
      data: response,
    });
  } catch (error) {
    if(error instanceof Error)
    res.status(500).json({
      error: error.message,
    });
  }
};

export const updateFolder = async (req: Request, res: Response) => {
  try {
    const response = await updateFolderService(req, res);
    res.status(200).json({
      message: "Folder deleted Successfully",
      data: response,
    });
  } catch (error) {
    if(error instanceof Error)
    res.status(500).json({
      error: error.message,
    });
  }
};
