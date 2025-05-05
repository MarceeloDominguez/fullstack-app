import db from "../config/db.js";

export async function up() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS reminders (
        id SERIAL PRIMARY KEY,
        reminder VARCHAR(255) NOT NULL,
        notes TEXT,
        completed BOOLEAN DEFAULT FALSE,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Reminders table created successfully.");
  } catch (error) {
    console.log("Error creating reminders table:", error);
  }
}

export async function down() {
  try {
    await db.query("DROP TABLE IF EXISTS reminders");
    console.log("Reminders table dropped successfully.");
  } catch (error) {
    console.log("Error dropping reminders table:", error);
  }
}

up();
