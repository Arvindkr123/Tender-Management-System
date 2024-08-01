import { Router } from "express";
import {
  registerUserController,
  userLoginController,
  verifyTokenController,
} from "../controllers/auth.controllers.js";

const router = Router();

router.post("/register", registerUserController);
router.post("/login", userLoginController);
router.get("/verfiyToken", verifyTokenController);

export default router;
