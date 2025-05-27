import express from "express";
import reminderRoutes from "./routes/reminderRoutes.js";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/reminders", reminderRoutes);
app.use("/users", userRoutes);

// Error handling middleware
app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
