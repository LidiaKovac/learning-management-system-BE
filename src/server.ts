import { Router } from "express";

const { Sequelize } = require('sequelize');
const endpoints = require("express-list-endpoints")
const express = require('express')
const cors = require('cors')

const {PORT} = process.env

const app = express()
const db = require("./utils/config/db")

app.use(cors())
app.use(express.json())
app.use(require("helmet")())

const userRouter =  require("./services/users")
const loginRouter = require("./services/login")

app.use("/user", userRouter)
app.use("/login", loginRouter)


db.sequelize.sync({ force: false }).then((result:any) => {
    app.listen(PORT, () => {
      console.log(
        "❗ Server is running on",
        PORT,
        " with these endpoints: ",
        endpoints(app)
      );
    });
  });

module.exports = app