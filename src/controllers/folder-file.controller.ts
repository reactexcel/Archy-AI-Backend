import AppDataSource from "../config/database.config";
import { Request, Response } from "express";
import {
  createFolderFileService,
  deleteFolderFileService,
  updateFolderFileService,
} from "../services/folder-file.services";
import { FolderFile } from "../entity/folder-file.model";

const folderFileRepository = AppDataSource.getRepository(FolderFile);

export const createFolderFile = async (req: Request, res: Response) => {
  try {
    await createFolderFileService(req, res);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

export const getFolderFile = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const folder = await folderFileRepository.findOneBy({ id: id });
    console.log(folder)
    if (!folder) {
      return res.status(400).send({ message: "Not found" });
    }

    res.status(200).send({
      folder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

export const deleteFolderFile = async (req: Request, res: Response) => {
  try {
    const folder = await deleteFolderFileService(req, res);
    if (folder) {
      return res
        .status(201)
        .send({ message: ` Folder Deleted successfully ..`, folder });
    }
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

export const updateFolderFile = async (req: Request, res: Response) => {
  try {
    await updateFolderFileService(req, res);
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
