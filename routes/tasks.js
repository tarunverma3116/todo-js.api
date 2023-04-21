import express from "express";
import authenticate from "../middleware/authentication.js";
import { createTask, getTasks, updateTask, completeTask, deleteTask } from "../services/taskServices.js";

const taskRouter = express.Router();

taskRouter.route("/").post(authenticate, createTask).get(authenticate, getTasks);
taskRouter.route("/update/:id").put(authenticate, updateTask)
taskRouter.route("/delete/:id").delete(authenticate, deleteTask);
taskRouter.route("/complete/:id").put(authenticate, completeTask);

export default taskRouter;

