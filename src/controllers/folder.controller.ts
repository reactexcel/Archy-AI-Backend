import AppDataSource from "../config/database.config";
import { Folder } from "../entity/folder.model";
import { Request, Response } from "express";
import {
  createFolderService,
  deleteFolderService,
  updateFolderService,
} from "../services/folder.services";

const folderRepository = AppDataSource.getRepository(Folder);

export const createFolder = async (req: Request, res: Response) => {
  try {
    await createFolderService(req, res);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

export const getFolder = async (req: Request, res: Response) => {
  try {
    const { id }: any = req.user;
    const folder = await folderRepository.findOneBy({ userId: id });
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

export const deleteFolder = async (req: Request, res: Response) => {
  try {
    const folder = await deleteFolderService(req, res);
    if (folder) {
      return res
        .status(201)
        .send({ message: ` Folder Deleted successfully ..`, folder });
    }
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

export const updateFolder = async (req: Request, res: Response) => {
  try {
    await updateFolderService(req, res);
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
