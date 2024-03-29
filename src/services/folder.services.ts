import AppDataSource from "../config/database.config";
import { Folder } from "../entity/folder.model";
import { Request, Response } from "express";
import { filterInterface } from "../interfaces/filter.interface";

const folderRepository = AppDataSource.getRepository(Folder);

export const createFolderService = async (
  title: string,
  isShared: boolean,
  isFavourite: boolean,
  id: string
) => {
  try {
    
    const folder = folderRepository.create({
      title,
      userId: id,
      isShared,
      isFavourite,
    });
    const savedFolder = await folderRepository.save(folder);
    return savedFolder;
  } catch (error: any) {
      throw new Error(`error ${error.message}`)
  }
};

export const getFolderService = async (id: string) => {
  try {
    const folder = await folderRepository.findOneBy({
      id: id,
    });
    if (!folder) {
      throw new Error("Folder Not Found");
    }
    return folder;
  } catch (error: any) {
      throw new Error(`error ${error.message}`)
  }
};

export const getAllFolderByUserIdService = async (filters:filterInterface) => {
  try {
    const folder = await folderRepository.findBy(filters);
    if (folder.length === 0) {
      throw new Error("No data Found");
    }
    return folder;
  } catch (error: any) {
    throw new Error(`error ${error.message}`)
  }
};

export const deleteFolderService = async (id: string) => {
  try {
    const folder = await folderRepository.findOneBy({
      id,
    });
    if (!folder) {
      throw new Error("Folder Not Found");
    }
    await folderRepository.delete({ id });
    return folder;
  } catch (error: any) {
      throw new Error(`error ${error.message}`)
  }
};

export const updateFolderService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, isShared, isFavourite } = req.body;
    let folder = await folderRepository.findOneBy({ id });
    if (!folder) {
      throw new Error("Project Not Found");
    }
    folder.title = title || folder.title;
    folder.isShared = isShared || folder.isShared;
    folder.isFavourite = isFavourite || folder.isFavourite;
    const savedFolder = await folderRepository.save(folder);
    return savedFolder;
  } catch (error: any) {
      throw new Error(`error ${error.message}`)
  }
};
