import { DataTypes, Sequelize } from "sequelize";
const { SQL_URI, PORT } = process.env;
const User = require('../models/user')

const sequelize = new Sequelize(SQL_URI);

const models = {
  User: User(sequelize, DataTypes),
  //File: Files(sequelize, DataTypes),
  //Notebook: Notebook(sequelize, DataTypes),
  //Notes: Note(sequelize, DataTypes),
};

Object.keys(models).forEach((modelName) => {
  if ("associate" in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

sequelize
  .authenticate()
  .then(() => console.log("💡 DB CONNECTED!"))
  .catch((e) => console.log("❌ CONNECTION FAILED! Error: ", e));

module.exports = models;
