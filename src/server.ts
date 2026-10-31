
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler";
import healthRoutes from "./routes/healthRoutes";
import projectRoutes from "./routes/projectRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/health", healthRoutes);
app.use("/projects", projectRoutes);

app.get("/", (req, res) => {
  res.json({ message: "WorkPilot AI API is running" });
});



const PORT = process.env.PORT || 8000;

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});