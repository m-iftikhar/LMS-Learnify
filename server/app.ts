import express from 'express';
export const app = express();
import cookieParser from 'cookie-parser';
import{ Request,Response,NextFunction } from 'express';
require('dotenv').config();
import cors from 'cors';



app.use(express.json({ limit: '50mb' }));

app.use(cookieParser());
app.use(cors({
    origin: process.env.ORIGIN,
}));

// test route
app.get("/test", (req:Request, res:Response, next:NextFunction) => {
    res.status(200).json({
        message: "Server is running!",
        success: true
    });
});



// unknown route.
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});




