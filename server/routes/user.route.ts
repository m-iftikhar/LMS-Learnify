import express from "express";
const userRouter = express.Router();
import { registrationUser,activateUser, loginUser } from "../controllers/user.controller";

userRouter.post("/registration", registrationUser);
userRouter.post("/activate",activateUser);
userRouter.post("/login",loginUser);


export default userRouter;
