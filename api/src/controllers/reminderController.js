import { ReminderService } from "../services/reminderService.js";

export const ReminderController = {
  async getAllReminders(req, res, next) {
    try {
      const reminders = await ReminderService.getAllReminders();
      res.status(200).json(reminders);
    } catch (error) {
      next(error);
    }
  },

  async getRemindersByUserId(req, res, next) {
    try {
      //const userId = parseInt(req.params.userId, 10);
      const userId = req.user.id;

      const reminders = await ReminderService.getRemindersByUserId(userId);
      res.status(200).json(reminders);
    } catch (error) {
      next(error);
    }
  },

  async getReminderById(req, res, next) {
    try {
      const reminderId = parseInt(req.params.id, 10);

      const reminder = await ReminderService.getReminderById(reminderId);
      res.status(200).json(reminder);
    } catch (error) {
      next(error);
    }
  },

  async createReminder(req, res, next) {
    try {
      const userId = req.user.id;
      const newReminder = await ReminderService.createReminder({
        ...req.body,
        userId,
      });
      res.status(201).json(newReminder);
    } catch (error) {
      next(error);
    }
  },

  async updateReminder(req, res, next) {
    try {
      const reminderId = parseInt(req.params.id, 10);

      const updatedReminder = await ReminderService.updateReminder(
        reminderId,
        req.body
      );
      res.status(200).json(updatedReminder);
    } catch (error) {
      next(error);
    }
  },

  async deleteReminder(req, res, next) {
    try {
      const reminderId = parseInt(req.params.id, 10);
      const authenticatedUserId = req.user.id;

      const deletedReminder = await ReminderService.deleteReminder(
        reminderId,
        authenticatedUserId
      );
      res.status(200).json(deletedReminder);
    } catch (error) {
      next(error);
    }
  },
};
