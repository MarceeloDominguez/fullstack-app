import { z } from "zod";

const importanceEnum = z.enum(["low", "medium", "high"]);

export const reminderSchema = z.object({
  id: z.number(),
  reminder: z.string().min(1, "Reminder is required").max(255),
  notes: z.string().optional(),
  completed: z.boolean().optional().default(false),
  importance: importanceEnum.optional().default("low"),
  userId: z.number(),
  createdAt: z.string().datetime(),
});

export const createReminderSchema = reminderSchema.omit({
  id: true,
  createdAt: true,
  completed: true,
});

export const updateReminderSchema = z.object({
  reminder: z.string().min(1, "Reminder is required").max(255).optional(),
  notes: z.string().nullable().optional(),
  completed: z.boolean().optional(),
  importance: importanceEnum.optional(),
});
