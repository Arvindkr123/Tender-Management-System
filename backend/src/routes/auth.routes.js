import { Router } from "express";
import {
  registerUserController,
  userLoginController,
  logoutCurrentUserController,
  getCurrentUserProfileController,
} from "../controllers/auth.controllers.js";
import authenticateUser from "../middleware/verifyToken.middleware.js";

const router = Router();

router.post("/register", registerUserController);
router.post("/login", userLoginController);
router.post("/logout", logoutCurrentUserController);
router.get("/profile", authenticateUser, getCurrentUserProfileController);

export default router;
