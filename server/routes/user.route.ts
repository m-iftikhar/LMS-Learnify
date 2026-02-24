import express from "express";
const userRouter = express.Router();
import { registrationUser,activateUser, loginUser,logoutUser, updateAccessToken, getUserInfo,socialAuth,updateUserInfo, updatePassword, updateProfilePicture} from "../controllers/user.controller";
import { authorizeRoles, isAutheticated}  from "../middleware/auth";


userRouter.post("/registration", registrationUser);
userRouter.post("/activate",activateUser);
userRouter.post("/login",loginUser);
userRouter.post("/logout",isAutheticated, logoutUser);
userRouter.get("/refresh", updateAccessToken);
userRouter.get("/me",isAutheticated, getUserInfo);
userRouter.post("/social-auth", socialAuth);
userRouter.put("/update-user-info", isAutheticated, updateUserInfo);
userRouter.put("/update-user-password", isAutheticated, updatePassword);
userRouter.put("/update-user-avatar", isAutheticated, updateProfilePicture);

export default userRouter;
