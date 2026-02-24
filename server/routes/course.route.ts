import { uploadCourse } from "../controllers/course.controller";
import express from "express";
import { isAutheticated } from "../middleware/auth";
const courseRouter = express.Router();

courseRouter.post(
  "/create-course",
  isAutheticated,
//   authorizeRoles("admin"),
  uploadCourse
);

export default courseRouter;