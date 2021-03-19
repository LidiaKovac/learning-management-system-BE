require("dotenv").config()
const express = require('express')
const app = require("./server")
const db = require("./utils/config/db")
const {PORT} = process.env
const endpoints = require("express-list-endpoints")

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