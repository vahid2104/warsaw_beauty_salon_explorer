import { Router } from "express";
import {
  getSalonById,
  getSalons,
  updateSalon,
} from "../controllers/salons.controller";

const router = Router();

router.get("/", getSalons);
router.get("/:id", getSalonById);
router.put("/:id", updateSalon);

export default router;