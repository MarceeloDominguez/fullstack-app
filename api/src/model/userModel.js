import db from "../config/db.js";

export const UserModel = {
  async createUser({ name, email, password }) {
    const result = await db.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at",
      [name, email, password]
    );

    return result.rows[0];
  },
  async findByEmail(email) {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    return result.rows[0];
  },
};
