import { NextFunction, Router } from "express";
import { Request } from "express-serve-static-core";
const express = require('express')
const cors = require('cors')
const cookieParser = require("cookie-parser")

const app = express()
//do not declare db


app.use(cors({
    origin: [
      process.env.FE_URI,
      //"http://localhost:3002/",
      //"http://localhost:3000/",
    ],
    //credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);
app.use(express.json())
app.use(require("helmet")())

const userRouter =  require("./services/users")
const loginRouter = require("./services/login")
const filesRouter = require("./services/files")
const eventsRouter = require("./services/events")
const classRouter = require("./services/classes")
const hwRouter = require("./services/homework")

app.use("/user", userRouter)
app.use("/login", loginRouter)
app.use("/files", filesRouter)
app.use("/event", eventsRouter)
app.use("/class", classRouter)
app.use("/homework", hwRouter)



app.use(cookieParser())

module.exports = app