import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/tasks.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);

app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: "Something went wrong",
    error: err.message,
    });
});

const PORT = process.env.PORT || 8000;

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
