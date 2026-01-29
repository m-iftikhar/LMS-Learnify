require("dotenv").config();
import express,{ Request,Response,NextFunction } from 'express';
export const app = express();
import cookieParser from 'cookie-parser';
import {ErrorMiddleware} from './middleware/error';
import cors from 'cors';




app.use(cors({
    origin: process.env.ORIGIN,
}));


app.use(express.json({ limit: '50mb' }));

app.use(cookieParser());


// test route
app.get("/test", (req:Request, res:Response, next:NextFunction) => {
    res.status(200).json({
        message: "Server is running!",
        success: true
    });
});

app.use(ErrorMiddleware);







