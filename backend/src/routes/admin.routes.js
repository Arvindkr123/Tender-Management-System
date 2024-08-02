import { Router } from "express";
import authenticateUser, {
  authrizeAdmin,
} from "../middleware/verifyToken.middleware.js";
import { addTenderController } from "../controllers/admin.controllers.js";

const router = Router();

router.post(
  "/add-tender",
  authenticateUser,
  authrizeAdmin,
  addTenderController
);

export default router;
