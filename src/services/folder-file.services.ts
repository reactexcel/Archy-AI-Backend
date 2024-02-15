import AppDataSource from "../config/database.config";
import { FolderFile } from "../entity/folder-file.model";
import { filterInterface } from "../interfaces/filter.interface";

const folderFileRepository = AppDataSource.getRepository(FolderFile);

export const createFolderFileService = async (
  name: string,
  folderId: string,
  isShared: boolean,
  isFavourite: boolean
) => {
  try {
    const existingFolderFileName = await folderFileRepository.findOneBy({
      name,
      folderId,
    });
    if (existingFolderFileName) {
      throw new Error("Folder File already exists");
    }
    const folderFile = folderFileRepository.create({
      name,
      folderId,
      isShared,
      isFavourite,
    });
    const savedFolderFile = await folderFileRepository.save(folderFile);
    return savedFolderFile;
  } catch (error: unknown) {
    if (typeof error === "object" && error) {
      if ("message" in error)
        throw new Error(error?.message as unknown as string);
    }
    throw new Error("Internal Server error");
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
    await folderFileRepository.delete({ id });
    return folderFile;
  } catch (error: unknown) {
    if (typeof error === "object" && error) {
      if ("message" in error)
        throw new Error(error?.message as unknown as string);
    }
    throw new Error("Internal Server error");
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
  } catch (error: unknown) {
    if (typeof error === "object" && error) {
      if ("message" in error)
        throw new Error(error?.message as unknown as string);
    }
    throw new Error("Internal Server error");
  }
};

export const getAllFolderFileService = async (filters:filterInterface) => {
  try {
    const folder = await folderFileRepository.findBy(filters);
    if (folder.length === 0) {
      throw new Error("No data Found");
    }
    return folder;
  } catch (error: unknown) {
    if (typeof error === "object" && error) {
      if ("message" in error)
        throw new Error(error?.message as unknown as string);
    }
    throw new Error("Internal Server error");
  }
};

export const updateFolderFileService = async (
  id: string,
  name: string,
  isShared: boolean,
  isFavourite: boolean
) => {
  try {
    let folderFile = await folderFileRepository.findOneBy({ id: id });
    if (!folderFile) {
      throw new Error("Folder File Not Found");
    }
    folderFile.name = name || folderFile.name;
    folderFile.isShared = isShared || folderFile.isShared;
    folderFile.isFavourite = isFavourite || folderFile.isFavourite;
    const savedFolderFile = await folderFileRepository.save(folderFile);
    return savedFolderFile;
  } catch (error: unknown) {
    if (typeof error === "object" && error) {
      if ("message" in error)
        throw new Error(error?.message as unknown as string);
    }
    throw new Error("Internal Server error");
  }
};
