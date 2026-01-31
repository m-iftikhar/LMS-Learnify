import express from "express";
const userRouter = express.Router();
import { registrationUser,activateUser } from "../controllers/user.controller";

userRouter.post("/registration", registrationUser);
userRouter.post("/activate",activateUser);


export default userRouter;
