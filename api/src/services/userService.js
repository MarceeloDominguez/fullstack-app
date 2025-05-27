import bcrypt from "bcrypt";
import { UserModel } from "../model/userModel.js";

export const UserService = {
  async registerUser(userData) {
    const { name, email, password } = userData;

    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }

    const existingUser = await UserModel.findByEmail(email);

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.createUser({
      name,
      email,
      password: hashedPassword,
    });

    delete newUser.password;

    return newUser;
  },
};
