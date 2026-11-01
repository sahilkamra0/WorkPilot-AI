
import { Router } from "express";
import { registerUser, loginUser, getCurrentUser, logoutUser } from "../controllers/userController";
import { authenticateUser } from "../middleware/authMiddleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authenticateUser, getCurrentUser);
router.post("/logout", authenticateUser, logoutUser);

export default router;
