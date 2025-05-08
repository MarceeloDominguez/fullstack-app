import express from "express";
import reminderRoutes from "./routes/reminderRoutes.js";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/reminders", reminderRoutes);

// Error handling middleware
app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
