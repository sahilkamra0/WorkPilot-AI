

import express from "express";
import cors from "cors";
import healthRoutes from "./routes/healthRoutes";
import projectRoutes from "./routes/projectRoutes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/health", healthRoutes);
app.use("/projects", projectRoutes);

app.get("/", (_req, res) => {
  res.json({ message: "WorkPilot AI API is running" });
});

app.use(errorHandler);

export default app;
