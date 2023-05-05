import express from "express";
import authenticate from "../middleware/authentication.js";
import {
  getSubTasks,
  getSubTask,
  completeSubTask,
  deleteSubTask,
  createSubTask,
} from "../services/subTaskServices.js";

const subTaskRouter = express.Router();

subTaskRouter.route("/all/:id").get(authenticate, getSubTasks);
subTaskRouter
  .route("/:id")
  .get(authenticate, getSubTask)
  .post(authenticate, createSubTask);
subTaskRouter.route("/delete/:id").delete(authenticate, deleteSubTask);
subTaskRouter.route("/complete/:id").put(authenticate, completeSubTask);

export default subTaskRouter;
