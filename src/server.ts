import { NextFunction, Router } from "express";
const express = require('express')
const cors = require('cors')
const cookieParser = require("cookie-parser")

const app = express()
//do not declare db

app.use(cors({credentials: true}))
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