import { Router } from "express";
import authenticateUser, {
  authrizeAdmin,
} from "../middleware/verifyToken.middleware.js";
import {
  addTenderController,
  getAllTenderController,
  updateSingleTenderController,
  getAllBidsByUserController,
} from "../controllers/admin.controllers.js";

const router = Router();

router.put(
  "/update-tender/:id",
  authenticateUser,
  updateSingleTenderController
);

router.post(
  "/add-tender",
  authenticateUser,
  authrizeAdmin,
  addTenderController
);

router.get("/get-all-tenders", getAllTenderController);
router.get("/get-all-userbids", getAllBidsByUserController);

export default router;
