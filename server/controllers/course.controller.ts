import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import { createCourse } from "../services/course.service";
import CourseModel from "../models/course.model"
import { redis } from "../utils/redis";

export const uploadCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;
      if (thumbnail) {
        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "courses",
        });

        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
      createCourse(data, res, next);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// edit course
export const editCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      const thumbnail = data.thumbnail;

      const courseId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

      const courseData = await CourseModel.findById(courseId) as any;

     // upload new thumbnail if it is NOT https
if (thumbnail && !thumbnail.startsWith("https")) {

  // destroy only if previous thumbnail exists
  if (courseData?.thumbnail?.public_id) {
    await cloudinary.v2.uploader.destroy(courseData.thumbnail.public_id);
  }

  const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
    folder: "courses",
  });

  data.thumbnail = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };
}

if (thumbnail && thumbnail.startsWith("https")) {
  data.thumbnail = courseData?.thumbnail;
}

      const course = await CourseModel.findByIdAndUpdate(
        courseId,
        {
          $set: data,
        },
        { new: true }
      );
      // await redis.del(courseId);
      await redis.set(courseId, JSON.stringify(course), "EX", 604800); // 7days
      res.status(201).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
