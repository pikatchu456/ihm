import { Router } from "express";
import {
  getPassager,
  getPassagerById,
  createPassager,
  deletePassager,
  updatePassager,
  checkCode,
} from "../controllers/passager.controller.js";

const passager_router = Router();

passager_router.get("/", getPassager);
passager_router.get("/:id", getPassagerById);
passager_router.post("/", createPassager);
passager_router.delete("/:id", deletePassager);
passager_router.put("/:id", updatePassager);
passager_router.post("/phone", checkCode);

export default passager_router;
