import { UserService } from "../services/userService.js";

export const UserController = {
  async registerUser(req, res) {
    try {
      const newUser = await UserService.registerUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      console.log(error);
    }
  },
};
