import { Request, Response } from "express";

export const getHealth = (_req: Request, res: Response) => {
  res.json({
    status: "OK",
    message: "WorkPilot AI backend is healthy",
  });
};