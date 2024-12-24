import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnect } from "./Database/dbConnection.js";
import messageRouter from "./Router/messageRouter.js";
import {errorMiddleware} from "./Middlewares/errorMiddleware.js"
import userRouter from "./Router/userRouter.js"
import appointmentRouter from "./Router/appointmentRouter.js"

const app = express();
config({ path: "./Config/config.env" });

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter)

dbConnect();

app.use(errorMiddleware)

export default app;
