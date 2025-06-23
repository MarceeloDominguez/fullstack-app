import db from "../config/db.js";

export const ReminderModel = {
  async getAllReminders() {
    const result = await db.query(
      "SELECT * FROM reminders ORDER BY created_at DESC"
    );
    return result.rows;
  },

  async findById(id) {
    const result = await db.query("SELECT * FROM reminders WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  },

  async getRemindersByUserId(userId) {
    const result = await db.query(
      "SELECT * FROM reminders WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );
    return result.rows;
  },

  async createReminder({ reminder, notes, userId, importance }) {
    const result = await db.query(
      "INSERT INTO reminders (reminder, notes, user_id, importance) VALUES ($1, $2, $3, $4) RETURNING *",
      [reminder, notes, userId, importance]
    );
    return result.rows[0];
  },

  async updateReminder(query, values) {
    const result = await db.query(query, values);
    return result.rows[0];
  },

  async deleteReminder(id) {
    const result = await db.query("DELETE FROM reminders WHERE id = $1", [id]);
    return result.rowCount;
  },
};
