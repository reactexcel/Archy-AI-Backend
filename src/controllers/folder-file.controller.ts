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
    const { id } = req.params;
    const name = req.file?.filename || "";
    const response = await createFolderFileService(name, id);
    res.status(200).json({
      message: "Folder File created Successfully",
      data: response,
    });
  } catch (error) {
    if(error instanceof Error)
    res.status(500).json({
      error: error.message,
    });
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
  } catch (error) {
    if(error instanceof Error)
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getAllFolderFile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const response = await getAllFolderFileService(id);
    res.status(200).json({
      message: "",
      data: response,
    });
  } catch (error) {
    if(error instanceof Error)
    res.status(500).json({
      error: error.message,
    });
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
  } catch (error) {
    if(error instanceof Error)
    res.status(500).json({
      error: error.message,
    });
  }
};

export const updateFolderFile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const response = await updateFolderFileService(id, name);
    res.status(200).json({
      message: "Folder File updated Successfully",
      data: response,
    });
  } catch (error) {
    if(error instanceof Error)
    res.status(500).json({
      error: error.message,
    });
  }
};
