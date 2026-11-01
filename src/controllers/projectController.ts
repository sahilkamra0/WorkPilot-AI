import { Request, Response } from "express";
import { getAllProjects, addProject, updateProject, deleteProject} from "../services/projectService";
import { isValidProjectName } from "../utils/validateProject";


export const getProjects = async (_req: Request, res: Response) => {
  const projects = await getAllProjects();
  res.json(projects);
};

export const createProject = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!isValidProjectName(name)) {
    return res.status(400).json({
      message: "Project name must be a non-empty string of at most 100 characters",
    });
  }

  const project = await addProject(name);

  res.status(201).json({
    message: "Project created successfully",
  project,
  })
};


export const editProject = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      message: "Invalid project ID",
    });
  }

  if (!isValidProjectName(name)) {
    return res.status(400).json({
      message: "Project name must be a non-empty string of at most 100 characters",
    });
  }

  const project = await updateProject(id, name);

  if (!project) {
    return res.status(404).json({
      message: "Project not found",
    });
  }

  res.json({
    message: "project updated successfully",
    project,
  })
};

export const removeProject = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      message: "Invalid project ID",
    });
  }

  const project = await deleteProject(id);

  if (!project) {
    return res.status(404).json({
      message: "Project not found",
    });
  }

  res.json({
    message: "Project deleted successfully",
    project,
  });
};