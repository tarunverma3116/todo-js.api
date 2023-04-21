import express from "express";
import authenticate from "../middleware/authentication.js";
import { getUser, createUser, loginUser } from "../services/userServices.js";

const userRouter = express.Router();

userRouter.route("/").get(authenticate,getUser);
userRouter.route("/signup").post(createUser);
userRouter.route("/login").post(loginUser);

export default userRouter;
