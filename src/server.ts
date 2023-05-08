import { NextFunction, Router } from "express";
import { Request } from "express-serve-static-core";
import express from "express"
import cors from "cors"

const app = express()
//do not declare db
console.log("Initializing your API! ⚙️")

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
import hwRouter from "./services/homework";
import todoRouter from "./services/todo";
import classRouter from "./services/classes";

app.use("/user", userRouter)
app.use("/login", loginRouter)
app.use("/files", filesRouter)
app.use("/event", eventsRouter)
app.use("/homework", hwRouter)
app.use("/todo", todoRouter)
app.use("/class", classRouter)




export default app