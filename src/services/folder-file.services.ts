import AppDataSource from "../config/database.config";
import { Request, Response } from "express";
import { reqInterface } from "../interfaces/req.interface";
import { FolderFile } from "../entity/folder-file.model";

const folderFileRepository = AppDataSource.getRepository(FolderFile);

export const createFolderFileService = async (req: Request, res: Response) => {
  const { name,folderId } = req.body;
  try {
    const existingFolderFileName = await folderFileRepository.findOneBy({
      name,
    });
    if (existingFolderFileName) {
      return res.status(409).send({ message: "Existing Folder Name " });
    }
    const folderFile = folderFileRepository.create({
      name,
      folderId
    });
console.log(folderFile)
    const savedFolderFile = await folderFileRepository.save(folderFile);
console.log(savedFolderFile)
    if (!savedFolderFile) {
      return res.status(404).json({ message: "error in saving Folder" });
    }
    return res
      .status(201)
      .send({ message: ` Folder Created successfully ..`, savedFolderFile });
  } catch (error) {
    console.error(error);
  }
};

export const deleteFolderFileService = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const folderFile = await folderFileRepository.findOneBy({
      id:id,
    });
    if (!folderFile) {
      res.status(404).send({ message: "Folder File Not Found" });
    }

    await folderFileRepository.delete({ id });

    return folderFile;
  } catch (error) {
    console.error(error);
  }
};

export const updateFolderFileService = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  // Check if the user exists
  let folderFile = await folderFileRepository.findOneBy({ id });
  if (!folderFile) {
    return res.status(404).json({ message: "Folder not found" });
  }
  // Update the user profile
  folderFile.name = name;
  const savedFolderFile = await folderFileRepository.save(folderFile);
  return res
    .status(200)
    .json({ message: "User profile updated successfully", savedFolderFile });
};
