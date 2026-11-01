import { Request, Response } from "express";
import { getAllProjects, addProject, updateProject, deleteProject} from "../services/projectService";
import { isValidProjectName } from "../utils/validateProject";


export const getProjects = (_req: Request, res: Response) => {
  const projects = getAllProjects();

  res.json({ projects });
};

export const createProject = (req: Request, res: Response) => {
  const { name } = req.body;

  if (!isValidProjectName(name)) {
  res.status(400).json({
    message: "Project name must be a non-empty string of at most 100 characters",
  });
  return;
}

  const project = addProject(name.trim());

  res.status(201).json({
    message: "Project created successfully",
    project,
  });
};

export const editProject = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({
      message: "Invalid project ID",
    });
    return;
  }

  if (!isValidProjectName(name)) {
  res.status(400).json({
    message: "Project name must be a non-empty string of at most 100 characters",
  });
  return;
}

  const project = updateProject(id, name.trim());

  if (!project) {
    res.status(404).json({
      message: "Project not found",
    });
    return;
  }

  res.json({
    message: "Project updated successfully",
    project,
  });
};

export const removeProject = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({
      message: "Invalid project ID",
    });
    return;
  }

  const project = deleteProject(id);

  if (!project) {
    res.status(404).json({
      message: "Project not found",
    });
    return;
  }

  res.json({
    message: "Project deleted successfully",
    project,
  });
};

