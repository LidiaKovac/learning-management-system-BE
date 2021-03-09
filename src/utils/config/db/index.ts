const sequelize = require("./sequelize")


sequelize
  .authenticate()
  .then(() => console.log("💡 DB CONNECTED!"))
  .catch((e:Error) => console.log("❌ CONNECTION FAILED! Error: ", e));

module.exports = {sequelize};
