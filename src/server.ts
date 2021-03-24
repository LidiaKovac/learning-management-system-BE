import { Router } from "express";
const express = require('express')
const cors = require('cors')
const cookieParser = require("cookie-parser")

const {PORT} = process.env

const app = express()
//do not declare db

app.use(cors({credentials: true, origin: process.env.FE_URI || process.env.FE_URI_BACKUP}))
app.use(express.json())
app.use(require("helmet")())

const userRouter =  require("./services/users")
const loginRouter = require("./services/login")
const filesRouter = require("./services/files")
const eventsRouter = require("./services/events")
const classRouter = require("./services/classes")

app.use("/user", userRouter)
app.use("/login", loginRouter)
app.use("/files", filesRouter)
app.use("/event", eventsRouter)
app.use("/class", classRouter)

app.use(cookieParser())

module.exports = app