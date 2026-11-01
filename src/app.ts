

import express from "express";
import cors from "cors";
import healthRoutes from "./routes/healthRoutes";
import projectRoutes from "./routes/projectRoutes";
import { errorHandler } from "./middleware/errorHandler";
import userRoutes from "./routes/userRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/health", healthRoutes);
app.use("/projects", projectRoutes);
app.use("/users", userRoutes);

app.get("/", (_req, res) => {
  res.json({ message: "WorkPilot AI API is running" });
});

app.use(errorHandler);

export default app;
