import AppDataSource from "../config/database.config";
import { FolderFile } from "../entity/folder-file.model";
import { filterInterface } from "../interfaces/filter.interface";
import fs from "fs";
import path from "path";
const dirpath = "/root/archy-ai/Archy-AI-Backend/src/";
const folderFileRepository = AppDataSource.getRepository(FolderFile);

export const createFolderFileService = async (
  name: string,
  folderId: string
) => {
  try {
    const folderFile = folderFileRepository.create({
      name,
      folderId,
    });
    const savedFolderFile = await folderFileRepository.save(folderFile);
    return savedFolderFile;
  }catch (error) {
    if(error instanceof Error)
    throw new Error(`error ${error.message}`);
  }
};

export const deleteFolderFileService = async (id: string) => {
  try {
    const folderFile = await folderFileRepository.findOneBy({
      id: id,
    });
    if (!folderFile) {
      throw new Error("Folder File Not Found");
    }
    const filePath = path.join(dirpath, "uploads", folderFile.name);
    await fs.promises.unlink(filePath);
    await folderFileRepository.delete({ id });

    return folderFile;
  }catch (error) {
    if(error instanceof Error)
    throw new Error(`error ${error.message}`);
  }
};

export const getFolderFileService = async (id: string) => {
  try {
    const folderFile = await folderFileRepository.findOneBy({
      id: id,
    });
    if (!folderFile) {
      throw new Error("Folder File Not Found");
    }
    return folderFile;
  }catch (error) {
    if(error instanceof Error)
    throw new Error(`error ${error.message}`);
  }
};

export const getAllFolderFileService = async (folderId: string) => {
  try {
    const folder = await folderFileRepository.findBy({ folderId });
    if (folder.length === 0) {
      throw new Error("No data Found");
    }
    return folder;
  }catch (error) {
    if(error instanceof Error)
    throw new Error(`error ${error.message}`);
  }
};

export const updateFolderFileService = async (id: string, name: string) => {
  try {
    let folderFile = await folderFileRepository.findOneBy({ id: id });
    if (!folderFile) {
      throw new Error("Folder File Not Found");
    }
    folderFile.name = name || folderFile.name;
    const savedFolderFile = await folderFileRepository.save(folderFile);
    return savedFolderFile;
  }catch (error) {
    if(error instanceof Error)
    throw new Error(`error ${error.message}`);
  }
};
