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

const start = async () => {    
    try {
        app.listen(8080, () => {
            console.log("Server is running on port 8080");
        });
    } catch (err) {
        console.log(err);
    }
}

start();
