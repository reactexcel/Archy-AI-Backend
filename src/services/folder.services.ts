import AppDataSource from "../config/database.config";
import { Folder } from "../entity/folder.model";
import { Request, Response } from "express";
import { reqInterface } from "../interfaces/req.interface";

const folderRepository = AppDataSource.getRepository(Folder);

export const createFolderService = async (req: Request, res: Response) => {
  const { title } = req.body;
  const { id } = req.user as reqInterface;
  try {
    const existingFolderName = await folderRepository.findOneBy({
      title,
    });
    if (existingFolderName) {
      return res.status(409).send({ message: "Existing Folder Name " });
    }
    const folder = folderRepository.create({
      title,
      userId: id,
    });

    const savedFolder = await folderRepository.save(folder);

    if (!savedFolder) {
      return res.status(404).json({ message: "error in saving Folder" });
    }
    return res
      .status(201)
      .send({ message: ` Folder Created successfully ..`, savedFolder });
  } catch (error) {
    console.error(error);
  }
};

export const deleteFolderService = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const folder = await folderRepository.findOneBy({
      id,
    });
    if (!folder) {
      res.status(404).send({ message: "Folder Not Found" });
    }

    await folderRepository.delete({ id });

    return folder;
  } catch (error) {
    console.error(error);
  }
};

export const updateFolderService = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;
  // Check if the user exists
  let folder = await folderRepository.findOneBy({ id });
  if (!folder) {
    return res.status(404).json({ message: "Folder not found" });
  }
  // Update the user profile
  folder.title = title;
  const savedFolder = await folderRepository.save(folder);
  return res
    .status(200)
    .json({ message: "User profile updated successfully", savedFolder });
};
