import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

  async loginUser({ email, password }) {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "48h",
      }
    );

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  },
};
