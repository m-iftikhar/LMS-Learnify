import express from "express";
const userRouter = express.Router();
import { registrationUser,activateUser, loginUser,logoutUser, updateAccessToken } from "../controllers/user.controller";
import { isAutheticated}  from "../middleware/auth";


userRouter.post("/registration", registrationUser);
userRouter.post("/activate",activateUser);
userRouter.post("/login",loginUser);
userRouter.post("/logout", isAutheticated, logoutUser);
userRouter.get("/refresh", updateAccessToken);
userRouter.post("/refresh", updateAccessToken);


export default userRouter;
