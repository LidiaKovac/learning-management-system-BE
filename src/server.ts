import { NextFunction, Router } from "express";
import { Request } from "express-serve-static-core";
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()
//do not declare db


app.use(cors({
    origin: [
      process.env.FE_URI as string,
      //"http://localhost:3002/",
      //"http://localhost:3000/",
    ],
    credentials: true,
    exposedHeaders: ["set-cookie"],
    
  })
);
app.use(express.json())
app.use(require("helmet")())
app.options('*', cors(
  {
    origin: [
      process.env.FE_URI as string,
      //"http://localhost:3002/",
      //"http://localhost:3000/",
    ],
    credentials: true,
    exposedHeaders: ["set-cookie"],
    
  }
))


import userRouter from "./services/users";
import loginRouter from "./services/login";
import filesRouter from "./services/files";
import eventsRouter from "./services/events";
import classRouter from "./services/classes";
import hwRouter from "./services/homework";
import todoRouter from "./services/todo";

app.use("/user", userRouter)
app.use("/login", loginRouter)
app.use("/files", filesRouter)
app.use("/event", eventsRouter)
app.use("/class", classRouter)
app.use("/homework", hwRouter)
app.use("/todo", todoRouter)



app.use(cookieParser())

export default app