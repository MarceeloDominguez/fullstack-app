import { ReminderModel } from "../model/reminderModel.js";

export const ReminderService = {
  async getAllReminders() {
    return ReminderModel.getAllReminders();
  },

  async getReminderById(id) {
    const reminder = await ReminderModel.findById(id);
    if (!reminder) {
      throw new Error(`Reminder with ID ${id} not found`);
    }
    return reminder;
  },

  async createReminder(reminderData) {
    const { reminder, notes, userId } = reminderData;

    const sanitizedReminder = {
      reminder: reminder?.trim(),
      notes: notes?.trim(),
      userId,
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
    if (!updatedReminder) {
      throw new Error(`Reminder with ID ${id} not found`);
    }
    return updatedReminder;
  },

  async deleteReminder(id) {
    const authenticatedUserId = 3;

    const reminder = await ReminderModel.findById(id);

    if (!reminder) {
      throw new Error(`Reminder with ID ${id} not found`);
    }

    if (reminder.user_id !== authenticatedUserId) {
      throw new Error("You are not authorized to delete this reminder");
    }

    const deletedReminder = await ReminderModel.deleteReminder(id);

    if (!deletedReminder) {
      throw new Error(`Failed to delete reminder with ID ${id}`);
    }

    return { message: `Reminder with ID ${id} deleted successfully` };
  },
};
