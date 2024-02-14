import { Request, Response } from "express";
import {
  createFolderService,
  deleteFolderService,
  getAllFolderByUserIdService,
  getFolderService,
  updateFolderService,
} from "../services/folder.services";
import { reqInterface } from "../interfaces/req.interface";

export const createFolder = async (req: Request, res: Response) => {
  try {
    const { title,isShared,IsFavourite } = req.body;
    const { id } = req.user as reqInterface;
    const response = await createFolderService(title,isShared, IsFavourite, id);
    res.status(200).json({
      message: "Saved Folder successfully",
      data: response,
    });
  } catch (error: any) {
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
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getAllFolderByUserId = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const response = await getAllFolderByUserIdService(id);
    res.status(200).json({
      message: "",
      data: response,
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const deleteFolder = async (req: Request, res: Response) => {
  try {
    const {id}=req.params
    const response = await deleteFolderService(id);
    res.status(200).json({
      message: "Folder deleted Successfully",
      data: response,
    });
  } catch (error: any) {
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
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
};
