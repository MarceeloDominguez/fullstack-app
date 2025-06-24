import { Router } from "express";
import { ReminderController } from "../controllers/reminderController.js";
import {
  createReminderSchema,
  updateReminderSchema,
} from "../schemas/reminderSchema.js";
import { validateData } from "../middleware/validationMiddleware.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.get("/all", ReminderController.getAllReminders);
router.get("/:id", ReminderController.getReminderById);
router.get("/", authMiddleware, ReminderController.getRemindersByUserId);
router.post(
  "/",
  authMiddleware,
  validateData(createReminderSchema),
  ReminderController.createReminder
);
router.patch(
  "/:id",
  validateData(updateReminderSchema),
  ReminderController.updateReminder
);
router.delete("/:id", ReminderController.deleteReminder);

export default router;
