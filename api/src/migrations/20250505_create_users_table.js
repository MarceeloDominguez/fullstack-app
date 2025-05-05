import db from "../config/db.js";

export async function up() {
  try {
    await db.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL UNIQUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
    console.log("Users table created successfully.");
  } catch (error) {
    console.log("Error creating users table:", error);
  }
}

export async function down() {
  try {
    await db.query(`DROP TABLE IF EXISTS users`);
    console.log("Users table dropped successfully.");
  } catch (error) {
    console.log("Error dropping users table:", error);
  }
}

up();
