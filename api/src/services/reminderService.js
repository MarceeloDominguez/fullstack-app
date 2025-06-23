import { ReminderModel } from "../model/reminderModel.js";
import CustomError from "../util/CustomError.js";
import ERROR_MESSAGES from "../constants/errorMessages.js";

export const ReminderService = {
  async getAllReminders() {
    return ReminderModel.getAllReminders();
  },

  async getReminderById(id) {
    const reminder = await ReminderModel.findById(id);
    if (!reminder) throw new CustomError(ERROR_MESSAGES.NOT_FOUND, 404);
    return reminder;
  },

  async getRemindersByUserId(userId) {
    return await ReminderModel.getRemindersByUserId(userId);
  },

  async createReminder(reminderData) {
    const { reminder, notes, userId, importance = "low" } = reminderData;

    const sanitizedReminder = {
      reminder: reminder?.trim(),
      notes: notes?.trim(),
      userId,
      importance,
    };

    const createdReminder = await ReminderModel.createReminder(
      sanitizedReminder
    );
    return createdReminder;
  },

  async updateReminder(id, reminderData) {
    const fields = Object.keys(reminderData);
    const setClause = fields.map((field, index) => `${field} = $${index + 1}`);
    const values = Object.values(reminderData);
    values.push(id);

    const query = `UPDATE reminders SET ${setClause.join(", ")} WHERE id = $${
      values.length
    } RETURNING *`;

    const updatedReminder = await ReminderModel.updateReminder(query, values);
    if (!updatedReminder) throw new CustomError(ERROR_MESSAGES.NOT_FOUND, 404);
    return updatedReminder;
  },

  async deleteReminder(id) {
    const authenticatedUserId = 1;

    const reminder = await ReminderModel.findById(id);

    if (!reminder) {
      throw new CustomError(ERROR_MESSAGES.NOT_FOUND, 404);
    }

    if (reminder.user_id !== authenticatedUserId) {
      throw new CustomError(ERROR_MESSAGES.FORBIDDEN, 403);
    }

    const deletedReminder = await ReminderModel.deleteReminder(id);

    if (deletedReminder === 0) {
      throw new CustomError(ERROR_MESSAGES.INTERNAL_SERVER_ERROR, 500);
    }

    return { message: `Reminder with ID ${id} deleted successfully` };
  },
};
