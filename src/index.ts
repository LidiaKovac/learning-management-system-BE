import { config } from "dotenv"
import app from "./server"
import endpoints from "express-list-endpoints"
import db from "./utils/config/db/sequelize"
config()
const { PORT } = process.env

db.sync({ force: false, logging: false, alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log("🌚 Server has started on port " + PORT + "!" + " \n🌝 The server has these endpoints: \n");
    console.table(endpoints(app));
  });
})
  .catch((e: any) => {
    console.log("❌ CONNECTION FAILED! Error: ", e);
  });