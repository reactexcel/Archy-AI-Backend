import { Request, Response } from "express";
import {
  createProjectService,
  deleteProjectService,
  getAllProjectService,
  
  getProjectService,
  updateProjectService,
} from "../services/project.services";
import { reqInterface } from "../interfaces/req.interface";
import { filterInterface } from "../interfaces/filter.interface";

export const createProject = async (req: Request, res: Response) => {
  try {
    const { title, isShared, isFavourite } = req.body;
    const { id } = req.user as reqInterface;
    const image = req.file?.filename || "";

    let response = await createProjectService(
      title,
      id,
      image,
      isShared,
      isFavourite
    );
    res.status(201).json({
      message: "Saved Project successfully",
      data: response,
    });
  } catch (error: unknown) {
    if (typeof error === "object" && error) {
      if ("message" in error)
        throw new Error(error?.message as unknown as string);
    }
    throw new Error("Internal Server error");
  }
};



// export const getAllFavouriteProject = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const response = await getAllFavouriteProjectService(id);
//     res.status(200).json({
//       message: "",
//       data: response,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       error: error.message,
//     });
//   }
// };

// export const getAllSharedProject = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const response = await getAllSharedProjectService(id);
//     res.status(200).json({
//       message: "",
//       data: response,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       error: error.message,
//     });
//   }
// };

// export const getAllProject = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const response = await getAllProjectService(id);
//     res.status(200).json({
//       message: "Project",
//       data: response,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       error: error.message,
//     });
//   }
// };

export const getAllProjectByUserId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { isShared, isFavourite } = req.query;

    let filters = { userId: id } as filterInterface;
    if (isShared !== undefined) {
      filters.isShared = isShared === 'true';
    }
    if (isFavourite !== undefined) {
      filters.isFavourite = isFavourite === 'true';
    }
    const response = await getAllProjectService(filters);
    res.status(200).json({
      message: "",
      data: response,
    });
  } catch (error: unknown) {
    if (typeof error === "object" && error) {
      if ("message" in error)
        throw new Error(error?.message as unknown as string);
    }
    throw new Error("Internal Server error");
  }
};

export const getProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await getProjectService(id);
    res.status(200).json({
      message: "Project",
      data: response,
    });
  } catch (error: unknown) {
    if (typeof error === "object" && error) {
      if ("message" in error)
        throw new Error(error?.message as unknown as string);
    }
    throw new Error("Internal Server error");
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await deleteProjectService(id);
    res.status(200).json({
      message: "Deleted Project successfully",
      data: response,
    });
  } catch (error: unknown) {
    if (typeof error === "object" && error) {
      if ("message" in error)
        throw new Error(error?.message as unknown as string);
    }
    throw new Error("Internal Server error");
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, isShared, isFavourite } = req.body;
    const fileName = req.file?.filename || "";
    const project = await updateProjectService(
      id,
      title,
      fileName,
      isFavourite,
      isShared
    );
    res.status(200).json({
      message: "Updated Project successfully",
      data: project,
    });
  } catch (error: unknown) {
    if (typeof error === "object" && error) {
      if ("message" in error)
        throw new Error(error?.message as unknown as string);
    }
    throw new Error("Internal Server error");
  }
};
