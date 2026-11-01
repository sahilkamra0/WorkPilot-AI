import { Router } from "express";
import { getProjects, createProject,editProject, removeProject} from "../controllers/projectController";

const router = Router();

router.get("/", getProjects);
router.post("/", createProject);
router.patch("/:id", editProject);
router.delete("/:id", removeProject);

export default router;