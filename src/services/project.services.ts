import AppDataSource from "../config/database.config";
import { Project } from "../entity/project.model";
import fs from "fs";
import { filterInterface } from "../interfaces/filter.interface";
import { Favourite } from "../entity/favourite.model";

const projectRepository = AppDataSource.getRepository(Project);
const favouriteRepository = AppDataSource.getRepository(Favourite);

export const createProjectService = async (
  title: string,
  id: string,
  image: string,
  isShared: boolean,
  isFavourite: boolean
) => {
  try {
    const Project = projectRepository.create({
      title,
      userId: id,
      image,
      isShared,
      isFavourite,
    });
    const savedProject = await projectRepository.save(Project);
    return savedProject;
  } catch (error: any) {
    throw new Error(`error ${error.message}`);
  }
};

export const getProjectService = async (id: string) => {
  try {
    const project = await projectRepository.findOneBy({
      id,
    });
    if (!project) {
      throw new Error("Project Not Found");
    }
    return project;
  } catch (error) {
    console.error(error);
  }
};

export const getAllProjectService = async (filters: any) => {
  try {
    let folder;
    if (filters.isRecent == true) {
      folder = await projectRepository.find({
        where: { userId: filters.userId },
        order: {
          createdAt: "DESC",
        },
      });
    } else {
      folder = await projectRepository.findBy(filters);
    }
    if (folder.length === 0) {
      throw new Error("No data Found");
    }
    return folder;
  } catch (error: any) {
    throw new Error(`error ${error.message}`);
  }
};

export const deleteProjectService = async (id: string) => {
  try {
    const project = await projectRepository.findOneBy({
      id,
    });
    if (!project) {
      throw new Error("Project not found");
    }

    await projectRepository.delete({ id });

    return project;
  } catch (error: any) {
    throw new Error(`error ${error.message}`);
  }
};

export const updateProjectService = async (
  id: string,
  title: string,
  fileName: string,
  isFavourite: boolean,
  isShared: boolean
) => {
  try {
    let project = await projectRepository.findOneBy({ id });
    if (!project) {
      throw new Error("Project not found");
    }

    if (fileName) {
      if (fs.existsSync(project.image)) fs.unlinkSync(project.image);
      project.image = fileName;
    }
    project.title = title || project.title;
    project.isShared = isShared || project.isShared;
    project.isFavourite = isFavourite || project.isFavourite;
    return await projectRepository.save(project);
  } catch (error: any) {
    throw new Error(`error ${error.message}`);
  }
};

export const addOrRemoveProjectToFavouriteByIdService = async (projectId:string ) => {
try{
  let favourite = await favouriteRepository.findOne({where:{ projectId} });
  console.log(projectId,favourite)
  if(favourite!==null){
    await favouriteRepository.delete({ projectId });
  }else{
    favourite= favouriteRepository.create({projectId});
   return await favouriteRepository.save(favourite);
  }
    
}catch(error:any){
  throw new Error(`error ${error.message}`);
}
}
