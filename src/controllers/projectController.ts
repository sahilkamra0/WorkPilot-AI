import { Request, Response } from "express";

export const getProjects = (_req: Request, res: Response) => {
  res.json({
    projects: [
      { id: 1, name: "WorkPilot AI" },
      { id: 2, name: "My First Project" },
    ],
  });
};

export const createProject = (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name || typeof name !== "string" || !name.trim()) {
    res.status(400).json({
      message: "Project name is required",
    });
    return;
  }

  res.status(201).json({
    message: "Project created successfully",
    project: {
      id: 3,
      name: name.trim(),
    },
  });
};