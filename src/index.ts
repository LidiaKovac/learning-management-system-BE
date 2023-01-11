import { config } from "dotenv"
import app from "./server"
import endpoints from "express-list-endpoints"
import mongoose, { ConnectOptions } from "mongoose"
const { PORT, DB_URL } = process.env
config()

mongoose.connect(DB_URL as string, { useNewUrlParser: true } as ConnectOptions).then(() => console.log("🌚 The server has successfully connected to mongodb."))
  .then(() => {
    app.listen(PORT, () => {
      console.log("🌚 Server has started on port " + PORT + "!" + " \n🌝 The server has these endpoints: \n");
      console.table(endpoints(app));
    });
  })
  .catch((e) => {
    console.log("❌ CONNECTION FAILED! Error: ", e);
  });